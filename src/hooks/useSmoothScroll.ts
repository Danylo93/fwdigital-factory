import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Shared Lenis instance so scroll helpers (nav, CTAs) can drive the same
 * smooth-scroll engine that powers the scroll-linked animations.
 */
let lenisInstance: Lenis | null = null;

/** Smoothly scroll to a section id, accounting for the fixed header. */
export const scrollToId = (id: string, offset = -72) => {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Initializes Lenis smooth scrolling (FIAP-style weighted scroll) and runs the
 * rAF loop. Disabled when the user prefers reduced motion. Mount once.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      // expo-out easing for that heavy, premium glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};
