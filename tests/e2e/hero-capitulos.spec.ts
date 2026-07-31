import { test, expect } from "@playwright/test";
import { abrir, ready } from "./helpers";

/**
 * A jornada do hero: o conteúdo troca conforme a cena avança e, ao rolar de
 * volta, desfaz na ordem inversa. É o comportamento da referência trazida
 * pelo cliente (barbeariabrutal.com), onde a narrativa é dividida em
 * capítulos dentro do bloco fixado.
 */
async function visivel(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const nomes: string[] = [];
    const copy = document.getElementById("heroCopy")!;
    if (+getComputedStyle(copy).opacity > 0.5) nomes.push("abertura");
    document.querySelectorAll("[data-cap]").forEach((c, i) => {
      if (+getComputedStyle(c as HTMLElement).opacity > 0.5) nomes.push("cap" + (i + 1));
    });
    return nomes.join("+");
  });
}

async function rolar(page: import("@playwright/test").Page, delta: number) {
  const temRoda = await page.evaluate(() => !matchMedia("(pointer: coarse)").matches);
  if (temRoda) await page.mouse.wheel(0, delta);
  else await page.evaluate((d) => window.scrollBy(0, d), delta);
}

test("os capítulos avançam ao descer e desfazem ao subir", async ({ page }) => {
  await abrir(page);
  await ready(page);
  await page.waitForFunction(
    () => document.documentElement.classList.contains("quadros-prontos"),
    undefined,
    { timeout: 30_000 },
  );

  // O estado em repouso no topo conta: a abertura está visível antes de
  // qualquer gesto, e na trilha curta do celular ela sai já no primeiro passo.
  const trilha = await page.evaluate(
    () => document.getElementById("inicio")!.getBoundingClientRect().height - window.innerHeight,
  );
  // scrub:1 significa que a animação leva ~1s para alcançar a rolagem —
  // amostrar rápido demais lê estado atrasado e "pula" capítulos.
  const passo = Math.round(trilha / 12);
  const descendo: string[] = [await visivel(page)].filter(Boolean);
  for (let i = 0; i < 14; i++) {
    await rolar(page, passo);
    await page.waitForTimeout(420);
    const v = await visivel(page);
    if (v && !descendo.includes(v)) descendo.push(v);
  }
  const subindo: string[] = [];
  for (let i = 0; i < 16; i++) {
    await rolar(page, -passo);
    await page.waitForTimeout(420);
    const v = await visivel(page);
    if (v && !subindo.includes(v)) subindo.push(v);
  }
  // fecha a subida no topo, como quem volta ao início da página
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1400);
  const noTopo = await visivel(page);
  if (noTopo && !subindo.includes(noTopo)) subindo.push(noTopo);

  const ordem = ["abertura", "cap1", "cap2", "cap3"];
  const posicao = (v: string) => ordem.indexOf(v);
  const limpo = (a: string[]) => a.filter((x) => ordem.includes(x));

  const d = limpo(descendo);
  const u = limpo(subindo);

  // A amostragem pode não pegar todos os momentos, dependendo do passo — o que
  // precisa valer é a ORDEM: descendo avança na sequência, subindo desfaz.
  expect(d.length, `poucos momentos vistos ao descer: ${descendo.join(" -> ")}`).toBeGreaterThanOrEqual(3);
  expect(u.length, `poucos momentos vistos ao subir: ${subindo.join(" -> ")}`).toBeGreaterThanOrEqual(3);

  const crescente = d.every((v, i) => i === 0 || posicao(v) > posicao(d[i - 1]));
  const decrescente = u.every((v, i) => i === 0 || posicao(v) < posicao(u[i - 1]));

  expect(crescente, `ao descer a sequência não avançou: ${d.join(" -> ")}`).toBe(true);
  expect(decrescente, `ao subir a sequência não desfez: ${u.join(" -> ")}`).toBe(true);
});
