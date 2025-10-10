import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import aboutImage from "@/assets/about.png";
import about1Image from "@/assets/about-1.png";

const BannerCarousel = () => {
  const { t } = useLanguage();
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    {
      title: t('banner.1.title'),
      subtitle: t('banner.1.subtitle'),
      cta: t('banner.1.cta'),
      gradient: "from-primary via-primary-glow to-secondary",
      backgroundImage: null
    },
    {
      title: t('banner.2.title'),
      subtitle: t('banner.2.subtitle'),
      cta: t('banner.2.cta'),
      gradient: "from-secondary via-accent to-primary",
      backgroundImage: null
    },
    {
      title: t('banner.3.title'),
      subtitle: t('banner.3.subtitle'),
      cta: t('banner.3.cta'),
      gradient: "from-primary-glow via-secondary to-primary",
      backgroundImage: null
    },
    {
      title: t('banner.1.title'),
      subtitle: t('banner.1.subtitle'),
      cta: t('banner.1.cta'),
      gradient: "from-primary/80 via-primary-glow/80 to-secondary/80",
      backgroundImage: aboutImage
    },
    {
      title: t('banner.2.title'),
      subtitle: t('banner.2.subtitle'),
      cta: t('banner.2.cta'),
      gradient: "from-secondary/80 via-accent/80 to-primary/80",
      backgroundImage: about1Image
    }
  ];



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          {banners.map((banner, index) => (
            <Card
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out border-0 ${
                index === currentBanner ? 'translate-x-0' :
                index < currentBanner ? '-translate-x-full' : 'translate-x-full'
              }`}
              style={{
                backgroundImage: banner.backgroundImage ? `url(${banner.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} ${banner.backgroundImage ? 'bg-opacity-80' : ''}`} />
              <div className="relative z-10 p-8 md:p-12 text-center min-h-[300px] flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 animate-fade-up drop-shadow-lg">
                  {banner.title}
                </h3>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up drop-shadow-md"
                   style={{ animationDelay: '0.1s' }}>
                  {banner.subtitle}
                </p>

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