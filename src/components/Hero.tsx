import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroBackgroundCarousel from "./HeroBackgroundCarousel";

const Hero = () => {
  const { t } = useLanguage();

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
          {/* Badge */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-full px-6 py-3 mb-8 transition-all duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium tracking-wide">{t('hero.badge')}</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
            {t('hero.title')}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('hero.highlight')}
            </span>{" "}
            {t('hero.title.end')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-12 animate-fade-up" style={{animationDelay: '0.4s'}}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-16 animate-fade-up px-4 sm:px-0" style={{animationDelay: '0.6s'}}>
            <Button
              size="lg"
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-105 group min-w-[320px] min-h-[64px]"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Quero transformar meu negócio digitalmente com a FW Digital.', '_blank')}
            >
              <FaWhatsapp className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              {t('hero.cta.transform')}
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
