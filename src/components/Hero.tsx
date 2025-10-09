import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Modern Background with gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Animated Background Shapes - Lower z-index */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-float -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/3 rounded-full blur-3xl animate-float -z-10" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/2 rounded-full blur-3xl animate-float -z-10" style={{animationDelay: '2s'}}></div>



      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-white">
          {/* Modern Badge */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-8 hover-glass transition-glass">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium tracking-wide">✨ Tecnologia & Inovação</span>
            </div>
          </div>
          {/* Modern Typography */}
          <h1 className="text-display-xl mb-8 leading-tight animate-fade-up text-shadow-soft" style={{animationDelay: '0.2s'}}>
            Transformamos <span className="text-gradient-primary">ideias</span> em
            <br className="hidden md:block" />
            negócios <span className="text-gradient-primary">digitais</span>
          </h1>

          <p className="text-heading-lg mb-6 text-white/90 animate-fade-up text-shadow-soft" style={{animationDelay: '0.4s'}}>
            Sites, Apps e Robôs de WhatsApp com IA
          </p>

          <p className="text-body-lg mb-12 text-white/80 max-w-2xl mx-auto animate-fade-up" style={{animationDelay: '0.6s'}}>
            Soluções completas para levar sua empresa ao próximo nível. Criamos experiências digitais que geram resultados reais.
          </p>

          {/* Modern CTA Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center mb-16 animate-fade-up px-4 sm:px-0" style={{animationDelay: '0.8s'}}>
            <Button
              size="lg"
              variant="secondary"
              className="btn-modern text-white w-full sm:w-auto min-h-[56px] touch-manipulation group shadow-glow-primary"
              onClick={scrollToContact}
            >
              Orçamento Grátis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 glass-ultra border-white/30 text-white hover-lift w-full sm:w-auto rounded-2xl font-semibold group min-h-[56px] touch-manipulation gradient-border"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Gostaria de saber mais sobre os serviços da Agência FW Digital.', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Falar no WhatsApp
            </Button>
          </div>

          {/* Modern Stats - Mobile Optimized */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto animate-fade-up px-4 sm:px-0 relative z-20" style={{animationDelay: '1s'}}>
            {[
              { number: "100+", label: "Projetos Entregues" },
              { number: "5+", label: "Anos de Experiência" },
              { number: "98%", label: "Satisfação" },
              { number: "24/7", label: "Suporte" },
            ].map((stat, index) => (
              <div key={index} className="glass-card-modern p-4 sm:p-6 hover-lift-strong transition-all duration-300 touch-manipulation group" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                <div className="text-heading-xl mb-2 text-gradient-primary text-shadow-glow group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-body-sm text-white/70 font-medium leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass w-8 h-12 rounded-full flex items-start justify-center p-3 hover-glass transition-glass cursor-pointer">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
