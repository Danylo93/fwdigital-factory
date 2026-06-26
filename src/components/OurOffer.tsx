import { Globe, Smartphone, Bot, TrendingUp, Shield, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./motion/Reveal";
import SectionHeading from "./motion/SectionHeading";
import SpotlightCard from "./motion/SpotlightCard";
import WhatsAppCTA from "./WhatsAppCTA";

const OurOffer = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Globe, title: t("our-offer.benefit1.title"), description: t("our-offer.benefit1.description") },
    { icon: Bot, title: t("our-offer.benefit2.title"), description: t("our-offer.benefit2.description") },
    { icon: TrendingUp, title: t("our-offer.benefit3.title"), description: t("our-offer.benefit3.description") },
    { icon: Shield, title: t("our-offer.benefit4.title"), description: t("our-offer.benefit4.description") },
    { icon: Smartphone, title: t("our-offer.benefit5.title"), description: t("our-offer.benefit5.description") },
    { icon: Headphones, title: t("our-offer.benefit6.title"), description: t("our-offer.benefit6.description") },
  ];

  const flow = [
    { step: "1", title: t("our-offer.step1.title"), description: t("our-offer.step1.description") },
    { step: "2", title: t("our-offer.step2.title"), description: t("our-offer.step2.description") },
  ];

  return (
    <section id="our-offer" className="relative space-section">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container-responsive relative">
        <SectionHeading
          eyebrow={t("our-offer.badge")}
          title={t("our-offer.title")}
          highlight={t("our-offer.highlight")}
          subtitle={t("our-offer.implementation.description")}
          className="mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Featured: implementation + recurrence flow */}
          <Reveal direction="right" className="lg:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-8">
              <h3 className="font-heading text-2xl uppercase tracking-tight text-foreground">
                {t("our-offer.implementation.title")}
              </h3>

              <div className="mt-8 flex flex-col gap-8">
                {flow.map((f, i) => (
                  <div key={f.step} className="relative flex gap-4">
                    {i < flow.length - 1 && (
                      <span className="absolute left-[1.4rem] top-12 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/50 to-transparent" />
                    )}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
                      {f.step}
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-foreground">{f.title}</h4>
                      <p className="mt-1.5 text-body-sm leading-relaxed text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <WhatsAppCTA
                  message="Olá! Quero entender como a implementação + recorrência pode ajudar meu negócio."
                  className="w-full"
                >
                  {t("our-offer.cta")}
                </WhatsAppCTA>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Benefits bento grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.07}>
                <SpotlightCard className="h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border/60 bg-muted/50 text-primary transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 font-heading text-base uppercase tracking-tight text-foreground">{benefit.title}</h4>
                  <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOffer;
