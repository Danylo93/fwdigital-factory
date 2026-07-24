# Agência FW Digital — Landing Cinematográfica

Landing page contínua, single-file, com experiência de **rolagem 3D**: o `index.html`
usa um `<canvas>` fixado que reproduz uma **sequência de quadros controlada pela rolagem**
(GSAP + ScrollTrigger), com **Lenis** para smooth scroll e textos HTML revelados nos
momentos certos. Todo o conteúdo é real, extraído do projeto original (React/Vite),
consolidado em uma única página com âncoras internas.

## Como rodar localmente

```bash
node serve.cjs
```

Abra **http://localhost:8080**. (No Claude Code, o botão de preview usa a config `dev`
do `.claude/launch.json`, que já aponta para esse servidor estático — sem precisar de
`npm install`.)

## Estrutura

```
index.html                      → a landing inteira (HTML + CSS inline)
assets/app.js                   → engine de scroll (canvas, GSAP, Lenis, fallbacks)
assets/vendor/                  → gsap.min.js, ScrollTrigger.min.js, lenis.min.js (locais)
assets/cinema/hero.mp4          → clipe HERO gerado (Higgsfield · Seedance · 480p · sem áudio)
assets/cinema/frames/hero/      → 121 quadros extraídos do clipe (scrub do canvas)
assets/cinema/poster/           → posters (fallback mobile / reduced-motion)
assets/brand/                   → logo e favicon
assets/referencias-nomepessoa/  → COLOQUE AQUI as fotos da pessoa da cena final (clipe 5)
serve.cjs                       → servidor estático mínimo (sem dependências)
```

## Modos (responsivo + acessibilidade)

- **Desktop (≥1000px):** canvas com scrub de 121 quadros, pin, Lenis, parallax e revelações.
- **Mobile (<1000px):** fallback leve — vídeo `hero.mp4` em autoplay mudo, sem pin, menu hambúrguer.
- **`prefers-reduced-motion`:** poster estático + conteúdo visível, sem animações e sem Lenis.

## Estado da geração de vídeos (Higgsfield / Cinema Studio)

Orçamento de créditos era baixo (14 → **4,5 restantes**). Custos reais confirmados:
Cinema Studio 3.0 = 25 créditos (720p) / 120 (4K) por clipe. Por isso foi gerado
**1 clipe (o HERO)** em qualidade menor (Seedance fast, 480p, 7,5 créditos), conforme combinado.

**Clipe 1 · HERO** ✅ gerado, animado a partir de uma imagem-base cinematográfica
(notebook fechado no estúdio → abre → tela acende → câmera avança).

**Pendentes** (precisam de recarga de créditos):
- Clipe 2 · SITES · Clipe 3 · AUTOMAÇÃO IA · Clipe 4 · APPS/SISTEMAS
- Clipe 5 · FINAL com a pessoa — precisa das **fotos em `assets/referencias-nomepessoa/`**
  + o **nome** para usar como *identity reference*.

As seções 2–5 já estão no site como blocos premium (mockups CSS de navegador/chat/app);
quando os clipes forem gerados, cada um vira uma nova cena de canvas com scrub, sem retrabalho.

## Backup do projeto original (React/Vite)

- Cópia completa: `../fwdigital-factory-backup-20260724-125839`
- Tag git: `backup-pre-cinema-20260724-125839`
- O código React continua em `src/` (rodável via config `react-legacy` / `npm run dev`).
