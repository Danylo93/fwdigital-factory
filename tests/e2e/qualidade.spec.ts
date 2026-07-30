import { test, expect } from "@playwright/test";
import { abrir, measureTransfer, ready } from "./helpers";

test.describe("SEO e compartilhamento", () => {
  test("metadados essenciais presentes", async ({ page }) => {
    await abrir(page);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(15);
    expect(title.length).toBeLessThanOrEqual(65);

    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc!.length).toBeGreaterThan(70);
    expect(desc!.length).toBeLessThanOrEqual(165);

    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });

  test("Open Graph e Twitter com URLs absolutas", async ({ page }) => {
    await abrir(page);
    for (const prop of ["og:title", "og:description", "og:image", "og:url", "og:type"]) {
      await expect(page.locator(`meta[property="${prop}"]`), `faltando ${prop}`).toHaveCount(1);
    }
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage, "og:image precisa ser URL absoluta para o preview funcionar").toMatch(/^https?:\/\//);
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl).toMatch(/^https?:\/\//);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
  });

  test("dados estruturados JSON-LD válidos", async ({ page }) => {
    await abrir(page);
    const blocos = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocos.length, "sem JSON-LD — perde rich results na busca").toBeGreaterThan(0);
    for (const b of blocos) {
      const json = JSON.parse(b); // lança se malformado
      expect(json["@context"]).toContain("schema.org");
      expect(json["@type"]).toBeTruthy();
    }
  });

  test("hierarquia de headings sem saltos", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const niveis = await page
      .locator("h1, h2, h3, h4")
      .evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
    expect(niveis.filter((n) => n === 1).length, "deve haver exatamente um h1").toBe(1);
    for (let i = 1; i < niveis.length; i++) {
      expect(niveis[i] - niveis[i - 1], `salto de h${niveis[i - 1]} para h${niveis[i]}`).toBeLessThanOrEqual(1);
    }
  });

  test("robots.txt e sitemap.xml servidos", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status(), "robots.txt não está sendo publicado").toBe(200);
    expect(await robots.text()).toMatch(/sitemap/i);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status(), "sitemap.xml não está sendo publicado").toBe(200);
  });
});

test.describe("Acessibilidade", () => {
  test("toda imagem declara alt (alt=\"\" vale para decorativa)", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const semAlt = await page
      .locator("img")
      .evaluateAll((els) =>
        els.filter((e) => e.getAttribute("alt") === null).map((e) => e.getAttribute("src") || "?"),
      );
    expect(semAlt, `imagens sem atributo alt: ${semAlt.join(", ")}`).toEqual([]);
  });

  test("foco visível no teclado", async ({ page }) => {
    await abrir(page);
    await ready(page);
    await page.keyboard.press("Tab");
    const temIndicador = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      if (!el || el === document.body) return false;
      const s = getComputedStyle(el);
      const outline = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
      const ring = s.boxShadow !== "none";
      return outline || ring;
    });
    expect(temIndicador, "navegação por teclado sem indicador de foco visível").toBe(true);
  });

  test("existe skip link para o conteúdo", async ({ page }) => {
    await abrir(page);
    const skip = page.locator('a[href="#main"], a[href="#conteudo"], .skip-link');
    await expect(skip, "sem skip link — barreira para leitor de tela").toHaveCount(1);
  });

  test("botões e links interativos têm nome acessível", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const semNome = await page.locator("a, button").evaluateAll((els) =>
      els
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) return false;
          const nome = (e.textContent || "").trim() || e.getAttribute("aria-label") || e.getAttribute("title");
          return !nome;
        })
        .map((e) => e.outerHTML.slice(0, 90)),
    );
    expect(semNome, `sem nome acessível: ${semNome.join(" | ")}`).toEqual([]);
  });
});

test.describe("Responsividade", () => {
  const larguras = [360, 390, 414, 768, 1024, 1280, 1440, 1920];

  for (const w of larguras) {
    test(`sem overflow horizontal em ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await abrir(page);
      await ready(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      // O que importa é a rolagem lateral que o usuário sente, não o overflow
      // de layout — que pode estar corretamente recortado por overflow/clip.
      const { rolouDeVerdade, folga } = await page.evaluate(() => {
        window.scrollTo(400, window.scrollY);
        const rolou = window.scrollX;
        window.scrollTo(0, window.scrollY);
        return {
          rolouDeVerdade: rolou,
          folga: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      expect(rolouDeVerdade, `a página rola ${rolouDeVerdade}px para o lado`).toBe(0);
      expect(folga, `${folga}px de overflow de layout não recortado`).toBeLessThanOrEqual(1);
    });
  }

  test("alvos de toque com tamanho mínimo no mobile", async ({ page }) => {
    test.skip(!test.info().project.name.includes("mobile"), "só no mobile");
    await abrir(page);
    await ready(page);
    const pequenos = await page.locator("header a, header button, .wa-float").evaluateAll((els) =>
      els
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && (r.width < 40 || r.height < 40);
        })
        .map((e) => `${e.className}:${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`),
    );
    expect(pequenos, `alvos < 40px: ${pequenos.join(", ")}`).toEqual([]);
  });
});

test.describe("Performance", () => {
  test("peso da primeira carga dentro do orçamento", async ({ page }) => {
    const t = measureTransfer(page);
    await abrir(page);
    await ready(page);
    const totalMB = t.total() / 1024 / 1024;
    const top = t
      .breakdown()
      .slice(0, 5)
      .map((r) => `${(r.bytes / 1024).toFixed(0)}KB ${r.url.split("/").slice(-2).join("/")}`)
      .join("\n");
    console.log(`Total baixado até ficar utilizável: ${totalMB.toFixed(2)} MB\nMaiores:\n${top}`);
    // Orçamento de mercado para landing page: ~3 MB até interativo.
    expect(totalMB, `carga de ${totalMB.toFixed(2)} MB até o site liberar`).toBeLessThan(3);
  });

  test("site fica utilizável rápido", async ({ page }) => {
    const t0 = Date.now();
    await abrir(page);
    await ready(page);
    const ms = Date.now() - t0;
    console.log(`Tempo até o loader liberar: ${ms} ms`);
    expect(ms, `${ms}ms até liberar a tela`).toBeLessThan(5000);
  });

  test("imagens declaram dimensões (evita layout shift)", async ({ page }) => {
    await abrir(page);
    await ready(page);
    const sem = await page
      .locator("img")
      .evaluateAll((els) =>
        els
          .filter((e) => !e.getAttribute("width") || !e.getAttribute("height"))
          .map((e) => (e.getAttribute("src") || "?").split("/").pop()!),
      );
    expect(sem, `sem width/height: ${sem.join(", ")}`).toEqual([]);
  });
});
