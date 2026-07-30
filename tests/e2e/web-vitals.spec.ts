import { test, expect } from "@playwright/test";
import { abrir, ready } from "./helpers";

/**
 * Limiares oficiais do Google para "bom" (avaliados no percentil 75 de campo):
 * LCP < 2,5 s · CLS < 0,1 · INP < 200 ms.
 * Aqui medimos em laboratório — não substitui dado de campo, mas reprova
 * regressões grosseiras antes de irem para produção.
 */
test.describe("Core Web Vitals", () => {
  test("LCP dentro do limiar de 2,5 s", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const lcp = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let ultimo = 0;
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) ultimo = e.startTime;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          // LCP se estabiliza na primeira interação ou pouco depois do load
          setTimeout(() => resolve(ultimo), 2500);
        }),
    );
    console.log(`LCP: ${lcp.toFixed(0)} ms`);
    expect(lcp, `LCP de ${lcp.toFixed(0)}ms (limiar "bom" = 2500ms)`).toBeLessThan(2500);
  });

  test("CLS dentro do limiar de 0,1", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const cls = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const e of list.getEntries() as any[]) {
              if (!e.hadRecentInput) total += e.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          // percorre a página para pegar deslocamentos causados por lazy-load
          (async () => {
            const passo = window.innerHeight * 0.9;
            for (let y = 0; y < document.body.scrollHeight; y += passo) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 260));
            }
            setTimeout(() => resolve(total), 900);
          })();
        }),
    );
    console.log(`CLS: ${cls.toFixed(4)}`);
    expect(cls, `CLS de ${cls.toFixed(4)} (limiar "bom" = 0,1)`).toBeLessThan(0.1);
  });

  test("a página responde ao clique sem travar (proxy de INP)", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await page.waitForTimeout(1200);
    const alvo = page.locator("#faq details summary").first();
    await alvo.scrollIntoViewIfNeeded();
    const t0 = Date.now();
    await alvo.click();
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "");
    const ms = Date.now() - t0;
    console.log(`Resposta ao clique: ${ms} ms`);
    expect(ms, `${ms}ms para responder ao clique`).toBeLessThan(400);
  });

  test("o CTA principal está clicável desde o primeiro segundo", async ({ page }) => {
    await abrir(page);
    await ready(page);
    // Sem espera artificial: se algum overlay engolir o clique, isto reprova.
    const cta = page.locator("header a[data-wa]").first();
    const quemRecebe = await page.evaluate(() => {
      const el = document.querySelector("header a[data-wa]") as HTMLElement;
      const r = el.getBoundingClientRect();
      const alvo = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return alvo ? (alvo.closest("a[data-wa]") ? "cta" : (alvo.id || alvo.className || alvo.tagName)) : "nada";
    });
    expect(quemRecebe, `o clique no CTA está sendo interceptado por: ${quemRecebe}`).toBe("cta");
    await expect(cta).toBeVisible();
  });
});
