import { Globe, Smartphone, Bot, TrendingUp, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const OurOffer = () => {
  const { t } = useLanguage();
  const benefits = [
    {
      icon: Globe,
      title: t('our-offer.benefit1.title'),
      description: t('our-offer.benefit1.description')
    },
    {
      icon: Bot,
      title: t('our-offer.benefit2.title'),
      description: t('our-offer.benefit2.description')
    },
    {
      icon: TrendingUp,
      title: t('our-offer.benefit3.title'),
      description: t('our-offer.benefit3.description')
    },
    {
      icon: Shield,
      title: t('our-offer.benefit4.title'),
      description: t('our-offer.benefit4.description')
    },
    {
      icon: Smartphone,
      title: t('our-offer.benefit5.title'),
      description: t('our-offer.benefit5.description')
    },
    {
      icon: Headphones,
      title: t('our-offer.benefit6.title'),
      description: t('our-offer.benefit6.description')
    }
  ];

  return (
    <section id="our-offer" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 mb-6 font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              {t('our-offer.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('our-offer.title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('our-offer.highlight')}</span>
            </h2>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Explanation */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('our-offer.implementation.title')}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {t('our-offer.implementation.description')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('our-offer.step1.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('our-offer.step1.description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('our-offer.step2.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('our-offer.step2.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-105 group min-w-[280px]"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Quero entender como a implementação + recorrência pode ajudar meu negócio.', '_blank')}
            >
              <FaWhatsapp className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              {t('our-offer.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOffer;
