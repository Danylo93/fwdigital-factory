import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Solutions = () => {
  const { t } = useLanguage();
  const solutionsData = [
    {
      category: t('solutions.websites.category'),
      icon: "🌐",
      plans: [
        {
          name: "Landing Page",
          features: ["Página única", "CTA WhatsApp", "SEO básico", "Responsivo"]
        },
        {
          name: "Site Institucional",
          features: ["3-5 páginas", "Formulário de contato", "Google Maps", "Blog"]
        },
        {
          name: "Loja Virtual",
          features: ["Carrinho de compras", "Pagamento integrado", "Gestão de produtos", "Relatórios"]
        }
      ]
    },
    {
      category: t('solutions.apps.category'),
      icon: "📱",
      plans: [
        {
          name: "App Simples",
          features: ["Catálogo digital", "Delivery local", "Push notifications", "iOS + Android"]
        },
        {
          name: "App com Backend",
          features: ["Sistema de login", "Chat integrado", "Notificações", "APIs personalizadas"]
        },
        {
          name: "App Sob Medida",
          features: ["Marketplace completo", "Gestão avançada", "Integrações complexas", "Suporte dedicado"]
        }
      ]
    },
    {
      category: t('solutions.bots.category'),
      icon: "🤖",
      plans: [
        {
          name: "Bot Básico",
          features: ["Respostas automáticas", "Menu simples", "Horário de atendimento", "Relatórios básicos"]
        },
        {
          name: "Bot com IA",
          features: ["Atendimento inteligente", "OpenAI integrado", "Aprendizado contínuo", "Analytics avançado"]
        },
        {
          name: "Bot Avançado",
          features: ["Integração CRM", "APIs personalizadas", "Multi-atendente", "Dashboard completo"]
        }
      ]
    },
    {
      category: t('solutions.combos.category'),
      icon: "🎁",
      plans: [
        {
          name: "Presença Digital",
          features: ["Site profissional", "Bot WhatsApp", "Google Meu Negócio", "Suporte mensal"]
        },
        {
          name: "Automação Comercial",
          features: ["Site + Bot IA", "CRM integrado", "Email marketing", "Gestão de leads"]
        },
        {
          name: "Premium Empresarial",
          features: ["App + Site + IA", "Automação completa", "Gestão de leads", "Suporte prioritário"]
        }
      ]
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="py-20 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('language.current') === 'Idioma atual' ? 'Nossas' : 'Our'} <span className="bg-gradient-primary bg-clip-text text-transparent">{t('solutions.title').split(' ')[1]}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            {t('solutions.subtitle')}
          </p>
          <div className="inline-flex items-center gap-3 glass rounded-2xl p-6 hover-glass transition-glass">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <p className="font-semibold text-lg">💡 {t('solutions.quote.text')}</p>
          </div>
        </div>

        <div className="space-y-16">
          {solutionsData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-fade-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
                <span className="text-5xl">{category.icon}</span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">{category.category}</span>
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {category.plans.map((plan, planIndex) => (
                  <Card
                    key={planIndex}
                    className="relative glass hover-lift transition-smooth rounded-3xl border-white/10 group"
                  >
                    <CardHeader className="text-center pb-6 p-8">
                      <CardTitle className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                      <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                        Solicite um orçamento personalizado
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 p-8 pt-0">
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                            <span className="text-base leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-full mt-8 rounded-2xl py-6 text-lg font-semibold hover-lift shadow-glass"
                        variant="outline"
                        onClick={scrollToContact}
                      >
                        {t('solutions.quote.button')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-up">
          <Card className="max-w-2xl mx-auto bg-gradient-primary text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t('solutions.custom.title')}</h3>
              <p className="mb-6 text-white/90">
                {t('solutions.custom.description')}
              </p>
              <div className="space-y-2 text-sm text-white/80 mb-6">
                <p>🌐 www.agenciafwdigital.com.br</p>
                <p>💬 WhatsApp: (11) 96489-1128</p>
                <p>✉️ contato@agenciafwdigital.com.br</p>
              </div>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={scrollToContact}
              >
                {t('solutions.custom.button')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
