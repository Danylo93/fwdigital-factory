import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToId } from "@/hooks/useSmoothScroll";
import Aurora from "./Aurora";
import AnimatedCounter from "./motion/AnimatedCounter";
import SplitWords, { type WordSegment } from "./motion/SplitWords";

const WHATSAPP_URL =
  "https://wa.me/5511934079208?text=" +
  encodeURIComponent("Olá! Quero transformar meu negócio digitalmente com a FW Digital.");

const EASE = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax (FIAP-style kinetic depth).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Per-element entrance (explicit, so it never interferes with the headline's
  // word-by-word reveal).
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const stats = [
    { number: "100+", label: t("hero.stats.projects") },
    { number: "10+", label: t("hero.stats.experience") },
    { number: "98%", label: t("hero.stats.satisfaction") },
    { number: "24/7", label: t("hero.stats.support") },
  ];

  const headline: WordSegment[] = [
    { text: t("hero.title") },
    { text: t("hero.highlight"), highlight: true },
    { text: t("hero.title.end") },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Ambient animated background (no heavy images) */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Aurora intensity="bold" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        className="container-responsive relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div {...reveal(0.1)}>
            <span className="eyebrow rounded-sm border border-primary/30 px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Headline — word-by-word mask reveal (FIAP SplitText style) */}
          <SplitWords
            as="h1"
            segments={headline}
            delay={0.3}
            stagger={0.07}
            className="mt-7 flex flex-wrap justify-center text-balance font-display text-4xl uppercase leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
          />

          {/* Subtitle */}
          <motion.p
            {...reveal(0.5)}
            className="mt-6 max-w-2xl text-pretty text-body-lg text-muted-foreground"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...reveal(0.65)}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group h-auto min-h-[3.5rem] w-full whitespace-normal rounded-sm bg-primary px-7 py-3.5 text-center font-heading text-sm font-bold uppercase tracking-wide leading-tight text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-strong hover:brightness-110 sm:w-auto sm:px-9 sm:text-[0.95rem]"
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
            >
              <FaWhatsapp className="mr-2.5 h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              {t("hero.cta.transform")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-fill group h-auto min-h-[3.5rem] w-full rounded-sm border-primary/60 bg-transparent px-9 font-heading text-[0.95rem] font-bold uppercase tracking-wide text-foreground transition-all duration-300 hover:border-primary hover:text-primary-foreground sm:w-auto"
              onClick={() => scrollToId("real-results")}
            >
              {t("hero.cta.cases")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            {...reveal(0.8)}
            className="mt-7 flex items-center gap-2.5 text-sm text-muted-foreground"
          >
            <span className="flex -space-x-2">
              {["bg-primary", "bg-secondary", "bg-accent"].map((c, i) => (
                <span key={i} className={`h-7 w-7 rounded-full border-2 border-background ${c}`} />
              ))}
            </span>
            <span>{t("hero.trust")}</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...reveal(0.95)}
            className="mt-14 grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="gradient-border rounded-md bg-card/40 p-5 backdrop-blur-md transition-smooth hover:-translate-y-1.5 hover:bg-card/60"
              >
                <AnimatedCounter
                  value={stat.number}
                  className="block font-display text-3xl text-gradient-brand sm:text-4xl"
                />
                <div className="mt-1.5 text-[0.7rem] font-heading font-semibold uppercase tracking-wider leading-tight text-muted-foreground sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border/70 p-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
