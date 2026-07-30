import { Page, expect } from "@playwright/test";

export const PHONE = "5511934079208";

/**
 * Abre a página sem esperar o evento `load`.
 * O `load` só dispara depois das tags de terceiros (gtag, fontes), que não
 * têm relação com o site estar utilizável — esperar por ele mediria a rede
 * do Google, não o nosso site.
 */
export async function abrir(page: Page, url = "/") {
  await page.goto(url, { waitUntil: "domcontentloaded" });
}

/** Espera o site ficar utilizável: o loader saiu da frente. */
export async function ready(page: Page) {
  await page.waitForFunction(
    () => {
      const l = document.getElementById("loader");
      return !l || l.classList.contains("done");
    },
    undefined,
    { timeout: 30_000 },
  );
}

/** Coleta erros de console e requests que falharam (ignorando origens externas). */
export function collectFailures(page: Page) {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    // O sandbox de teste bloqueia rede externa (Google Fonts, gtag). Esses
    // resets não dizem nada sobre o site — só erros do próprio código contam.
    const txt = m.text();
    const ehRuidoDeRedeExterna =
      /ERR_CONNECTION_RESET|ERR_BLOCKED_BY_CLIENT|ERR_NAME_NOT_RESOLVED|ERR_CERT/.test(txt) &&
      /Failed to load resource/.test(txt);
    if (ehRuidoDeRedeExterna) return;
    consoleErrors.push(txt);
  });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on("response", (r) => {
    const url = r.url();
    // Só nos importam assets do próprio site.
    if (!url.includes("localhost") && !url.includes("127.0.0.1")) return;
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${url}`);
  });
  return { consoleErrors, failedRequests };
}

/** Mede o peso total baixado do próprio host. */
export function measureTransfer(page: Page) {
  const perHost: { url: string; bytes: number }[] = [];
  page.on("response", async (r) => {
    const url = r.url();
    if (!url.includes("localhost") && !url.includes("127.0.0.1")) return;
    try {
      const len = r.headers()["content-length"];
      if (len) perHost.push({ url, bytes: Number(len) });
    } catch {
      /* respostas abortadas não interessam */
    }
  });
  return {
    total: () => perHost.reduce((a, b) => a + b.bytes, 0),
    breakdown: () => perHost.slice().sort((a, b) => b.bytes - a.bytes),
  };
}
