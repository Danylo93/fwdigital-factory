import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToId } from "@/hooks/useSmoothScroll";
import fwLogo from "@/assets/fw-logo.png";

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const menuItems = [
    { label: t("nav.services"), id: "our-offer" },
    { label: t("nav.how"), id: "how-it-works" },
    { label: t("nav.cases"), id: "real-results" },
    { label: t("nav.contact"), id: "final-cta" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = ["hero", "how-it-works", "our-offer", "who-is-it-for", "real-results", "final-cta"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    scrollToId(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <div
        className={`container mx-auto flex h-14 items-center justify-between rounded-2xl px-3 pl-4 transition-all duration-300 sm:h-16 ${
          isScrolled
            ? "border border-border/60 bg-background/70 shadow-glass backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          className="group flex items-center gap-2.5"
          onClick={() => scrollToSection("hero")}
          aria-label={t("company.name")}
        >
          <img
            src={fwLogo}
            alt={t("alt.fw-logo")}
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            FW<span className="text-gradient-brand">Digital</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3.5 py-2 font-heading text-xs font-bold uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSelector />
          <ThemeToggle />
          <Button
            onClick={() => scrollToSection("final-cta")}
            className="rounded-sm bg-primary px-5 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow hover:brightness-110"
          >
            {t("header.cta")}
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="container mx-auto mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-glass backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col p-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className={`rounded-sm border-l-2 px-4 py-3 text-left font-heading text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeSection === item.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-2 flex items-center gap-3 border-t border-border/60 px-2 pt-3">
                <LanguageSelector />
                <Button
                  onClick={() => scrollToSection("final-cta")}
                  className="flex-1 rounded-sm bg-primary font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground"
                >
                  {t("header.cta")}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
