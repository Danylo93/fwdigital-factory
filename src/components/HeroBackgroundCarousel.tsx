import { useEffect, useState } from "react";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";

const HeroBackgroundCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: image1 },
    { image: image2 },
    { image: image3 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 segundos para transição mais dinâmica

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
      
      {/* Overlay adaptativo para legibilidade */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/30" />
    </div>
  );
};

export default HeroBackgroundCarousel;
