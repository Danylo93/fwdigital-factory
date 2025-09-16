import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    {
      title: "Transforme sua ideia em realidade",
      subtitle: "Apps mobile de alta qualidade para iOS e Android",
      cta: "Agendar Reunião",
      gradient: "from-primary via-primary-glow to-secondary"
    },
    {
      title: "Sistemas web que fazem a diferença",
      subtitle: "Plataformas robustas para gestão empresarial",
      cta: "Conversar no WhatsApp", 
      gradient: "from-secondary via-accent to-primary"
    },
    {
      title: "Sua presença digital profissional",
      subtitle: "Sites e landing pages que convertem visitantes em clientes",
      cta: "Ver Portfólio",
      gradient: "from-primary-glow via-secondary to-primary"
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os serviços da FW Digital.', '_blank');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          {banners.map((banner, index) => (
            <Card 
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out bg-gradient-to-br ${banner.gradient} border-0 ${
                index === currentBanner ? 'translate-x-0' : 
                index < currentBanner ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div className="p-8 md:p-12 text-center min-h-[300px] flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 animate-fade-up">
                  {banner.title}
                </h3>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" 
                   style={{ animationDelay: '0.1s' }}>
                  {banner.subtitle}
                </p>
                <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  <Button 
                    variant="secondary"
                    size="lg"
                    onClick={banner.cta === "Conversar no WhatsApp" ? openWhatsApp : scrollToContact}
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-8 py-3 text-lg"
                  >
                    {banner.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {/* First banner visible by default */}
          <Card className="bg-gradient-to-br from-primary via-primary-glow to-secondary border-0">
            <div className="p-8 md:p-12 text-center min-h-[300px] flex flex-col justify-center opacity-0">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Placeholder
              </h3>
            </div>
          </Card>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;