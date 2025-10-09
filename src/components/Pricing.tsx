import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const pricingData = [
    {
      category: "Sites Profissionais",
      icon: "🌐",
      plans: [
        {
          name: "Landing Page",
          price: "R$ 490 - R$ 790",
          features: ["Página única", "CTA WhatsApp", "SEO básico", "Responsivo"]
        },
        {
          name: "Site Institucional",
          price: "R$ 890 - R$ 1.490",
          features: ["3-5 páginas", "Formulário de contato", "Google Maps", "Blog"]
        },
        {
          name: "Loja Virtual",
          price: "R$ 1.990 - R$ 3.490",
          features: ["Carrinho de compras", "Pagamento integrado", "Gestão de produtos", "Relatórios"]
        }
      ]
    },
    {
      category: "Aplicativos Mobile",
      icon: "📱",
      plans: [
        {
          name: "App Simples",
          price: "R$ 1.990 - R$ 3.500",
          features: ["Catálogo digital", "Delivery local", "Push notifications", "iOS + Android"]
        },
        {
          name: "App com Backend",
          price: "R$ 4.000 - R$ 8.000",
          features: ["Sistema de login", "Chat integrado", "Notificações", "APIs personalizadas"]
        },
        {
          name: "App Sob Medida",
          price: "R$ 10.000+",
          features: ["Marketplace completo", "Gestão avançada", "Integrações complexas", "Suporte dedicado"]
        }
      ]
    },
    {
      category: "Robôs WhatsApp com IA",
      icon: "🤖",
      plans: [
        {
          name: "Bot Básico",
          price: "R$ 490 setup + R$ 99/mês",
          features: ["Respostas automáticas", "Menu simples", "Horário de atendimento", "Relatórios básicos"]
        },
        {
          name: "Bot com IA",
          price: "R$ 890 setup + R$ 199/mês",
          features: ["Atendimento inteligente", "OpenAI integrado", "Aprendizado contínuo", "Analytics avançado"]
        },
        {
          name: "Bot Avançado",
          price: "R$ 1.490 setup + R$ 299/mês",
          features: ["Integração CRM", "APIs personalizadas", "Multi-atendente", "Dashboard completo"]
        }
      ]
    },
    {
      category: "Combos FW Digital",
      icon: "🎁",
      plans: [
        {
          name: "Presença Digital",
          price: "R$ 890 setup + R$ 99/mês",
          features: ["Site profissional", "Bot WhatsApp", "Google Meu Negócio", "Suporte mensal"]
        },
        {
          name: "Automação Comercial",
          price: "R$ 1.490 setup + R$ 199/mês",
          features: ["Site + Bot IA", "CRM integrado", "Email marketing", "Gestão de leads"]
        },
        {
          name: "Premium Empresarial",
          price: "R$ 3.990+ setup + R$ 299/mês",
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
    <section id="pricing" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Catálogo Digital <span className="bg-gradient-primary bg-clip-text text-transparent">FW Digital 2025</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Valores estimados para diferentes tipos de projetos
          </p>
          <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p className="font-semibold">💡 Para saber os valores exatos, marque uma reunião personalizada</p>
          </div>
        </div>

        <div className="space-y-16">
          {pricingData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-fade-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <span className="text-4xl">{category.icon}</span>
                {category.category}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {category.plans.map((plan, planIndex) => (
                  <Card 
                    key={planIndex} 
                    className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-purple-100"
                  >
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-primary">
                        {plan.price}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full mt-6" 
                        variant="outline"
                        onClick={scrollToContact}
                      >
                        Solicitar Orçamento
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
              <h3 className="text-2xl font-bold mb-4">Precisa de algo diferente?</h3>
              <p className="mb-6 text-white/90">
                Criamos soluções personalizadas para cada tipo de negócio. 
                Entre em contato e vamos conversar sobre seu projeto!
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
                Agendar Reunião Grátis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
