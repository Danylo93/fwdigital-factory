import { MapPin, Briefcase, Users, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./motion/Reveal";
import SectionHeading from "./motion/SectionHeading";
import SpotlightCard from "./motion/SpotlightCard";
import WhatsAppCTA from "./WhatsAppCTA";

const WhoIsItFor = () => {
  const { t } = useLanguage();

  const targetAudiences = [
    {
      icon: MapPin,
      title: t("who-is-it-for.audience1.title"),
      subtitle: t("who-is-it-for.audience1.subtitle"),
      description: t("who-is-it-for.audience1.description"),
      examples: t("who-is-it-for.examples1").split(", "),
      gradient: "from-primary to-accent",
    },
    {
      icon: Briefcase,
      title: t("who-is-it-for.audience2.title"),
      subtitle: t("who-is-it-for.audience2.subtitle"),
      description: t("who-is-it-for.audience2.description"),
      examples: t("who-is-it-for.examples2").split(", "),
      gradient: "from-accent to-secondary",
    },
    {
      icon: Users,
      title: t("who-is-it-for.audience3.title"),
      subtitle: t("who-is-it-for.audience3.subtitle"),
      description: t("who-is-it-for.audience3.description"),
      examples: t("who-is-it-for.examples3").split(", "),
      gradient: "from-secondary to-primary",
    },
    {
      icon: Truck,
      title: t("who-is-it-for.audience4.title"),
      subtitle: t("who-is-it-for.audience4.subtitle"),
      description: t("who-is-it-for.audience4.description"),
      examples: t("who-is-it-for.examples4").split(", "),
      gradient: "from-primary to-secondary",
    },
  ];

  return (
    <section id="who-is-it-for" className="relative space-section">
      <div className="container-responsive">
        <SectionHeading
          eyebrow={t("who-is-it-for.badge")}
          title={t("who-is-it-for.title")}
          highlight={t("who-is-it-for.highlight")}
          subtitle={t("who-is-it-for.subtitle")}
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {targetAudiences.map((audience, index) => (
            <Reveal key={audience.title} delay={(index % 2) * 0.1}>
              <SpotlightCard className="h-full p-8">
                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${audience.gradient} text-white shadow-lg`}
                  >
                    <audience.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl uppercase tracking-tight text-foreground">{audience.title}</h3>
                    <p className="text-sm font-medium text-primary">{audience.subtitle}</p>
                  </div>
                </div>

                <p className="mt-5 text-body-md leading-relaxed text-muted-foreground">
                  {audience.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {audience.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-sm border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA band */}
        <Reveal delay={0.1} className="mt-10">
          <div className="gradient-border relative overflow-hidden rounded-lg bg-card/50 p-10 text-center backdrop-blur-xl md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-edges opacity-60" />
            <div className="relative">
              <h3 className="font-display text-2xl uppercase text-foreground sm:text-3xl">
                {t("who-is-it-for.bottom.title")}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-body-md text-muted-foreground">
                {t("who-is-it-for.bottom.description")}
              </p>
              <div className="mt-8 flex justify-center">
                <WhatsAppCTA message="Olá! Me identifiquei com o perfil e quero saber como vocês podem me ajudar.">
                  {t("who-is-it-for.cta")}
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhoIsItFor;
