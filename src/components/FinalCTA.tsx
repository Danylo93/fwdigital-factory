import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Rocket, MessageCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: Rocket,
      title: t('final-cta.feature1.title'),
      description: t('final-cta.feature1.description')
    },
    {
      icon: MessageCircle,
      title: t('final-cta.feature2.title'),
      description: t('final-cta.feature2.description')
    },
    {
      icon: Clock,
      title: t('final-cta.feature3.title'),
      description: t('final-cta.feature3.description')
    }
  ];

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Main Content */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-3 mb-8 font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {t('final-cta.badge')}
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {t('final-cta.title')}{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {t('final-cta.highlight')}
              </span>{" "}
              {t('final-cta.title.end')}
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              {t('final-cta.subtitle')}
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="space-y-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-12 py-8 text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group min-w-[350px] min-h-[80px]"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Quero falar com um especialista da FW Digital e entender como vocês podem transformar meu negócio.', '_blank')}
            >
              <FaWhatsapp className="mr-4 h-8 w-8 transition-transform group-hover:scale-110" />
              {t('final-cta.button')}
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">{t('final-cta.response')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm">{t('final-cta.consultation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm">{t('final-cta.no-commitment')}</span>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-white/70 text-sm">{t('final-cta.stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-white/70 text-sm">{t('final-cta.stats.satisfaction')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24h</div>
                <div className="text-white/70 text-sm">{t('final-cta.stats.support')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">10+</div>
                <div className="text-white/70 text-sm">{t('final-cta.stats.experience')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
