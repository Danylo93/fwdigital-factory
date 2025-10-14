import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Globe, Code, TrendingUp, CheckCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('services.websites.full.title'),
      description: t('services.websites.full.description'),
      features: [
        t('services.features.responsive'),
        t('services.features.seo'),
        t('services.features.performance'),
        t('services.features.ssl')
      ],
      popular: false,
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t('services.apps.full.title'),
      description: t('services.apps.full.description'),
      features: [
        t('services.features.react-native'),
        t('services.features.ui-ux'),
        t('services.features.api'),
        t('services.features.stores')
      ],
      popular: false,
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: t('services.bots.full.title'),
      description: t('services.bots.full.description'),
      features: [
        t('services.features.automation'),
        t('services.features.openai'),
        t('services.features.crm'),
        t('services.features.analytics')
      ],
      popular: true,
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('services.systems.full.title'),
      description: t('services.systems.full.description'),
      features: [
        t('services.features.dashboard'),
        t('services.features.database'),
        t('services.features.auth'),
        t('services.features.reports')
      ],
      popular: false,
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="space-section bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-display-md mb-6">
            {t('services.title')}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="animate-scale-up group" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className={`relative h-full glass-card-modern hover-lift-strong transition-all duration-300 ${service.popular ? 'ring-2 ring-primary/50 shadow-glow-primary pulse-glow' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-glass">
                      <Star className="h-4 w-4" />
                      {t('services.popular')}
                    </div>
                  </div>
                )}

                <CardHeader className="text-center p-8">
                  <div className="mx-auto mb-6 p-4 bg-gradient-primary rounded-2xl text-primary-foreground w-fit shadow-glass group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="text-lg font-semibold text-muted-foreground mb-4">{t('services.quote.text')}</div>
                    <Button
                      variant={service.popular ? "hero" : "default"}
                      className="w-full"
                      onClick={scrollToContact}
                    >
                      {t('services.quote.button')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <div className="bg-gradient-card rounded-2xl p-8 max-w-4xl mx-auto shadow-medium">
            <h3 className="text-2xl font-bold mb-4">{t('services.custom.title')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('services.custom.description')}
            </p>
            <Button variant="gradient" size="lg" onClick={scrollToContact}>
              {t('services.custom.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;