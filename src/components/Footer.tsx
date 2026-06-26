import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappUrl } from "./WhatsAppCTA";
import { scrollToId } from "@/hooks/useSmoothScroll";
import fwLogo from "@/assets/fw-logo.png";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    scrollToId(sectionId);
  };

  const services = [
    t("footer.services.websites"),
    t("footer.services.apps"),
    t("footer.services.bots"),
    t("footer.services.systems"),
  ];

  const links = [
    { label: t("nav.services"), id: "our-offer" },
    { label: t("nav.how"), id: "how-it-works" },
    { label: t("nav.cases"), id: "real-results" },
    { label: t("nav.contact"), id: "final-cta" },
  ];

  const socials = [
    { Icon: FaWhatsapp, href: whatsappUrl("Olá! Gostaria de saber mais sobre os serviços da Agência FW Digital."), label: "WhatsApp" },
    { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-muted/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-grid mask-fade-b opacity-40" />

      <div className="container-responsive relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <img src={fwLogo} alt={t("alt.fw-logo")} className="h-10 w-10" />
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                FW<span className="text-gradient-brand">Digital</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-body-sm leading-relaxed text-muted-foreground">
              {t("footer.company.description")}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/60 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm uppercase tracking-wide text-foreground">
              {t("footer.services.title")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection("our-offer")}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm uppercase tracking-wide text-foreground">
              {t("footer.links.title")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm uppercase tracking-wide text-foreground">
              {t("footer.contact.title")}
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href="tel:+5511934079208"
                  className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  (11) 93407-9208
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@agenciafwdigital.com.br"
                  className="group flex items-center gap-3 break-all text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  contato@agenciafwdigital.com.br
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                São Paulo, SP
              </li>
            </ul>
            <a
              href={whatsappUrl("Olá! Gostaria de um orçamento com a Agência FW Digital.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              {t("header.cta")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
