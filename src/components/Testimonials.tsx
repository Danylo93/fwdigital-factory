import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: t('testimonial.1.role'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      content: t('testimonial.1.content'),
      rating: 5,
      result: t('testimonial.1.result')
    },
    {
      name: "Ana Paula Silva",
      role: t('testimonial.2.role'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      content: t('testimonial.2.content'),
      rating: 5,
      result: t('testimonial.2.result')
    },
    {
      name: "Roberto Lima",
      role: t('testimonial.3.role'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      content: t('testimonial.3.content'),
      rating: 5,
      result: t('testimonial.3.result')
    },
    {
      name: "Juliana Costa",
      role: t('testimonial.4.role'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
      content: t('testimonial.4.content'),
      rating: 5,
      result: t('testimonial.4.result')
    },
    {
      name: "Fernando Souza",
      role: t('testimonial.5.role'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
      content: t('testimonial.5.content'),
      rating: 5,
      result: t('testimonial.5.result')
    },
    {
      name: "Mariana Oliveira",
      role: t('testimonial.6.role'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
      content: t('testimonial.6.content'),
      rating: 5,
      result: t('testimonial.6.result')
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('testimonials.title')} <span className="bg-gradient-primary bg-clip-text text-transparent">{t('testimonials.highlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
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
