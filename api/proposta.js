/**
 * POST /api/proposta — recebe o formulário de proposta sob medida.
 *
 * Faz duas coisas: avisa a agência com o caso do lead e confirma para o lead
 * que a mensagem chegou, já mandando o catálogo.
 *
 * Variáveis de ambiente (Vercel › Settings › Environment Variables):
 *   RESEND_API_KEY   obrigatória. Chave da Resend (resend.com), plano
 *                    gratuito cobre 3.000 e-mails/mês.
 *   EMAIL_DESTINO    para onde vão os leads. Padrão: contato@…
 *   EMAIL_REMETENTE  remetente verificado no domínio. Padrão: proposta@…
 *
 * Sem RESEND_API_KEY a função responde 503 de propósito — o front trata
 * isso caindo para o WhatsApp com os dados preenchidos, então o lead
 * continua chegando enquanto a chave não estiver configurada.
 */

const DESTINO = process.env.EMAIL_DESTINO || "contato@agenciafwdigital.com.br";
const REMETENTE =
  process.env.EMAIL_REMETENTE || "Agência FW Digital <proposta@agenciafwdigital.com.br>";
const SITE = "https://agenciafwdigital.com.br";

const SERVICOS_VALIDOS = [
  "Site",
  "App ou sistema",
  "Automação com IA",
  "DevOps e sustentação",
  "Ainda não sei",
];

/** Corta no limite e tira caracteres de controle, que não têm o que fazer aqui. */
function limpar(valor, max) {
  if (typeof valor !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return valor.replace(/[\x00-\x1F\x7F]/g, " ").trim().slice(0, max);
}

/** Escapa para interpolar em HTML sem abrir injeção no e-mail. */
function esc(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validar(corpo) {
  const d = {
    nome: limpar(corpo.nome, 120),
    email: limpar(corpo.email, 180),
    whatsapp: limpar(corpo.whatsapp, 20),
    negocio: limpar(corpo.negocio, 120),
    estagio: limpar(corpo.estagio, 120),
    mensagem: limpar(corpo.mensagem, 1200),
    servico: Array.isArray(corpo.servico)
      ? corpo.servico.filter((s) => SERVICOS_VALIDOS.includes(s))
      : [],
  };

  const faltando = [];
  if (d.nome.length < 2) faltando.push("nome");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) faltando.push("email");
  if (d.whatsapp.replace(/\D/g, "").length < 10) faltando.push("whatsapp");
  if (d.negocio.length < 2) faltando.push("negocio");
  if (!d.estagio) faltando.push("estagio");
  if (!d.servico.length) faltando.push("servico");

  return { d, faltando };
}

function emailParaAgencia(d) {
  const linha = (r, v) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#9AA0AA;white-space:nowrap">${esc(r)}</td>` +
    `<td style="padding:6px 0;color:#111;font-weight:600">${esc(v)}</td></tr>`;

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px">
  <p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#ED145B;font-weight:700;margin:0 0 4px">
    Nova solicitação de proposta</p>
  <h2 style="margin:0 0 18px;font-size:20px;color:#111">${esc(d.nome)} — ${esc(d.negocio)}</h2>
  <table style="border-collapse:collapse;font-size:14px">
    ${linha("E-mail", d.email)}
    ${linha("WhatsApp", d.whatsapp)}
    ${linha("Tipo de negócio", d.negocio)}
    ${linha("Momento", d.estagio)}
    ${linha("Busca", d.servico.join(", "))}
  </table>
  ${
    d.mensagem
      ? `<p style="margin:18px 0 6px;font-size:13px;color:#9AA0AA">O que ele contou</p>
         <p style="margin:0;padding:12px 14px;background:#F4F4F5;border-left:3px solid #ED145B;
            font-size:14px;color:#111;white-space:pre-wrap">${esc(d.mensagem)}</p>`
      : ""
  }
  <p style="margin:22px 0 0;font-size:14px">
    <a href="https://wa.me/55${esc(d.whatsapp.replace(/\D/g, ""))}"
       style="background:#ED145B;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;
              display:inline-block;font-weight:600">Responder no WhatsApp</a></p>
</div>`;
}

function emailParaCliente(d) {
  const primeiro = d.nome.split(" ")[0];
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;font-size:15px;color:#111;line-height:1.6">
  <p>Oi, ${esc(primeiro)}.</p>
  <p>Recebi a sua solicitação e já estou olhando o caso de <strong>${esc(d.negocio)}</strong>.
     Em vez de mandar tabela pronta, prefiro entender o seu contexto e montar
     uma proposta em cima dele — então me dá um tempinho.</p>
  <p>Enquanto isso, o catálogo completo com todos os planos e pacotes está aqui:</p>
  <p><a href="${SITE}/catalogo.pdf"
        style="background:#ED145B;color:#fff;text-decoration:none;padding:11px 20px;border-radius:6px;
               display:inline-block;font-weight:600">Ver o catálogo</a></p>
  <p>Se preferir adiantar a conversa, é só chamar no WhatsApp
     <a href="https://wa.me/5511964891128" style="color:#ED145B">(11) 96489-1128</a>.</p>
  <p style="margin-top:26px">Danylo Oliveira<br>
     <span style="color:#9AA0AA">Agência FW Digital</span></p>
</div>`;
}

async function enviar(chave, payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`resend ${r.status}: ${await r.text()}`);
  return r.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "método não permitido" });
  }

  let corpo = req.body;
  if (typeof corpo === "string") {
    try {
      corpo = JSON.parse(corpo);
    } catch {
      return res.status(400).json({ erro: "corpo inválido" });
    }
  }
  if (!corpo || typeof corpo !== "object") {
    return res.status(400).json({ erro: "corpo inválido" });
  }

  // Isca: humano não vê o campo, robô preenche tudo. Respondemos 200 para o
  // robô não descobrir que foi barrado, mas não enviamos nada.
  if (limpar(corpo.site, 200)) return res.status(200).json({ ok: true });

  const { d, faltando } = validar(corpo);
  if (faltando.length) {
    return res.status(422).json({ erro: "campos inválidos", campos: faltando });
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    // O front cai para o WhatsApp — melhor isso do que engolir o lead.
    console.error("RESEND_API_KEY ausente: proposta não enviada por e-mail");
    return res.status(503).json({ erro: "envio de e-mail não configurado" });
  }

  try {
    await enviar(chave, {
      from: REMETENTE,
      to: [DESTINO],
      reply_to: d.email,
      subject: `Proposta: ${d.nome} — ${d.negocio}`,
      html: emailParaAgencia(d),
    });
  } catch (e) {
    console.error("falha ao avisar a agência:", e.message);
    return res.status(502).json({ erro: "não foi possível enviar agora" });
  }

  // A confirmação para o lead é desejável, não crítica: se ela falhar, a
  // solicitação já chegou na agência e o formulário não deve acusar erro.
  try {
    await enviar(chave, {
      from: REMETENTE,
      to: [d.email],
      subject: "Recebi a sua solicitação — Agência FW Digital",
      html: emailParaCliente(d),
    });
  } catch (e) {
    console.error("falha ao confirmar para o lead:", e.message);
  }

  return res.status(200).json({ ok: true });
}
