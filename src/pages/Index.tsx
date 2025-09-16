import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BannerCarousel from "@/components/BannerCarousel";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BannerCarousel />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
