# Agência FW Digital — site institucional

Landing page de captação da Agência FW Digital: sites, apps, sistemas e
automação de atendimento com IA no WhatsApp.

## Como este site é servido (importante)

O que vai para produção é o **`index.html` estático na raiz** — um arquivo único
com todo o CSS embutido — mais a pasta `assets/`. Não há etapa de build.

```
index.html          markup + CSS completo da página
assets/app.js       comportamento (hero, reveals, contadores, CTAs)
assets/cinema/      poster, vídeo e sequência de frames do hero
assets/brand/       logo, favicon e card social (og-cover.jpg)
assets/team/        foto do fundador
robots.txt          publicados na raiz via vercel.json
sitemap.xml
```

O `vercel.json` empacota exatamente esses arquivos. **Qualquer arquivo fora
dessa lista não é publicado** — foi por isso que `robots.txt` e `sitemap.xml`
precisaram ser declarados explicitamente em `builds`.

> A pasta `src/` contém um app React/Vite anterior que **não é publicado**.
> Ele não participa do deploy; mexer nele não muda o site no ar.

Para rodar localmente:

```sh
node serve.cjs . 8080     # http://localhost:8080
```

## Deploy

A publicação é feita pela integração Git da Vercel: **todo push no `main`
dispara o deploy de produção**. Branches geram deploys de preview.

Não existe token de deploy no repositório e não há GitHub Actions — o gatilho
é exclusivamente o push.

## Testes end-to-end

A suíte Playwright cobre as responsabilidades reais do site: os CTAs de
WhatsApp, navegação, menu mobile, SEO, acessibilidade, responsividade e
Core Web Vitals.

```sh
npm install
npm run test:e2e             # sobe o serve.cjs sozinho e roda tudo
npm run test:e2e -- --project=mobile
```

Variáveis úteis:

| Variável        | Para quê                                                     |
| --------------- | ------------------------------------------------------------ |
| `E2E_BASE_URL`  | testar uma URL já no ar (preview da Vercel) em vez do local   |
| `E2E_CHROMIUM`  | caminho de um Chromium já instalado, evitando novo download   |

Os limiares de performance seguem os valores oficiais de "bom" do Google:
LCP < 2,5 s e CLS < 0,1.

## Decisões que valem conhecer antes de mexer

- **O hero nunca bloqueia a página.** Os 121 frames do scrub (6,4 MB) são
  baixados em segundo plano, com `fetchPriority="low"`, e só promovem o hero
  para o modo cinema se o carregamento terminar **e** o usuário ainda estiver
  no topo. Antes disso o site já está utilizável exibindo o poster. Não volte
  a esperar os frames dentro do loader.
- **O loader sai do DOM.** Enquanto existir como overlay fixo, ele engole
  toques no topo da tela. Há ainda um fallback em CSS que o esconde após 5 s
  caso o JavaScript falhe.
- **O JSON-LD de FAQ espelha a seção `#faq` visível.** Se editar um, edite o
  outro: o Google exige que os dados estruturados reflitam conteúdo visível.
- **Imagens precisam de `width`/`height`** para não gerar layout shift.
