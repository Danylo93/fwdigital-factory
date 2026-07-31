import { test, expect, Page } from "@playwright/test";
import { abrir, ready } from "./helpers";

/**
 * O hero é a peça central do site e quebrava ao rolar de volta para cima no
 * iPhone: faixa preta enorme, hero sobrepondo a seção seguinte, ou tela toda
 * preta. O gatilho é a barra de URL do Safari, que aparece e some conforme o
 * sentido da rolagem, muda innerHeight e dispara resize no meio do gesto.
 */

/**
 * Rola de forma compatível com os três projetos: o WebKit móvel não tem roda
 * de mouse, e com o Lenis desligado no toque a rolagem nativa responde direto.
 */
async function rolar(page: Page, delta: number) {
  const temRoda = await page.evaluate(() => !matchMedia("(pointer: coarse)").matches);
  if (temRoda) await page.mouse.wheel(0, delta);
  else await page.evaluate((d) => window.scrollBy(0, d), delta);
}

/** O canvas está desenhando algo, ou é um retângulo preto liso? */
async function canvasTemImagem(page: Page) {
  return page.evaluate(() => {
    const c = document.getElementById("cinema") as HTMLCanvasElement | null;
    if (!c || !c.width) return { pintado: false, motivo: "canvas sem dimensão" };
    const d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let min = 255;
    let max = 0;
    let soma = 0;
    let n = 0;
    for (let i = 0; i < d.length; i += 4001) {
      const v = d[i];
      if (v < min) min = v;
      if (v > max) max = v;
      soma += v;
      n++;
    }
    // Um quadro real tem variação de luminância; preto liso não tem.
    return { pintado: max - min > 12, amplitude: max - min, media: Math.round(soma / n) };
  });
}

/** O hero cobre o topo da viewport, sem buraco entre ele e o cabeçalho? */
async function heroPosicionado(page: Page) {
  return page.evaluate(() => {
    const hero = document.querySelector(".hero") as HTMLElement | null;
    if (!hero) return { ok: false, motivo: "sem .hero" };
    const r = hero.getBoundingClientRect();
    return {
      ok: r.top <= 1 && r.bottom > window.innerHeight * 0.5,
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      altura: Math.round(r.height),
      viewport: window.innerHeight,
    };
  });
}

