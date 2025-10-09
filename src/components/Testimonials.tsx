import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "CEO - Tech Solutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      content: "O site desenvolvido pela FW Digital aumentou nossos leads em 45% no primeiro mês. Profissionalismo e qualidade excepcionais!",
      rating: 5,
      result: "+45% de leads"
    },
    {
      name: "Ana Paula Silva",
      role: "Proprietária - Boutique Elegance",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      content: "O app mobile revolucionou nossas vendas. Interface linda e funcional. Recomendo muito!",
      rating: 5,
      result: "+60% em vendas"
    },
    {
      name: "Roberto Lima",
      role: "Diretor - Clínica Vida",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      content: "O robô de WhatsApp com IA automatizou 80% do nosso atendimento. Economia de tempo e melhoria na experiência do cliente.",
      rating: 5,
      result: "80% de automação"
    },
    {
      name: "Juliana Costa",
      role: "Marketing - Startup Inovadora",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
      content: "Landing page perfeita! Conversão triplicou após o lançamento. Equipe atenciosa e prazo cumprido.",
      rating: 5,
      result: "3x mais conversões"
    },
    {
      name: "Fernando Souza",
      role: "Fundador - Delivery Express",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
      content: "Aplicativo de delivery top! Clientes adoraram a experiência. Suporte técnico sempre disponível.",
      rating: 5,
      result: "+200 pedidos/dia"
    },
    {
      name: "Mariana Oliveira",
      role: "Gerente - Consultoria Empresarial",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
      content: "Sistema web completo que organizou toda nossa operação. Valeu cada centavo investido!",
      rating: 5,
      result: "100% organizado"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prova Social & <span className="bg-gradient-primary bg-clip-text text-transparent">Casos de Sucesso</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre nosso trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-scale-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-primary/10">
                  <Quote className="h-16 w-16" />
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full ring-2 ring-primary/20"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="inline-block bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    📈 {testimonial.result}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
