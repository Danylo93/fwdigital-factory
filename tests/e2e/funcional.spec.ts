import { test, expect } from "@playwright/test";
import { PHONE, abrir, collectFailures, ready } from "./helpers";

test.describe("Responsabilidades funcionais", () => {
  test("o site sempre sai do loader e fica utilizável", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await expect(page.locator("#loader")).not.toBeVisible();
    await expect(page.locator("header .brand")).toBeVisible();
  });

  test("não há erros de console nem assets quebrados", async ({ page }) => {
    const { consoleErrors, failedRequests } = collectFailures(page);
    await abrir(page);
    await ready(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2500);
    expect(failedRequests, `assets 4xx/5xx:\n${failedRequests.join("\n")}`).toEqual([]);
    expect(consoleErrors, `erros de console:\n${consoleErrors.join("\n")}`).toEqual([]);
  });

  test("todo link âncora aponta para uma seção existente", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const hrefs = await page.locator('a[href^="#"]').evaluateAll((as) =>
      as.map((a) => a.getAttribute("href")!).filter((h) => h && h !== "#"),
    );
    expect(hrefs.length).toBeGreaterThan(5);
    const quebrados: string[] = [];
    for (const h of new Set(hrefs)) {
      const existe = await page.locator(h).count();
      if (!existe) quebrados.push(h);
    }
    expect(quebrados, `âncoras sem destino: ${quebrados.join(", ")}`).toEqual([]);
  });

  test("todo CTA de WhatsApp vira um wa.me válido com mensagem", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const links = page.locator("[data-wa]");
    const n = await links.count();
    expect(n).toBeGreaterThan(5);
    for (let i = 0; i < n; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href, `CTA #${i} sem href montado`).toContain(`https://wa.me/${PHONE}`);
      expect(href, `CTA #${i} sem mensagem pré-preenchida`).toContain("text=");
      // a mensagem precisa ser decodificável e não-vazia
      const texto = decodeURIComponent(new URL(href!).searchParams.get("text") || "");
      expect(texto.length, `CTA #${i} com mensagem vazia`).toBeGreaterThan(10);
    }
  });

  test("clicar no menu leva à seção certa", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const link = page.locator('#navLinks a[href="#cases"], #mobileMenu a[href="#cases"]').first();
    if (!(await link.isVisible())) await page.locator("#burger").click();
    await page.locator('a[href="#cases"]').first().click();
    await page.waitForTimeout(2000);
    const visivel = await page.locator("#cases").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    expect(visivel, "o clique no menu não levou até a seção").toBe(true);
  });

  test("link compartilhado com âncora abre na seção certa", async ({ page }) => {
    // Um /#cases vindo de fora precisa cair no lugar mesmo com o scroll
    // suave do Lenis rodando — ele sobrescreve o pulo nativo do navegador.
    await abrir(page, "/#cases");
    await ready(page);
    await page.waitForTimeout(2500);
    const visivel = await page.locator("#cases").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    expect(visivel, "link profundo com âncora não posicionou na seção").toBe(true);
  });

  test("contadores chegam ao valor final", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await page.evaluate(() => document.getElementById("contato")?.scrollIntoView());
    await page.waitForTimeout(3000);
    const valores = await page
      .locator("#contato [data-count]")
      .evaluateAll((els) => els.map((e) => e.textContent?.trim() || ""));
    expect(valores.length).toBeGreaterThan(0);
    for (const v of valores) {
      expect(v, "contador parado em zero").not.toMatch(/^0[+%]?$/);
      expect(v).toMatch(/\d/);
    }
  });

  test("nenhum conteúdo fica preso invisível depois do reveal", async ({ page }) => {
    await abrir(page);
    await ready(page);
    // percorre a página inteira, como um usuário real
    await page.evaluate(async () => {
      const passo = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += passo) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);
    const invisiveis = await page.locator("[data-reveal]").evaluateAll((els) =>
      els
        .filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.9)
        .map((e) => e.className || e.tagName),
    );
    expect(invisiveis, `elementos ainda invisíveis: ${invisiveis.join(" | ")}`).toEqual([]);
  });

  test("dados de contato conferem", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await expect(page.locator(`a[href="tel:+${PHONE}"]`)).toHaveCount(1);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
    const mail = await page.locator('a[href^="mailto:"]').getAttribute("href");
    expect(mail).toMatch(/^mailto:[^@]+@[^@]+\.[a-z]{2,}/i);
  });
});

test.describe("Menu mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "só no viewport mobile");

  test("abre, navega e fecha", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const burger = page.locator("#burger");
    await expect(burger).toBeVisible();
    await burger.click();
    await expect(page.locator("#mobileMenu")).toHaveClass(/open/);
    await expect(burger).toHaveAttribute("aria-expanded", "true");
    await page.locator("#mobileMenu a[href='#cases']").click();
    await expect(page.locator("#mobileMenu")).not.toHaveClass(/open/);
    await expect(burger).toHaveAttribute("aria-expanded", "false");
  });
});
