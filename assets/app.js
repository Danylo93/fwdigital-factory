/* ============================================================
   FW Digital — Cinematic scroll engine
   Frame-sequence canvas · GSAP ScrollTrigger · Lenis smooth scroll
   ============================================================ */
(function () {
  "use strict";

  var PHONE = "5511934079208";
  var FRAME_COUNT = 121;
  var framePath = function (n) {
    return "assets/cinema/frames/hero/f_" + String(n).padStart(4, "0") + ".jpg";
  };

  var doc = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Full frame-scrub cinema on wide viewports (desktop / large tablets).
  // Phones fall back to a light autoplay video; reduced-motion to a static poster.
  // Gated by width + reduced-motion (not pointer) so touch-laptops still get cinema.
  var CINEMA = !reduced && window.innerWidth >= 1000;
  var MODE = CINEMA ? "cinema" : reduced ? "static" : "video";
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
    if (!canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
  }
  function render() {
    if (!ctx) return;
    var img = frames[Math.round(state.frame)];
    if (!img || !img.complete || !img.naturalWidth) return;
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
  function hideLoader() {
    if (loader) loader.classList.add("done");
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

  /* ---------- Hero cinema timeline ---------- */
  function buildHeroTimeline() {
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

    // ---- Scroll scrub: frame sequence + parallax + hand off into the screen ----
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: function () { return "+=" + Math.round(window.innerHeight * 3.4); },
        scrub: 1,
        pin: true,
        anticipatePin: 1,
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
    // Near the end: fade the copy and push into the (now glowing) screen
    tl.to(copy, { opacity: 0, filter: "blur(5px)", ease: "power2.in", duration: 0.16 }, 0.8);
  }

  /* ---------- Non-cinema hero (mobile video / static) ---------- */
  function initFallbackHero() {
    var copy = document.getElementById("heroCopy");
    var cue = document.getElementById("scrollCue");
    var video = document.getElementById("heroVideo");
    if (MODE === "video" && video) {
      video.setAttribute("preload", "auto");
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
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
    // Desktop cinema only — mobile keeps native (lighter) scrolling.
    if (!CINEMA || typeof window.Lenis === "undefined") return;
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    if (hasST) lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Boot ---------- */
  function boot() {
    if (hasST) gsap.registerPlugin(ScrollTrigger);
    initLenis();

    if (CINEMA && ctx) {
      sizeCanvas();
      var loaded = 0;
      for (var i = 0; i < FRAME_COUNT; i++) {
        (function (idx) {
          var img = new Image();
          img.onload = img.onerror = function () {
            loaded++;
            setProgress(loaded / FRAME_COUNT);
            if (loaded === FRAME_COUNT) onFramesReady();
          };
          img.src = framePath(idx + 1);
          frames[idx] = img;
        })(i);
      }
    } else {
      // video / static modes: no frame preload
      setProgress(1);
      hideLoader();
      initFallbackHero();
      initReveals();
      if (hasST) requestAnimationFrame(function () { ScrollTrigger.refresh(); });
    }

    window.addEventListener("resize", function () {
      sizeCanvas();
      render();
      if (hasST) ScrollTrigger.refresh();
    });
  }

  function onFramesReady() {
    sizeCanvas();
    render();
    hideLoader();
    if (hasST) {
      buildHeroTimeline();
      initReveals();
      requestAnimationFrame(function () { ScrollTrigger.refresh(); });
    } else {
      initFallbackHero();
    }
  }

  // Safety: never let a stuck asset hide the site behind the loader.
  setTimeout(function () {
    if (loader && !loader.classList.contains("done")) {
      hideLoader();
      if (CINEMA && !frames.some(function (f) { return f && f.complete; })) {
        // frames failed → downgrade to static poster
        doc.classList.remove("mode-cinema");
        doc.classList.add("mode-static");
        initFallbackHero();
        initReveals();
        if (hasST) ScrollTrigger.refresh();
      }
    }
  }, 9000);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
