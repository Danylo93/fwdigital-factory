import { Target, TrendingUp, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = [
    {
      icon: Target,
      number: "1",
      title: t('how-it-works.step1.title'),
      description: t('how-it-works.step1.description'),
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      number: "2", 
      title: t('how-it-works.step2.title'),
      description: t('how-it-works.step2.description'),
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Rocket,
      number: "3",
      title: t('how-it-works.step3.title'),
      description: t('how-it-works.step3.description'),
      color: "from-pink-500 to-red-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 mb-6 font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              {t('how-it-works.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('how-it-works.title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('how-it-works.highlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('how-it-works.subtitle')}
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0"></div>
                )}
                
                {/* Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group-hover:border-primary/20">
                  {/* Number Badge */}
                  <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-105 group min-w-[280px]"
              onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Quero dar o primeiro passo com a FW Digital.', '_blank')}
            >
              <FaWhatsapp className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              {t('how-it-works.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
