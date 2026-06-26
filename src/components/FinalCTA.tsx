import { Rocket, MessageCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./motion/Reveal";
import AnimatedCounter from "./motion/AnimatedCounter";
import WhatsAppCTA from "./WhatsAppCTA";

const FinalCTA = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Rocket, title: t("final-cta.feature1.title"), description: t("final-cta.feature1.description") },
    { icon: MessageCircle, title: t("final-cta.feature2.title"), description: t("final-cta.feature2.description") },
    { icon: Clock, title: t("final-cta.feature3.title"), description: t("final-cta.feature3.description") },
  ];

  const stats = [
    { number: "100+", label: t("final-cta.stats.projects") },
    { number: "98%", label: t("final-cta.stats.satisfaction") },
    { number: "24/7", label: t("final-cta.stats.support") },
    { number: "10+", label: t("final-cta.stats.experience") },
  ];

  const trust = [
    t("final-cta.response"),
    t("final-cta.consultation"),
    t("final-cta.no-commitment"),
  ];

  return (
    <section id="final-cta" className="relative space-section">
      <div className="container-responsive">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-brand px-6 py-16 sm:px-12 md:py-24">
          {/* Texture + glow */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 mix-blend-overlay" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center text-white">
            <Reveal>
              <span className="eyebrow text-white/85">
                <span className="h-px w-8 bg-white" />
                {t("final-cta.badge")}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl uppercase leading-[1.04] sm:text-5xl lg:text-6xl">
                {t("final-cta.title")}{" "}
                <span className="text-white/70">{t("final-cta.highlight")}</span>{" "}
                {t("final-cta.title.end")}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/85">
                {t("final-cta.subtitle")}
              </p>
            </Reveal>

            {/* Features */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={0.2 + index * 0.08}>
                  <div className="h-full rounded-md border border-white/15 bg-white/10 p-6 text-left backdrop-blur-md transition-transform hover:-translate-y-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/15">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg uppercase tracking-tight">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal delay={0.3} className="mt-12">
              <WhatsAppCTA
                message="Olá! Quero falar com um especialista da FW Digital e entender como vocês podem transformar meu negócio."
                tone="light"
                className="h-16 px-10 text-lg"
              >
                {t("final-cta.button")}
              </WhatsAppCTA>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
                {trust.map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-10 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter
                    value={stat.number}
                    className="block font-display text-3xl font-bold sm:text-4xl"
                  />
                  <div className="mt-1 text-sm text-white/75">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
