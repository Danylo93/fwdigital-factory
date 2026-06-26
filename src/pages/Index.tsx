import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import HowItWorks from "@/components/HowItWorks";
import OurOffer from "@/components/OurOffer";
import WhoIsItFor from "@/components/WhoIsItFor";
import RealResults from "@/components/RealResults";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <HowItWorks />
        <OurOffer />
        <WhoIsItFor />
        <RealResults />
        <FinalCTA />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
