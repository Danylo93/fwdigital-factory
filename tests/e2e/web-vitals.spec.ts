import { test, expect } from "@playwright/test";
import { abrir, ready } from "./helpers";

/**
 * Limiares oficiais do Google para "bom" (avaliados no percentil 75 de campo):
 * LCP < 2,5 s · CLS < 0,1 · INP < 200 ms.
 * Aqui medimos em laboratório — não substitui dado de campo, mas reprova
 * regressões grosseiras antes de irem para produção.
 */
test.describe("Core Web Vitals", () => {
  // Medida de tempo é sensível a CPU disputada: com os três motores rodando
  // em paralelo, o WebKit chega a marcar 230 ms num site que sozinho marca
  // 110 ms. O limiar continua o oficial (200 ms) — a repetição só descarta a
  // amostra colhida com a máquina engasgada, em vez de baixar a régua.
  test.describe.configure({ retries: 2 });

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

  test("latência de interação dentro do limiar de INP (200 ms)", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await page.waitForTimeout(1500);

    // Mede pela Event Timing API — a mesma fonte de onde o INP é derivado.
    // Cronometrar o `click()` do Playwright mediria a espera dele por
    // "elemento estável", que o scroll suave do Lenis nunca satisfaz de
    // imediato: seria a lentidão do harness, não a do site.
    await page.evaluate(() => {
      (window as any).__piorEvento = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as any[]) {
          (window as any).__piorEvento = Math.max((window as any).__piorEvento, e.duration);
        }
      }).observe({ type: "event", durationThreshold: 16, buffered: true } as any);
    });

    // interações reais: abre e fecha itens do FAQ
    for (let i = 0; i < 3; i++) {
      const sum = page.locator("#faq details summary").nth(i);
      await sum.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400); // deixa o scroll suave assentar
      await sum.click({ force: true });
      await page.waitForTimeout(250);
    }
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "");

    const pior = await page.evaluate(() => (window as any).__piorEvento as number);
    console.log(`Pior latência de evento: ${pior.toFixed(0)} ms`);
    expect(pior, `evento mais lento levou ${pior.toFixed(0)}ms (limiar INP "bom" = 200ms)`).toBeLessThan(200);
  });

  test("o CTA principal está clicável desde o primeiro segundo", async ({ page }) => {
    await abrir(page);
    await ready(page);
    // Sem espera artificial: se algum overlay engolir o clique, isto reprova.
    // O seletor é o do botão do cabeçalho, não o do seu destino: o CTA já foi
    // para o WhatsApp e hoje vai para o formulário — o que não pode mudar é
    // ele estar clicável.
    const SEL = "header .nav-cta a.btn";
    const cta = page.locator(SEL).first();
    await expect(cta, "o cabeçalho perdeu o CTA principal").toHaveCount(1);
    const quemRecebe = await page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement;
      const r = el.getBoundingClientRect();
      const alvo = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return alvo ? (alvo.closest(sel) ? "cta" : (alvo.id || alvo.className || alvo.tagName)) : "nada";
    }, SEL);
    expect(quemRecebe, `o clique no CTA está sendo interceptado por: ${quemRecebe}`).toBe("cta");
    await expect(cta).toBeVisible();
  });
});
