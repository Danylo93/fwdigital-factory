import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Globe, Code, TrendingUp, CheckCircle, Star } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sites Profissionais",
      description: "Sites institucionais, lojas virtuais e landing pages",
      features: ["Design Responsivo", "SEO Otimizado", "Alta Performance", "Certificado SSL"],
      popular: false,
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Aplicativos Mobile",
      description: "Apps nativos e híbridos para iOS e Android",
      features: ["React Native / Flutter", "UI/UX Premium", "Integração APIs", "Publicação nas Stores"],
      popular: false,
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Robôs WhatsApp com IA",
      description: "Automação inteligente para atendimento 24/7",
      features: ["Atendimento Automático", "IA OpenAI", "Integração CRM", "Analytics Completo"],
      popular: true,
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Sistemas Web",
      description: "Plataformas completas para gestão e automação",
      features: ["Dashboard Admin", "Banco de Dados", "Autenticação Segura", "Relatórios Avançados"],
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
            Nossos <span className="text-gradient-primary">Serviços</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para transformar suas ideias em realidade digital
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
                      Mais Popular
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
                    <div className="text-lg font-semibold text-muted-foreground mb-4">Orçamento personalizado</div>
                    <Button 
                      variant={service.popular ? "hero" : "default"} 
                      className="w-full"
                      onClick={scrollToContact}
                    >
                      Agendar Reunião
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <div className="bg-gradient-card rounded-2xl p-8 max-w-4xl mx-auto shadow-medium">
            <h3 className="text-2xl font-bold mb-4">Precisa de algo personalizado?</h3>
            <p className="text-muted-foreground mb-6">
              Desenvolvemos soluções sob medida para atender suas necessidades específicas. 
              Entre em contato para discutirmos seu projeto.
            </p>
            <Button variant="gradient" size="lg" onClick={scrollToContact}>
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;