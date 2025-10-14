import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import fwLogo from "@/assets/fw-logo.png";

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: t('nav.services'), id: 'our-offer' },
    { label: t('nav.solutions'), id: 'our-offer' },
    { label: t('nav.cases'), id: 'real-results' },
    { label: t('nav.contact'), id: 'final-cta' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'backdrop-blur-md bg-white/80 dark:bg-white/10 border-b border-gray-200/50 dark:border-white/20 shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <img src={fwLogo} alt={t('alt.fw-logo')} className="h-12 w-12 group-hover:scale-110 transition-transform" />
            <span className="text-heading-md">
              <span className="text-gradient-primary">{t('company.name')}</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-body-md text-white hover:text-primary transition-colors duration-200 font-medium hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA & Controls */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <Button
              variant="hero"
              onClick={() => scrollToSection('final-cta')}
              className="rounded-2xl px-6 py-3 font-semibold hover-lift shadow-glass"
            >
              {t('header.cta')}
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              className="p-2 hover:bg-accent rounded-lg transition-colors text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 glass border-b border-white/10 shadow-glass animate-slide-up rounded-b-3xl mx-4">
            <nav className="p-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-white hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
                <Button
                  variant="hero"
                  onClick={() => scrollToSection('final-cta')}
                  className="w-full rounded-2xl py-3 font-semibold"
                >
                  {t('header.cta')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;