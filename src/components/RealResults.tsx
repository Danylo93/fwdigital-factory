import { TrendingUp, Users, DollarSign, Clock, Quote, ArrowRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "./motion/Reveal";
import SectionHeading from "./motion/SectionHeading";
import SpotlightCard from "./motion/SpotlightCard";
import AnimatedCounter from "./motion/AnimatedCounter";
import WhatsAppCTA from "./WhatsAppCTA";

const RealResults = () => {
  const { t } = useLanguage();

  const results = [
    {
      icon: TrendingUp,
      before: t("real-results.result1.before"),
      after: t("real-results.result1.after"),
      description: t("real-results.result1.description"),
      metric: t("real-results.result1.metric"),
      metricLabel: t("real-results.result1.label"),
    },
    {
      icon: Clock,
      before: t("real-results.result2.before"),
      after: t("real-results.result2.after"),
      description: t("real-results.result2.description"),
      metric: t("real-results.result2.metric"),
      metricLabel: t("real-results.result2.label"),
    },
    {
      icon: Users,
      before: t("real-results.result3.before"),
      after: t("real-results.result3.after"),
      description: t("real-results.result3.description"),
      metric: t("real-results.result3.metric"),
      metricLabel: t("real-results.result3.label"),
    },
    {
      icon: DollarSign,
      before: t("real-results.result4.before"),
      after: t("real-results.result4.after"),
      description: t("real-results.result4.description"),
      metric: t("real-results.result4.metric"),
      metricLabel: t("real-results.result4.label"),
    },
  ];

  const testimonials = [
    {
      name: t("real-results.testimonial1.name"),
      business: t("real-results.testimonial1.business"),
      text: t("real-results.testimonial1.text"),
      result: t("real-results.testimonial1.result"),
    },
    {
      name: t("real-results.testimonial2.name"),
      business: t("real-results.testimonial2.business"),
      text: t("real-results.testimonial2.text"),
      result: t("real-results.testimonial2.result"),
    },
    {
      name: t("real-results.testimonial3.name"),
      business: t("real-results.testimonial3.business"),
      text: t("real-results.testimonial3.text"),
      result: t("real-results.testimonial3.result"),
    },
  ];

  return (
    <section id="real-results" className="relative space-section">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container-responsive">
        <SectionHeading
          eyebrow={t("real-results.badge")}
          title={t("real-results.title")}
          highlight={t("real-results.highlight")}
          subtitle={t("real-results.subtitle")}
          className="mb-16"
        />

        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((result, index) => (
            <Reveal key={result.metricLabel} delay={(index % 2) * 0.1}>
              <SpotlightCard className="h-full p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border/60 bg-muted/50 text-primary">
                    <result.icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <AnimatedCounter
                      value={result.metric}
                      className="block font-display text-4xl font-bold text-gradient-brand"
                    />
                    <div className="text-xs text-muted-foreground">{result.metricLabel}</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 rounded-md border border-border/50 bg-muted/30 p-4 sm:flex-row sm:items-center">
                  <span className="text-sm text-muted-foreground line-through decoration-destructive/60">
                    {result.before}
                  </span>
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-primary sm:block" />
                  <span className="text-sm font-semibold text-foreground">{result.after}</span>
                </div>

                <p className="mt-5 text-body-sm leading-relaxed text-muted-foreground">
                  {result.description}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Testimonials */}
        <Reveal className="mb-10 mt-24 text-center">
          <h3 className="font-display text-2xl uppercase text-foreground sm:text-3xl">
            {t("real-results.testimonials.title")}
          </h3>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <SpotlightCard className="flex h-full flex-col p-7">
                <Quote className="h-8 w-8 text-primary/40" />
                <div className="mt-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-body-md italic leading-relaxed text-muted-foreground">
                  "{testimonial.text}"
                </p>
                <div className="mt-6 border-t border-border/50 pt-5">
                  <div className="font-heading text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                  <div className="mt-3 inline-flex rounded-sm bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-success">
                    {testimonial.result}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-16 text-center">
          <h3 className="font-display text-2xl uppercase text-foreground sm:text-3xl">
            {t("real-results.cta.title")}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-body-md text-muted-foreground">
            {t("real-results.cta.description")}
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppCTA message="Olá! Vi os resultados dos clientes e quero saber como conseguir os mesmos para meu negócio.">
              {t("real-results.cta.button")}
            </WhatsAppCTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default RealResults;
