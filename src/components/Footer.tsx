import { Code2, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import fwLogo from "@/assets/fw-logo.png";

const Footer = () => {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="glass border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={fwLogo} alt={t('alt.fw-logo')} className="h-10 w-10" />
              <div>
                <div className="font-bold text-lg">
                  {t('company.name')}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('footer.company.description')}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.services.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('our-offer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.services.websites')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('our-offer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.services.apps')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('our-offer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.services.bots')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('our-offer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.services.systems')}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.links.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('our-offer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('our-offer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.solutions')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('real-results')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.cases')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('final-cta')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.contact.title')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+551193407-9208" className="text-muted-foreground hover:text-primary transition-colors">
                  (11) 93407-9208
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contato@agenciafwdigital.com.br" className="text-muted-foreground hover:text-primary transition-colors">
                  contato@agenciafwdigital.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;