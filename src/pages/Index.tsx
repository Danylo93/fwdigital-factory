import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BannerCarousel from "@/components/BannerCarousel";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BannerCarousel />
        <Services />
        <Solutions />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
