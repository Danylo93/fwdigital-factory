import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Globe, Code, TrendingUp, CheckCircle, Star } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Apps Mobile",
      description: "Aplicativos nativos e híbridos para iOS e Android",
      features: ["React Native / Flutter", "UI/UX Profissional", "Integração com APIs", "Publicação nas Stores"],
      popular: false,
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Sistemas Web",
      description: "Plataformas completas para gestão e automação",
      features: ["Dashboard Administrativo", "Banco de Dados", "Autenticação Segura", "Relatórios Avançados"],
      popular: true,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sites Profissionais",
      description: "Sites institucionais responsivos e otimizados",
      features: ["Design Responsivo", "SEO Otimizado", "CMS Intuitivo", "Certificado SSL"], 
      popular: false,
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Landing Pages",
      description: "Páginas de alta conversão para suas campanhas",
      features: ["Conversão Otimizada", "A/B Testing", "Analytics Integrado", "Forms Inteligentes"],
      popular: false,
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos <span className="bg-gradient-primary bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para transformar suas ideias em realidade digital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="animate-scale-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className={`relative h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 ${service.popular ? 'ring-2 ring-primary shadow-glow' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Mais Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full text-primary-foreground w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
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