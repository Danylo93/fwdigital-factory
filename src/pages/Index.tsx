import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import OurOffer from "@/components/OurOffer";
import WhoIsItFor from "@/components/WhoIsItFor";
import RealResults from "@/components/RealResults";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
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
