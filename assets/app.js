/* ============================================================
   FW Digital — Cinematic scroll engine
   Frame-sequence canvas · GSAP ScrollTrigger · Lenis smooth scroll
   ============================================================ */
(function () {
  "use strict";

  var PHONE = "5511964891128";

  // Telas em retrato recebem um conjunto próprio: recorte 9:16 da mesma
  // filmagem, em 900x1600. A cena é rodada em paisagem (2560x1440) e, esticada
  // para cobrir uma tela alta, seria muito ampliada — o recorte dedicado evita
  // isso e ainda economiza os pixels que a cobertura descartaria.
  var ehRetrato = window.innerWidth < 1000 && window.innerHeight > window.innerWidth;
  var FRAME_COUNT = ehRetrato ? 41 : 49;
  var framePath = ehRetrato
    ? function (n) {
        return "assets/cinema/frames/hero-mobile/m_" + String(n).padStart(4, "0") + ".webp";
      }
    : function (n) {
        return "assets/cinema/frames/hero/w_" + String(n).padStart(4, "0") + ".webp";
      };

  var doc = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Conexão ruim ou modo economia: 1,4 MB de frames não se justifica. */
  function conexaoPermiteCinema() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return true; // sem informação, assume que dá
    if (c.saveData) return false;
    return !/(^|-)(slow-)?2g$/.test(c.effectiveType || "");
  }

  // A história por rolagem agora vale para celular também — antes o celular
  // caía num vídeo em autoplay que rodava sozinho, desligado da rolagem (e que
  // sequer chegava a carregar). Só ficam de fora quem pediu menos movimento e
  // quem está em conexão ruim ou modo economia.
  var CINEMA = !reduced && conexaoPermiteCinema();
  var MODE = CINEMA ? "cinema" : "static";
  doc.classList.add("mode-" + MODE);
  if (reduced) doc.classList.add("no-anim");

  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = hasGSAP && typeof window.ScrollTrigger !== "undefined";
  var lenis = null;

  /* ---------- WhatsApp links (preserve prefilled messages) ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msg = a.getAttribute("data-msg") ||
      "Olá! Gostaria de saber mais sobre os serviços da Agência FW Digital.";
    a.setAttribute("href", "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg));
  });

  /* ---------- Tech marquee ---------- */
  (function buildTech() {
    var track = document.getElementById("techTrack");
    if (!track) return;
    var techs = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Python",
      "OpenAI", "Supabase", "Flutter", "WhatsApp API", "Stripe", "Meta Ads", "Figma"];
    var html = techs.map(function (t) {
      return '<div class="tech-item"><svg viewBox="0 0 24 24" fill="none" stroke="hsl(340 86% 53%)" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg><span>' + t + "</span></div>";
    }).join("");
    track.innerHTML = html + html; // duplicate for seamless -50% loop
  })();

  /* ---------- Header scrolled state ---------- */
  var header = document.getElementById("header");
  function onScrollHeader() {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Smooth anchor navigation ---------- */
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      var y = -66;
      if (lenis) lenis.scrollTo(el, { offset: y, duration: 1.2 });
      else {
        var top = el.getBoundingClientRect().top + window.scrollY + y;
        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
      }
    });
  });

  /* ---------- Active nav link ---------- */
  (function activeNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('#navLinks a[data-nav]'));
    var map = {};
    links.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
    var ids = Object.keys(map);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  })();

  /* ---------- Barra de progresso de leitura ---------- */
  (function scrollProgress() {
    var bar = document.getElementById("scrollProgress");
    if (!bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = "scaleX(" + p + ")";
    }
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();

  /* ---------- Spotlight nos cards (segue o cursor) ----------
     Ler getBoundingClientRect() a cada pointermove força layout síncrono e
     trava a thread principal. O retângulo é medido uma vez ao entrar no card
     e a escrita de estilo é agrupada num rAF. */
  (function cardSpotlight() {
    if (reduced || !window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll(".card").forEach(function (card) {
      var rect = null;
      var pendente = false;
      var px = 0, py = 0;

      function aplicar() {
        pendente = false;
        if (!rect || !rect.width || !rect.height) return;
        card.style.setProperty("--mx", ((px - rect.left) / rect.width) * 100 + "%");
        card.style.setProperty("--my", ((py - rect.top) / rect.height) * 100 + "%");
      }

      card.addEventListener("pointerenter", function () {
        rect = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener("pointermove", function (e) {
        px = e.clientX;
        py = e.clientY;
        if (pendente) return;
        pendente = true;
        requestAnimationFrame(aplicar);
      }, { passive: true });

      card.addEventListener("pointerleave", function () {
        rect = null;
      }, { passive: true });
    });
  })();

  /* ---------- WhatsApp float visibility ---------- */
  var waFloat = document.getElementById("waFloat");
  window.addEventListener("scroll", function () {
    if (!waFloat) return;
    if (window.scrollY > window.innerHeight * 0.6) waFloat.classList.add("show");
    else waFloat.classList.remove("show");
  }, { passive: true });

  /* ---------- Count-up ---------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var pre = el.getAttribute("data-prefix") || "";
    var suf = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(target * eased) + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  (function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (reduced || !("IntersectionObserver" in window)) { els.forEach(countUp); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) countUp(en.target); });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Canvas frame sequence ---------- */
  var canvas = document.getElementById("cinema");
  var ctx = canvas ? canvas.getContext("2d", { alpha: false }) : null;
  var frames = [];
  var state = { frame: 0 };

  function sizeCanvas() {
    if (!canvas) return false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.floor(canvas.clientWidth * dpr);
    var h = Math.floor(canvas.clientHeight * dpr);
    // Atribuir width/height zera o bitmap mesmo quando o valor não muda. Como
    // no iOS a barra de URL dispara resize em rajada, redimensionar sem
    // necessidade apagava a cena a cada quadro da animação da barra.
    if (w === canvas.width && h === canvas.height) return false;
    canvas.width = w;
    canvas.height = h;
    return true;
  }
  /** Quadro pedido, ou o carregado mais próximo dele. */
  function quadroUtilizavel(alvo) {
    var direto = frames[alvo];
    if (direto && direto.complete && direto.naturalWidth) return direto;
    for (var d = 1; d < FRAME_COUNT; d++) {
      var antes = frames[alvo - d];
      if (antes && antes.complete && antes.naturalWidth) return antes;
      var depois = frames[alvo + d];
      if (depois && depois.complete && depois.naturalWidth) return depois;
    }
    return null;
  }

  function render() {
    if (!ctx) return;
    var img = quadroUtilizavel(Math.round(state.frame));
    if (!img) return;
    var cw = canvas.width, ch = canvas.height;
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var s = Math.max(cw / iw, ch / ih);
    var w = iw * s, h = ih * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");
  var loadBar = document.getElementById("loadBar");
  var loadPct = document.getElementById("loadPct");
  function setProgress(p) {
    var pct = Math.round(p * 100);
    if (loadBar) loadBar.style.width = pct + "%";
    if (loadPct) loadPct.textContent = "Carregando experiência · " + pct + "%";
  }
  var loaderHidden = false;
  function hideLoader() {
    if (!loader || loaderHidden) return;
    loaderHidden = true;
    setProgress(1);
    loader.classList.add("done");
    // Tira do DOM assim que o fade termina: enquanto ele existir como overlay
    // fixo, qualquer toque no topo da tela corre o risco de morrer nele.
    setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 900);
  }

  /* ---------- Reveals ---------- */
  function initReveals() {
    // If we can't (or shouldn't) animate, make sure everything is simply visible.
    if (!hasST || reduced) { doc.classList.add("no-anim"); return; }
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true }
      });
    });
  }

  /* ---------- Hero cinema timeline ----------
     comIntro=false quando o hero já foi apresentado no modo leve: aí só
     montamos o scrub de scroll, sem reanimar a headline na cara do usuário. */
  function buildHeroTimeline(comIntro) {
    var words = gsap.utils.toArray("#heroH1 .w > span");
    var beats = {
      eyebrow: document.querySelector('[data-beat="eyebrow"]'),
      tail: document.querySelector('[data-beat="tail"]'),
      sub: document.querySelector('[data-beat="sub"]'),
      cta: document.querySelector('[data-beat="cta"]'),
      trust: document.querySelector('[data-beat="trust"]'),
      stats: document.querySelector('[data-beat="stats"]')
    };
    var cue = document.getElementById("scrollCue");
    var copy = document.getElementById("heroCopy");

    if (comIntro) {
      // initial hidden states (kept hidden behind the loader until ready)
      gsap.set(words, { yPercent: 120 });
      gsap.set([beats.eyebrow, beats.tail, beats.sub, beats.cta, beats.trust], { opacity: 0, y: 24 });
      gsap.set(beats.stats, { opacity: 0, y: 24 });

      // ---- Intro on load: hero copy composes in, timed with the loader fade ----
      var intro = gsap.timeline({ delay: 0.25 });
      intro.to(beats.eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(words, { yPercent: 0, duration: 0.95, stagger: 0.055, ease: "power4.out" }, 0.1)
        .to(beats.tail, { opacity: 1, y: 0, duration: 0.5 }, 0.45)
        .to(beats.sub, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.55)
        .to(beats.cta, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.72)
        .to(beats.trust, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .to(beats.stats, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, 0.95);
    }

    // ---- Scroll scrub: frame sequence + parallax + hand off into the screen ----
    // Sem pin: quem segura o hero no lugar é o position:sticky do CSS. Aqui só
    // lemos o progresso da trilha (#inicio), do começo ao fim dela. Assim não
    // existe elemento espaçador para remedir, e a barra de URL do celular
    // mudando a altura da tela não desloca mais nada.
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
    // Frame scrub across the whole pin. duration:1 makes it span the entire
    // timeline (GSAP's default 0.5 would finish the frames at the halfway point).
    tl.to(state, { frame: FRAME_COUNT - 1, duration: 1, ease: "none", snap: "frame", onUpdate: render }, 0);
    // Scroll cue fades on first movement
    tl.to(cue, { opacity: 0, duration: 0.04, ease: "none" }, 0.02);
    // Gentle upward parallax of the copy as the camera moves in
    tl.to(copy, { y: -60, ease: "none", duration: 1 }, 0);
    // A copy de abertura sai cedo para dar lugar aos capítulos
    tl.to(copy, { opacity: 0, filter: "blur(5px)", ease: "power2.in", duration: 0.08 }, 0.14);

    // ---- Capítulos: o conteúdo troca conforme a cena avança ----
    // Cada um entra e sai dentro da mesma timeline com scrub. Por ser scrub,
    // rolar de volta desfaz a sequência na ordem inversa sem código extra.
    var caps = gsap.utils.toArray("[data-cap]");
    if (caps.length) {
      var PRIMEIRO = 0.24;                     // depois que a abertura saiu
      var VAO = (0.94 - PRIMEIRO) / caps.length;
      caps.forEach(function (cap, i) {
        var entra = PRIMEIRO + i * VAO;
        gsap.set(cap, { opacity: 0, y: 34 });
        tl.to(cap, { opacity: 1, y: 0, ease: "power2.out", duration: VAO * 0.28 }, entra)
          .to(cap, { opacity: 0, y: -28, ease: "power2.in", duration: VAO * 0.26 }, entra + VAO * 0.7);
      });
    }
  }

  /* ---------- Movimento ambiente antes da primeira rolagem ----------
     A sequência é comandada pela rolagem: parado, ela fica num quadro só, e a
     cena parece uma foto. Enquanto ninguém rolou, percorremos lentamente um
     trecho curto da sequência, ida e volta. O movimento devagar disfarça o
     espaçamento entre quadros e dá vida à cena; ao primeiro gesto, o controle
     passa para o ScrollTrigger e isto nunca mais roda. */
  function movimentoAmbiente() {
    if (reduced || !ctx || !hasST) return;
    var ativo = true;
    var inicio = null;
    var TRECHO = Math.max(4, Math.round((FRAME_COUNT - 1) * 0.22));
    var CICLO = 5200; // ida e volta bem lenta

    function encerrar() {
      ativo = false;
    }
    window.addEventListener("wheel", encerrar, { passive: true, once: true });
    window.addEventListener("touchstart", encerrar, { passive: true, once: true });
    window.addEventListener("keydown", encerrar, { once: true });

    function passo(ts) {
      if (!ativo) return;
      // qualquer rolagem real entrega o comando para o scrub
      if (window.scrollY > 2) return;
      if (inicio === null) inicio = ts;
      // Aba esquecida aberta não pode ficar desenhando para sempre: depois de
      // alguns ciclos sem ninguém interagir, o laço encerra e a cena descansa.
      if (ts - inicio > CICLO * 5) return;
      var p = ((ts - inicio) % CICLO) / CICLO;
      var vaiVolta = p < 0.5 ? p * 2 : (1 - p) * 2;
      // suaviza as pontas para não "bater" ao inverter o sentido
      var suave = vaiVolta * vaiVolta * (3 - 2 * vaiVolta);
      state.frame = suave * TRECHO;
      render();
      requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  /* ---------- Hero sem scrub (reduced-motion / conexão fraca) ---------- */
  function initFallbackHero() {
    var copy = document.getElementById("heroCopy");
    var cue = document.getElementById("scrollCue");
    // Make all hero copy visible
    var words = document.querySelectorAll("#heroH1 .w > span");
    if (hasGSAP && !reduced) {
      gsap.set(words, { yPercent: 120 });
      var tl = gsap.timeline({ delay: 0.15 });
      tl.to(words, { yPercent: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" });
      tl.fromTo("[data-beat]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.2);
    }
    // fade the cue out on first scroll
    window.addEventListener("scroll", function () {
      if (cue) cue.style.opacity = window.scrollY > 40 ? "0" : "";
    }, { passive: true, once: false });
  }

  /* ---------- Lenis + GSAP ticker ---------- */
  function initLenis() {
    // Só no ponteiro fino (mouse). No toque, o Lenis sequestra a rolagem
    // nativa e briga com o que o Safari do iPhone faz por conta própria:
    // rubber-banding nas pontas e a barra de URL que recolhe conforme o
    // sentido do gesto. O resultado é a rolagem "quebrada" ao subir. O
    // scrub por rolagem continua valendo no celular — quem some é só a
    // suavização artificial, que ali não faz falta.
    var noToque = window.matchMedia("(pointer: coarse)").matches;
    if (noToque || !CINEMA || typeof window.Lenis === "undefined") return;
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    if (hasST) lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Âncoras vindas de fora ----------
     Com o Lenis ativo, `scrollIntoView` e o pulo nativo do navegador são
     desfeitos pelo loop dele. Sem isto, um link compartilhado como
     /#cases, o botão voltar e o "localizar na página" caem no lugar errado. */
  function irParaAncora(hash, imediato) {
    if (!hash || hash.length < 2) return;
    var alvo;
    try { alvo = document.querySelector(hash); } catch (e) { return; }
    if (!alvo) return;
    if (lenis) {
      lenis.scrollTo(alvo, { offset: -66, immediate: !!imediato });
    } else {
      var y = alvo.getBoundingClientRect().top + window.scrollY - 66;
      window.scrollTo({ top: y, behavior: imediato || reduced ? "auto" : "smooth" });
    }
  }

  function initDeepLinks() {
    // Na carga: espera o layout assentar (o pin do hero muda as posições).
    if (location.hash) {
      var alvo = location.hash;
      requestAnimationFrame(function () {
        setTimeout(function () { irParaAncora(alvo, true); }, 120);
      });
    }
    window.addEventListener("hashchange", function () {
      irParaAncora(location.hash, false);
    });
  }

  /* ---------- Boot ----------
     Duas regras que não podem se atropelar:
     1) o site nunca espera os quadros para ficar utilizável;
     2) a história por rolagem — o efeito principal do site — precisa existir
        desde o começo, inclusive para quem rola no primeiro segundo.
     Por isso o pin do ScrollTrigger é montado já no boot: o layout não muda
     depois, então não há salto, e a trava por interação deixa de ser
     necessária. Os quadros entram por cima do poster conforme chegam. */
  function boot() {
    if (hasST) {
      gsap.registerPlugin(ScrollTrigger);
      // Não refazer as medidas quando o celular só muda de altura por causa
      // da barra do navegador — é a trava do próprio GSAP para esse caso.
      ScrollTrigger.config({ ignoreMobileResize: true });
    }
    initLenis();

    // Libera a tela assim que o poster estiver pronto (é o LCP, já vem no
    // preload do <head>) — teto de 1,2 s para nunca virar espera.
    var poster = document.getElementById("heroPoster");
    var liberou = false;
    function liberar() {
      if (liberou) return;
      liberou = true;
      iniciarHero();
    }
    if (poster && poster.decode) {
      poster.decode().then(liberar).catch(liberar);
    } else if (poster && !poster.complete) {
      poster.addEventListener("load", liberar);
      poster.addEventListener("error", liberar);
    } else {
      liberar();
    }
    setTimeout(liberar, 1200);

    // No celular, a barra de URL do navegador aparece e some conforme o
    // sentido da rolagem e dispara resize só na altura. Tratar isso como
    // mudança de layout recalcula o pin no meio do gesto e desloca a página —
    // era daí que vinha a faixa preta e o hero sobrepondo a seção seguinte.
    // Largura é o que realmente indica rotação ou janela redimensionada.
    var larguraAnterior = window.innerWidth;
    var alturaAnterior = window.innerHeight;
    window.addEventListener("resize", function () {
      var larguraMudou = window.innerWidth !== larguraAnterior;
      var saltoDeAltura = Math.abs(window.innerHeight - alturaAnterior) >
        Math.max(120, alturaAnterior * 0.2);
      larguraAnterior = window.innerWidth;
      alturaAnterior = window.innerHeight;

      // O canvas sempre acompanha o tamanho de exibição, mas só redesenha se
      // de fato mudou de dimensão (sizeCanvas devolve false caso contrário).
      if (sizeCanvas()) render();

      if (!larguraMudou && !saltoDeAltura) return;
      if (hasST) ScrollTrigger.refresh();
    });
  }

  /* ---------- Proposta sob medida ----------
     O formulário posta em /api/proposta, que dispara o e-mail. Se o endpoint
     não responder — função fora do ar, rede caindo, chave de e-mail ausente —
     nada é perdido: os mesmos dados vão para o WhatsApp já formatados. Um
     lead custa caro demais para morrer num erro de rede. */
  function initProposta() {
    var form = document.getElementById("formProposta");
    if (!form) return;
    var botao = document.getElementById("btnProposta");
    var status = document.getElementById("statusProposta");

    var REGRAS = [
      { campo: "pNome", erro: "errNome", vale: function (v) { return v.trim().length >= 2; },
        recado: "Me diz como devo te chamar." },
      { campo: "pEmail", erro: "errEmail", vale: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
        recado: "Confere o e-mail — é para lá que a proposta vai." },
      { campo: "pZap", erro: "errZap", vale: function (v) { return (v.replace(/\D/g, "").length >= 10); },
        recado: "Preciso do WhatsApp com DDD." },
      { campo: "pNegocio", erro: "errNegocio", vale: function (v) { return v.trim().length >= 2; },
        recado: "Qual é o ramo do negócio?" },
      { campo: "pEstagio", erro: "errEstagio", vale: function (v) { return !!v; },
        recado: "Escolhe o ponto em que você está." },
    ];

    function marcar(regra, ok) {
      var el = document.getElementById(regra.campo);
      var msg = document.getElementById(regra.erro);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (ok) {
        msg.hidden = true;
        el.removeAttribute("aria-describedby");
      } else {
        msg.textContent = regra.recado;
        msg.hidden = false;
        el.setAttribute("aria-describedby", regra.erro);
      }
      return ok;
    }

    function servicos() {
      return Array.prototype.slice
        .call(form.querySelectorAll('input[name="servico"]:checked'))
        .map(function (i) { return i.value; });
    }

    function validar() {
      var primeiroRuim = null;
      REGRAS.forEach(function (r) {
        var el = document.getElementById(r.campo);
        if (!marcar(r, r.vale(el.value)) && !primeiroRuim) primeiroRuim = el;
      });
      var msgServ = document.getElementById("errServico");
      if (!servicos().length) {
        msgServ.textContent = "Marca pelo menos uma opção — se estiver em dúvida, use “Ainda não sei”.";
        msgServ.hidden = false;
        if (!primeiroRuim) primeiroRuim = form.querySelector('input[name="servico"]');
      } else {
        msgServ.hidden = true;
      }
      return primeiroRuim;
    }

    // Só valida em tempo real depois do primeiro envio: corrigir alguém que
    // ainda está digitando o próprio e-mail é hostil.
    var jaTentou = false;
    REGRAS.forEach(function (r) {
      var el = document.getElementById(r.campo);
      el.addEventListener("blur", function () { if (jaTentou) marcar(r, r.vale(el.value)); });
      el.addEventListener("input", function () { if (jaTentou && r.vale(el.value)) marcar(r, true); });
    });

    function dados() {
      return {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        negocio: form.negocio.value.trim(),
        estagio: form.estagio.value,
        servico: servicos(),
        mensagem: form.mensagem.value.trim(),
        site: form.site.value, // isca
      };
    }

    /** Mesmo conteúdo do e-mail, em texto, para o caminho do WhatsApp. */
    function comoTexto(d) {
      var l = [
        "Olá! Quero uma proposta para o meu negócio.",
        "",
        "Nome: " + d.nome,
        "E-mail: " + d.email,
        "Tipo de negócio: " + d.negocio,
        "Momento: " + d.estagio,
        "Busco: " + d.servico.join(", "),
      ];
      if (d.mensagem) l.push("", d.mensagem);
      return l.join("\n");
    }

    function dizer(texto, classe) {
      status.textContent = texto;
      status.className = "status " + classe;
      status.hidden = false;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      jaTentou = true;
      var ruim = validar();
      if (ruim) {
        ruim.focus();
        dizer("Faltou preencher alguma coisa — está marcado em vermelho aí em cima.", "ruim");
        return;
      }

      var d = dados();
      botao.setAttribute("aria-busy", "true");
      botao.textContent = "Enviando…";
      status.hidden = true;

      // Sem um corte de tempo, uma função pendurada deixaria o botão em
      // "Enviando…" para sempre e o lead nunca chegaria a lugar nenhum.
      var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      var corta = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);

      fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
        signal: ctrl ? ctrl.signal : undefined,
      })
        .then(function (r) {
          if (!r.ok) throw new Error("http " + r.status);
          return r.json();
        })
        .then(function () {
          clearTimeout(corta);
          dizer(
            "Recebido, " + d.nome.split(" ")[0] + ". Vou ler o seu caso e responder no " +
            d.email + " com a estratégia, o prazo e o valor — junto com o catálogo completo.",
            "ok",
          );
          form.reset();
          botao.textContent = "Proposta solicitada";
          botao.setAttribute("aria-busy", "true"); // segue travado: já enviou
        })
        .catch(function () {
          clearTimeout(corta);
          // Plano B: leva os mesmos dados para o WhatsApp, sem perder o lead.
          var url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(comoTexto(d));
          dizer("O envio por e-mail falhou aqui. Abri o WhatsApp com os seus dados já preenchidos — é só mandar.", "ruim");
          botao.removeAttribute("aria-busy");
          botao.textContent = "Receber minha proposta";
          window.open(url, "_blank", "noopener");
        });
    });

    // Âncoras que levam ao formulário já deixam o cursor no primeiro campo.
    document.querySelectorAll("[data-ancora]").forEach(function (a) {
      a.addEventListener("click", function () {
        setTimeout(function () {
          var alvo = document.getElementById("pNome");
          if (alvo) alvo.focus({ preventScroll: true });
        }, 700);
      });
    });
  }

  function iniciarHero() {
    hideLoader();
    initDeepLinks();
    initReveals();
    initProposta();

    if (CINEMA && ctx && hasST) {
      // Cinema: pin e timeline montados agora, com o canvas ainda vazio por
      // cima do poster. Rolar já conta a história desde o primeiro segundo;
      // os quadros vão preenchendo o canvas em segundo plano.
      sizeCanvas();
      buildHeroTimeline(true);
      preloadFramesInBackground();
    } else {
      doc.classList.remove("mode-cinema");
      doc.classList.add("mode-static");
      initFallbackHero();
    }
    if (hasST) requestAnimationFrame(function () { ScrollTrigger.refresh(); });
  }

  /** Baixa os quadros em segundo plano; o canvas aparece quando houver base. */
  function preloadFramesInBackground() {
    var carregados = 0;
    var falhas = 0;
    var canvasVisivel = false;

    function talvezMostrarCanvas() {
      // Espera uma base razoável para que a troca poster -> canvas não pisque
      // exibindo um quadro distante do ponto onde a pessoa está.
      if (canvasVisivel || carregados < FRAME_COUNT * 0.5) return;
      canvasVisivel = true;
      doc.classList.add("quadros-prontos");
      render();
      movimentoAmbiente();
    }

    for (var i = 0; i < FRAME_COUNT; i++) {
      (function (idx) {
        var img = new Image();
        // baixa prioridade: não disputa banda com o conteúdo real da página
        if ("fetchPriority" in img) img.fetchPriority = "low";
        img.decoding = "async";
        img.onload = function () {
          carregados++;
          // redesenha enquanto os quadros chegam, para o canvas acompanhar a
          // posição atual de rolagem em vez de ficar preso num quadro antigo
          if (canvasVisivel) render();
          else talvezMostrarCanvas();
        };
        img.onerror = function () {
          falhas++;
          // sequência inteira indisponível → o poster continua no lugar
          if (falhas === FRAME_COUNT) doc.classList.remove("quadros-prontos");
        };
        img.src = framePath(idx + 1);
        frames[idx] = img;
      })(i);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
