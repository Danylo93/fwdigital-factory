import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-image.jpg";
import HeroBackgroundCarousel from "./HeroBackgroundCarousel";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Carousel */}
      <HeroBackgroundCarousel />

      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10" />

      {/* Simplified animated shapes - reduced quantity and opacity */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float z-20"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float z-20" style={{animationDelay: '2s'}}></div>



      {/* Content */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="max-w-6xl mx-auto text-center text-white dark:text-white">
          {/* Simplified Badge */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-full px-6 py-3 mb-8 transition-all duration-300">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium tracking-wide">✨ Tecnologia & Inovação</span>
            </div>
          </div>
          {/* Cleaner Typography */}
          <h1 className="text-display-xl mb-8 leading-tight animate-fade-up" style={{animationDelay: '0.2s'}}>
            {t('hero.title')} <span className="text-gradient-primary">{t('hero.highlight')}</span>
          </h1>

          <p className="text-heading-lg mb-6 text-white/90 dark:text-white/90 animate-fade-up" style={{animationDelay: '0.4s'}}>
            {t('hero.subtitle')}
          </p>

          <p className="text-body-lg mb-12 text-white/80 dark:text-white/80 max-w-2xl mx-auto animate-fade-up" style={{animationDelay: '0.6s'}}>
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
              {t('hero.cta.quote')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 glass-ultra border-white/30 text-white hover-lift w-full sm:w-auto rounded-2xl font-semibold group min-h-[56px] touch-manipulation gradient-border"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Gostaria de saber mais sobre os serviços da Agência FW Digital.', '_blank')}
            >
              <FaWhatsapp className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {t('hero.cta.whatsapp')}
            </Button>
          </div>

          {/* Modern Stats - Mobile Optimized */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto animate-fade-up px-4 sm:px-0 relative z-40" style={{animationDelay: '1s'}}>
            {[
              { number: "100+", label: t('hero.stats.projects') },
              { number: "10+", label: t('hero.stats.experience') },
              { number: "98%", label: t('hero.stats.satisfaction') },
              { number: "24/7", label: t('hero.stats.support') },
            ].map((stat, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-4 sm:p-6 hover:-translate-y-2 transition-all duration-300 touch-manipulation group" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                <div className="text-heading-xl mb-2 text-gradient-primary group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-body-sm text-white/70 dark:text-white/70 font-medium leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="glass w-8 h-12 rounded-full flex items-start justify-center p-3 hover-glass transition-glass cursor-pointer">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
