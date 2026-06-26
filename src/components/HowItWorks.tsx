import { Target, TrendingUp, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./motion/Reveal";
import Parallax from "./motion/Parallax";
import SectionHeading from "./motion/SectionHeading";
import SpotlightCard from "./motion/SpotlightCard";
import WhatsAppCTA from "./WhatsAppCTA";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Target,
      number: "01",
      title: t("how-it-works.step1.title"),
      description: t("how-it-works.step1.description"),
    },
    {
      icon: TrendingUp,
      number: "02",
      title: t("how-it-works.step2.title"),
      description: t("how-it-works.step2.description"),
    },
    {
      icon: Rocket,
      number: "03",
      title: t("how-it-works.step3.title"),
      description: t("how-it-works.step3.description"),
    },
  ];

  return (
    <section id="how-it-works" className="relative space-section">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container-responsive">
        <SectionHeading
          eyebrow={t("how-it-works.badge")}
          title={t("how-it-works.title")}
          highlight={t("how-it-works.highlight")}
          subtitle={t("how-it-works.subtitle")}
          className="mb-16"
        />

        <div className="relative grid gap-6 md:grid-cols-3 lg:gap-8">
          {/* Connecting line behind the cards */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />

          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.12}>
              <SpotlightCard className="h-full p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <Parallax amount={28}>
                    <span className="block font-display text-6xl font-bold text-foreground/[0.08]">
                      {step.number}
                    </span>
                  </Parallax>
                </div>

                <h3 className="mt-7 font-heading text-xl uppercase tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-3 text-body-md leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <WhatsAppCTA message="Olá! Quero dar o primeiro passo com a FW Digital.">
            {t("how-it-works.cta")}
          </WhatsAppCTA>
        </Reveal>
      </div>
    </section>
  );
};

export default HowItWorks;
