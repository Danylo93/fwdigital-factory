import { test, expect, Page } from "@playwright/test";
import { abrir, ready, PHONE } from "./helpers";

/**
 * O formulário de proposta é o funil do site: é por ele que o preço deixa de
 * ser tabela fixa e vira orçamento do caso de cada um. Um lead perdido aqui
 * custa muito mais que um pixel torto, então o que se testa é isso — que o
 * dado chega em algum lugar, mesmo quando o backend não responde.
 */

const VALIDO = {
  nome: "Joana Ribeiro",
  email: "joana@padariadaesquina.com.br",
  whatsapp: "(11) 98888-7777",
  negocio: "Padaria",
  estagio: "Já funciono, mas não tenho presença digital",
};

async function irAoFormulario(page: Page) {
  await abrir(page);
  await ready(page);
  await page.locator("#proposta").scrollIntoViewIfNeeded();
  await expect(page.locator("#formProposta")).toBeVisible();
}

async function preencher(page: Page, servico = "Site") {
  await page.fill("#pNome", VALIDO.nome);
  await page.fill("#pEmail", VALIDO.email);
  await page.fill("#pZap", VALIDO.whatsapp);
  await page.fill("#pNegocio", VALIDO.negocio);
  await page.selectOption("#pEstagio", VALIDO.estagio);
  await page.locator(`.op input[value="${servico}"]`).check();
}

test.describe("Proposta sob medida", () => {
  test("envio vazio não passa e o foco vai para o primeiro campo errado", async ({ page }) => {
    await irAoFormulario(page);
    await page.click("#btnProposta");

    await expect(page.locator("#errNome")).toBeVisible();
    await expect(page.locator("#pNome")).toBeFocused();
    await expect(page.locator("#pNome")).toHaveAttribute("aria-invalid", "true");
    // e nada foi enviado
    await expect(page.locator("#statusProposta")).toHaveClass(/ruim/);
  });

  test("e-mail malformado é barrado antes de chegar no servidor", async ({ page }) => {
    await irAoFormulario(page);
    let bateu = false;
    await page.route("**/api/proposta", (r) => {
      bateu = true;
      return r.fulfill({ status: 200, body: '{"ok":true}' });
    });

    await preencher(page);
    await page.fill("#pEmail", "joana@@padaria");
    await page.click("#btnProposta");

    await expect(page.locator("#errEmail")).toBeVisible();
    expect(bateu, "requisição saiu mesmo com e-mail inválido").toBe(false);
  });

  test("sem marcar serviço nenhum o envio não sai", async ({ page }) => {
    await irAoFormulario(page);
    let bateu = false;
    await page.route("**/api/proposta", (r) => {
      bateu = true;
      return r.fulfill({ status: 200, body: '{"ok":true}' });
    });

    await page.fill("#pNome", VALIDO.nome);
    await page.fill("#pEmail", VALIDO.email);
    await page.fill("#pZap", VALIDO.whatsapp);
    await page.fill("#pNegocio", VALIDO.negocio);
    await page.selectOption("#pEstagio", VALIDO.estagio);
    await page.click("#btnProposta");

    await expect(page.locator("#errServico")).toBeVisible();
    expect(bateu).toBe(false);
  });

  test("envio válido manda os campos certos e confirma para a pessoa", async ({ page }) => {
    await irAoFormulario(page);

    let enviado: Record<string, unknown> | null = null;
    await page.route("**/api/proposta", async (r) => {
      enviado = JSON.parse(r.request().postData() || "{}");
      await r.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"ok":true}',
      });
    });

    await preencher(page, "Automação com IA");
    await page.fill("#pMsg", "Recebo pedido por telefone e perco na hora do almoço.");
    await page.click("#btnProposta");

    await expect(page.locator("#statusProposta")).toHaveClass(/ok/);
    await expect(page.locator("#statusProposta")).toContainText(VALIDO.email);

    expect(enviado).toMatchObject({
      nome: VALIDO.nome,
      email: VALIDO.email,
      negocio: VALIDO.negocio,
      estagio: VALIDO.estagio,
      servico: ["Automação com IA"],
    });
    expect(String((enviado as any).whatsapp).replace(/\D/g, "")).toBe("11988887777");
    // a isca vai vazia — quem preenche é robô
    expect((enviado as any).site).toBe("");
  });

  test("se o backend cair, o lead vai para o WhatsApp em vez de sumir", async ({ page }) => {
    // É o cenário real enquanto a chave de e-mail não estiver configurada:
    // a função responde 503 de propósito. O pior desfecho aceitável é o
    // visitante ter que apertar "enviar" no WhatsApp — nunca perder o contato.
    await irAoFormulario(page);
    await page.route("**/api/proposta", (r) =>
      r.fulfill({ status: 503, contentType: "application/json", body: '{"erro":"x"}' }),
    );

    // Grava o que o site PEDE para abrir. Ler a URL da janela real não serve:
    // o sandbox de teste bloqueia rede externa e a aba vira página de erro
    // antes da asserção — mediria a rede, não o comportamento do site.
    await page.evaluate(() => {
      (window as any).__abriu = [];
      window.open = function (u?: string | URL) {
        (window as any).__abriu.push(String(u));
        return null;
      } as typeof window.open;
    });

    await preencher(page, "Site");
    await page.click("#btnProposta");
    await expect(page.locator("#statusProposta")).toHaveClass(/ruim/);

    const abriu: string[] = await page.evaluate(() => (window as any).__abriu);
    expect(abriu.length, "nada foi aberto — o lead se perdeu").toBe(1);
    const url = decodeURIComponent(abriu[0]);
    expect(url, "não abriu o WhatsApp").toContain(`wa.me/${PHONE}`);
    expect(url).toContain(VALIDO.nome);
    expect(url).toContain(VALIDO.email);
    expect(url).toContain(VALIDO.negocio);
    expect(url).toContain(VALIDO.estagio);
    // e o botão volta a poder ser usado
    await expect(page.locator("#btnProposta")).not.toHaveAttribute("aria-busy", "true");
  });

  test("todo campo tem rótulo de verdade e a isca fica fora do alcance", async ({ page }) => {
    await irAoFormulario(page);

    const semRotulo = await page.evaluate(() => {
      const campos = [...document.querySelectorAll<HTMLElement>("#formProposta input, #formProposta select, #formProposta textarea")];
      return campos
        .filter((c) => {
          if (c.getAttribute("type") === "checkbox") return !c.closest("label");
          const id = c.id;
          return !(id && document.querySelector(`label[for="${id}"]`));
        })
        .map((c) => c.getAttribute("name") || c.id);
    });
    expect(semRotulo, `campos sem <label>: ${semRotulo.join(", ")}`).toEqual([]);

    // A isca não pode ser alcançada por teclado nem lida em voz alta.
    const isca = page.locator("#pSite");
    await expect(isca).toHaveAttribute("tabindex", "-1");
    await expect(page.locator(".mel")).toHaveAttribute("aria-hidden", "true");
    const visivel = await isca.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.right > 0 && r.left < window.innerWidth;
    });
    expect(visivel, "a isca está aparecendo na tela").toBe(false);
  });

  test("o catálogo deixou de ser download solto e passa pelo formulário", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const soltos = await page.evaluate(() =>
      [...document.querySelectorAll('a[href$="catalogo.pdf"]')].map((a) => a.textContent?.trim()),
    );
    expect(soltos, `ainda há link direto para o PDF: ${soltos.join(" | ")}`).toEqual([]);
  });
});
