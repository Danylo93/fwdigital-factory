/**
 * Testa /api/proposta sem browser e sem rede: a chamada à Resend é trocada
 * por um espião no fetch global. Roda com `node --test tests/`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import handler from "../api/proposta.js";

const VALIDO = {
  nome: "Joana Ribeiro",
  email: "joana@padariadaesquina.com.br",
  whatsapp: "(11) 98888-7777",
  negocio: "Padaria",
  estagio: "Já funciono, mas não tenho presença digital",
  servico: ["Site"],
  mensagem: "Perco pedido na hora do almoço.",
  site: "",
};

/** Resposta mínima no formato que o handler usa. */
function resposta() {
  const r = {
    codigo: 0,
    corpo: null,
    cabecalhos: {},
    status(c) {
      r.codigo = c;
      return r;
    },
    json(b) {
      r.corpo = b;
      return r;
    },
    setHeader(k, v) {
      r.cabecalhos[k] = v;
    },
  };
  return r;
}

/** Substitui o fetch global e devolve o que foi enviado à Resend. */
function espionarResend({ falhar = false } = {}) {
  const enviados = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    enviados.push({ url, corpo: JSON.parse(opts.body) });
    if (falhar) return { ok: false, status: 500, text: async () => "erro" };
    return { ok: true, status: 200, json: async () => ({ id: "abc" }) };
  };
  return { enviados, restaurar: () => (globalThis.fetch = original) };
}

test("método diferente de POST é recusado", async () => {
  const r = resposta();
  await handler({ method: "GET" }, r);
  assert.equal(r.codigo, 405);
  assert.equal(r.cabecalhos.Allow, "POST");
});

test("campos faltando devolvem 422 dizendo quais", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const r = resposta();
  await handler({ method: "POST", body: { nome: "J", email: "nao-e-email" } }, r);
  assert.equal(r.codigo, 422);
  assert.deepEqual(
    r.corpo.campos.sort(),
    ["email", "estagio", "negocio", "nome", "servico", "whatsapp"],
  );
});

test("serviço fora da lista é descartado em vez de aceito", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const espiao = espionarResend();
  try {
    // com um válido junto, o inválido some e o resto segue
    const r = resposta();
    await handler(
      { method: "POST", body: { ...VALIDO, servico: ["Site", "<script>alert(1)</script>"] } },
      r,
    );
    assert.equal(r.codigo, 200);
    assert.match(espiao.enviados[0].corpo.html, /Busca<\/td>[\s\S]*?Site</);
    assert.ok(!espiao.enviados[0].corpo.html.includes("alert(1)"));

    // sozinho, o inventado não sustenta o envio
    const r2 = resposta();
    await handler({ method: "POST", body: { ...VALIDO, servico: ["lavagem de dinheiro"] } }, r2);
    assert.equal(r2.codigo, 422, "serviço inventado deveria reprovar");
    assert.ok(r2.corpo.campos.includes("servico"));
  } finally {
    espiao.restaurar();
  }
});

test("a isca engole o robô sem enviar e-mail nenhum", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const espiao = espionarResend();
  try {
    const r = resposta();
    await handler({ method: "POST", body: { ...VALIDO, site: "http://spam.example" } }, r);
    assert.equal(r.codigo, 200, "o robô não pode perceber que foi barrado");
    assert.equal(espiao.enviados.length, 0, "e-mail foi enviado para um robô");
  } finally {
    espiao.restaurar();
  }
});

test("sem chave de e-mail responde 503, para o front cair no WhatsApp", async () => {
  delete process.env.RESEND_API_KEY;
  const r = resposta();
  await handler({ method: "POST", body: VALIDO }, r);
  assert.equal(r.codigo, 503);
});

test("envio válido manda os dois e-mails com o conteúdo certo", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const espiao = espionarResend();
  try {
    const r = resposta();
    await handler({ method: "POST", body: VALIDO }, r);
    assert.equal(r.codigo, 200);
    assert.equal(espiao.enviados.length, 2, "faltou o aviso à agência ou a confirmação ao lead");

    const [agencia, cliente] = espiao.enviados.map((e) => e.corpo);
    assert.match(agencia.subject, /Joana Ribeiro/);
    assert.equal(agencia.reply_to, VALIDO.email, "responder deve ir para o lead");
    assert.match(agencia.html, /Padaria/);
    assert.match(agencia.html, /Perco pedido na hora do almoço/);

    assert.deepEqual(cliente.to, [VALIDO.email]);
    assert.match(cliente.html, /catalogo\.pdf/, "a confirmação tem que levar o catálogo");
  } finally {
    espiao.restaurar();
  }
});

test("HTML do lead é escapado — nada de injeção no e-mail", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const espiao = espionarResend();
  try {
    const r = resposta();
    await handler(
      { method: "POST", body: { ...VALIDO, negocio: '<img src=x onerror="roubar()">' } },
      r,
    );
    const [agencia] = espiao.enviados.map((e) => e.corpo);
    assert.ok(!agencia.html.includes("<img src=x"), "tag crua vazou para o e-mail");
    assert.match(agencia.html, /&lt;img src=x/);
  } finally {
    espiao.restaurar();
  }
});

test("falha na confirmação ao lead não derruba a solicitação", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const original = globalThis.fetch;
  let n = 0;
  globalThis.fetch = async () => {
    n += 1;
    if (n === 1) return { ok: true, status: 200, json: async () => ({}) };
    return { ok: false, status: 500, text: async () => "cliente rejeitou" };
  };
  try {
    const r = resposta();
    await handler({ method: "POST", body: VALIDO }, r);
    assert.equal(r.codigo, 200, "a agência recebeu; o formulário não pode acusar erro");
  } finally {
    globalThis.fetch = original;
  }
});

test("falha ao avisar a agência devolve erro, para o front cair no WhatsApp", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const espiao = espionarResend({ falhar: true });
  try {
    const r = resposta();
    await handler({ method: "POST", body: VALIDO }, r);
    assert.equal(r.codigo, 502);
  } finally {
    espiao.restaurar();
  }
});