test.describe("Hero: rolagem de volta para cima", () => {
  test.skip(({ isMobile }) => !isMobile, "o defeito é de viewport móvel");

  test("o canvas continua desenhando ao subir", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await page.waitForFunction(
      () => document.documentElement.classList.contains("quadros-prontos"),
      undefined,
      { timeout: 30_000 },
    );

    // desce percorrendo todo o trecho fixado
    for (let i = 0; i < 8; i++) {
      await rolar(page, 400);
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(600);

    // sobe de volta conferindo a cada passo
    const falhas: string[] = [];
    for (let i = 0; i < 8; i++) {
      await rolar(page, -400);
      await page.waitForTimeout(400);
      const estado = await canvasTemImagem(page);
      const y = await page.evaluate(() => Math.round(window.scrollY));
      if (!estado.pintado) {
        falhas.push(`y=${y}: canvas liso (amplitude ${estado.amplitude ?? "?"})`);
      }
    }
    expect(falhas, `canvas em branco ao subir:\n${falhas.join("\n")}`).toEqual([]);
  });

  test("o hero volta encaixado no topo, sem buraco", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await page.waitForFunction(
      () => document.documentElement.classList.contains("quadros-prontos"),
      undefined,
      { timeout: 30_000 },
    );

    for (let i = 0; i < 8; i++) {
      await rolar(page, 400);
      await page.waitForTimeout(220);
    }
    for (let i = 0; i < 10; i++) {
      await rolar(page, -400);
      await page.waitForTimeout(220);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);

    const pos = await heroPosicionado(page);
    expect(pos.ok, `hero fora do lugar no topo: ${JSON.stringify(pos)}`).toBe(true);
    const estado = await canvasTemImagem(page);
    expect(estado.pintado, `canvas liso no topo: ${JSON.stringify(estado)}`).toBe(true);
  });

  test("mudança só de altura não zera o bitmap nem remede o pin", async ({ page }) => {
    // Este é o mecanismo do defeito, testado direto — conferir apenas se o
    // canvas "parece pintado" não serve: o Chromium repinta logo em seguida e
    // esconde a limpeza. Contamos as atribuições reais.
    await abrir(page);
    await ready(page);
    await page.waitForFunction(
      () => document.documentElement.classList.contains("quadros-prontos"),
      undefined,
      { timeout: 30_000 },
    );

    await page.evaluate(() => {
      const c = document.getElementById("cinema") as HTMLCanvasElement;
      const w = w0(); const h = h0();
      function w0() { return Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "width")!; }
      function h0() { return Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "height")!; }
      (window as any).__zeradas = 0;
      Object.defineProperty(c, "width", {
        get() { return w.get!.call(this); },
        set(v) { (window as any).__zeradas++; w.set!.call(this, v); },
      });
      Object.defineProperty(c, "height", {
        get() { return h.get!.call(this); },
        set(v) { (window as any).__zeradas++; h.set!.call(this, v); },
      });
      (window as any).__refreshes = 0;
      const ST = (window as any).ScrollTrigger;
      const orig = ST.refresh.bind(ST);
      ST.refresh = function (...a: unknown[]) { (window as any).__refreshes++; return orig(...a); };
    });

    for (let i = 0; i < 4; i++) {
      await rolar(page, 400);
      await page.waitForTimeout(200);
    }

    // Fiel ao iOS: a barra de URL dispara resize, mas o layout em svh NÃO
    // muda de tamanho. (Mudar a viewport pelo Playwright mudaria o svh junto,
    // o que no aparelho real não acontece.)
    await page.evaluate(async () => {
      for (let i = 0; i < 12; i++) {
        window.dispatchEvent(new Event("resize"));
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(600);

    const { zeradas, refreshes } = await page.evaluate(() => ({
      zeradas: (window as any).__zeradas as number,
      refreshes: (window as any).__refreshes as number,
    }));
    expect(zeradas, `o bitmap do canvas foi zerado ${zeradas}x sem mudança de tamanho`).toBe(0);
    expect(refreshes, `o ScrollTrigger remediu ${refreshes}x sem mudança de tamanho`).toBe(0);
  });

  test("a altura do hero não depende da barra do navegador", async ({ page }) => {
    // Com height:100vh o iOS usa a viewport GRANDE, então o hero fica mais
    // alto que a área visível quando a barra aparece. Em svh a altura casa.
    await abrir(page);
    await ready(page);
    const medida = await page.evaluate(() => {
      const h = document.querySelector(".hero") as HTMLElement;
      return {
        altura: Math.round(h.getBoundingClientRect().height),
        viewport: window.innerHeight,
      };
    });
    const folga = Math.abs(medida.altura - medida.viewport);
    expect(
      folga,
      `hero com ${medida.altura}px numa viewport de ${medida.viewport}px (diferença de ${folga}px)`,
    ).toBeLessThanOrEqual(2);
  });

  test("sobreviver à barra de URL aparecendo e sumindo", async ({ page }) => {
    // No Safari do iPhone a barra recolhe ao descer e volta ao subir, mudando
    // innerHeight em ~60-100px. Reproduzimos redimensionando no meio do gesto.
    await abrir(page);
    await ready(page);
    await page.waitForFunction(
      () => document.documentElement.classList.contains("quadros-prontos"),
      undefined,
      { timeout: 30_000 },
    );
    const vp = page.viewportSize()!;

    for (let i = 0; i < 6; i++) {
      await rolar(page, 400);
      await page.waitForTimeout(200);
    }
    // barra recolhe: viewport cresce
    await page.setViewportSize({ width: vp.width, height: vp.height + 90 });
    await page.waitForTimeout(500);

    for (let i = 0; i < 6; i++) {
      await rolar(page, -400);
      await page.waitForTimeout(200);
    }
    // barra volta: viewport encolhe
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(700);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);

    const pos = await heroPosicionado(page);
    const estado = await canvasTemImagem(page);
    expect(pos.ok, `hero deslocado após a barra de URL mudar: ${JSON.stringify(pos)}`).toBe(true);
    expect(estado.pintado, `canvas liso após a barra de URL mudar: ${JSON.stringify(estado)}`).toBe(true);
  });
});

test.describe("Hero: gesto de dedo no iOS", () => {
  test.skip(({ browserName }) => browserName !== "webkit", "só no motor do Safari");

  test("nada intercepta a rolagem por toque", async ({ page }) => {
    // O Lenis suaviza a roda do mouse, mas no toque ele sequestra a rolagem
    // nativa e briga com o rubber-banding e a barra de URL do Safari — era a
    // sensação de "quebrado" ao subir. No celular a rolagem tem que ser do
    // sistema; o scrub por rolagem continua, só sem suavização artificial.
    await abrir(page);
    await ready(page);
    const sequestrada = await page.evaluate(
      () =>
        document.documentElement.classList.contains("lenis") ||
        document.documentElement.classList.contains("lenis-smooth"),
    );
    expect(sequestrada, "o Lenis está ativo num aparelho de toque").toBe(false);
  });

});
