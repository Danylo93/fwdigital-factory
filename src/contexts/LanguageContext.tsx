import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  'nav.services': { pt: 'Serviços', en: 'Services' },
  'nav.solutions': { pt: 'Soluções', en: 'Solutions' },
  'nav.cases': { pt: 'Cases', en: 'Cases' },
  'nav.contact': { pt: 'Contato', en: 'Contact' },
  'header.cta': { pt: 'Orçamento Grátis', en: 'Free Quote' },
  
  // Hero
  'hero.title': { pt: 'Transformamos ideias em', en: 'We transform ideas into' },
  'hero.highlight': { pt: 'negócios digitais', en: 'digital businesses' },
  'hero.subtitle': { pt: 'Sites, Apps e Robôs de WhatsApp com IA para impulsionar seu negócio', en: 'Websites, Apps and AI WhatsApp Bots to boost your business' },
  'hero.cta.quote': { pt: 'Orçamento Grátis', en: 'Free Quote' },
  'hero.cta.whatsapp': { pt: 'Falar no WhatsApp', en: 'Talk on WhatsApp' },
  'hero.stats.projects': { pt: 'Projetos Entregues', en: 'Projects Delivered' },
  'hero.stats.experience': { pt: 'Anos de Experiência', en: 'Years of Experience' },
  'hero.stats.satisfaction': { pt: 'Satisfação', en: 'Satisfaction' },
  'hero.stats.support': { pt: 'Suporte', en: 'Support' },
  
  // Services
  'services.title': { pt: 'Nossos Serviços', en: 'Our Services' },
  'services.subtitle': { pt: 'Soluções digitais completas para o seu negócio', en: 'Complete digital solutions for your business' },
  'services.websites.title': { pt: 'Sites Profissionais', en: 'Professional Websites' },
  'services.websites.description': { pt: 'Sites modernos e responsivos', en: 'Modern and responsive websites' },
  'services.apps.title': { pt: 'Apps Mobile', en: 'Mobile Apps' },
  'services.apps.description': { pt: 'Aplicativos para iOS e Android', en: 'Apps for iOS and Android' },
  'services.systems.title': { pt: 'Sistemas Web', en: 'Web Systems' },
  'services.systems.description': { pt: 'Sistemas personalizados', en: 'Custom systems' },
  'services.bots.title': { pt: 'Robôs WhatsApp IA', en: 'AI WhatsApp Bots' },
  'services.bots.description': { pt: 'Automação inteligente', en: 'Intelligent automation' },

  // Services detailed
  'services.websites.full.title': { pt: 'Sites Profissionais', en: 'Professional Websites' },
  'services.websites.full.description': { pt: 'Sites institucionais, lojas virtuais e landing pages', en: 'Institutional websites, online stores and landing pages' },
  'services.apps.full.title': { pt: 'Aplicativos Mobile', en: 'Mobile Applications' },
  'services.apps.full.description': { pt: 'Apps nativos e híbridos para iOS e Android', en: 'Native and hybrid apps for iOS and Android' },
  'services.bots.full.title': { pt: 'Robôs WhatsApp com IA', en: 'AI WhatsApp Bots' },
  'services.bots.full.description': { pt: 'Automação inteligente para atendimento 24/7', en: 'Intelligent automation for 24/7 customer service' },
  'services.systems.full.title': { pt: 'Sistemas Web', en: 'Web Systems' },
  'services.systems.full.description': { pt: 'Plataformas completas para gestão e automação', en: 'Complete platforms for management and automation' },
  'services.detailed.subtitle': { pt: 'Soluções completas para transformar suas ideias em realidade digital', en: 'Complete solutions to transform your ideas into digital reality' },
  'services.quote.text': { pt: 'Orçamento personalizado', en: 'Custom quote' },
  'services.quote.button': { pt: 'Agendar Reunião', en: 'Schedule Meeting' },
  'services.custom.title': { pt: 'Precisa de algo personalizado?', en: 'Need something custom?' },
  'services.custom.description': { pt: 'Desenvolvemos soluções sob medida para atender suas necessidades específicas. Entre em contato para discutirmos seu projeto.', en: 'We develop custom solutions to meet your specific needs. Contact us to discuss your project.' },
  'services.custom.button': { pt: 'Falar com Especialista', en: 'Talk to Specialist' },

  // Solutions
  'solutions.title': { pt: 'Nossas Soluções', en: 'Our Solutions' },
  'solutions.subtitle': { pt: 'Pacotes digitais completos para o seu negócio', en: 'Complete digital packages for your business' },
  'solutions.quote.text': { pt: 'Solicite um orçamento personalizado para seu projeto', en: 'Request a personalized quote for your project' },
  'solutions.quote.button': { pt: 'Solicitar Orçamento', en: 'Request Quote' },
  'solutions.quote.description': { pt: 'Solicite um orçamento personalizado', en: 'Request a personalized quote' },

  // Solutions categories
  'solutions.websites.category': { pt: 'Sites Profissionais', en: 'Professional Websites' },
  'solutions.apps.category': { pt: 'Aplicativos Mobile', en: 'Mobile Applications' },
  'solutions.bots.category': { pt: 'Robôs WhatsApp IA', en: 'AI WhatsApp Bots' },
  'solutions.systems.category': { pt: 'Sistemas Web', en: 'Web Systems' },
  'solutions.combos.category': { pt: 'Combos Agência FW Digital', en: 'FW Digital Agency Combos' },
  'solutions.custom.title': { pt: 'Precisa de algo diferente?', en: 'Need something different?' },
  'solutions.custom.description': { pt: 'Criamos soluções personalizadas para cada tipo de negócio. Entre em contato e vamos conversar sobre seu projeto!', en: 'We create custom solutions for every type of business. Contact us and let\'s talk about your project!' },
  'solutions.custom.button': { pt: 'Agendar Reunião Grátis', en: 'Schedule Free Meeting' },
  
  // Contact
  'contact.title': { pt: 'Entre em Contato', en: 'Get in Touch' },
  'contact.subtitle': { pt: 'Vamos conversar sobre seu projeto', en: 'Let\'s talk about your project' },
  'contact.form.title': { pt: 'Envie sua mensagem', en: 'Send your message' },
  'contact.form.name': { pt: 'Nome completo', en: 'Full name' },
  'contact.form.email': { pt: 'E-mail', en: 'Email' },
  'contact.form.phone': { pt: 'Telefone', en: 'Phone' },
  'contact.form.service': { pt: 'Serviço de interesse', en: 'Service of interest' },
  'contact.form.message': { pt: 'Mensagem', en: 'Message' },
  'contact.form.submit': { pt: 'Enviar Mensagem', en: 'Send Message' },
  'contact.success.title': { pt: 'Mensagem enviada com sucesso!', en: 'Message sent successfully!' },
  'contact.success.description': { pt: 'Entraremos em contato em até 24 horas.', en: 'We will contact you within 24 hours.' },
  'contact.info.phone': { pt: 'Telefone', en: 'Phone' },
  'contact.info.email': { pt: 'E-mail', en: 'Email' },
  'contact.info.location': { pt: 'Localização', en: 'Location' },
  'contact.info.hours': { pt: 'Horário', en: 'Hours' },
  'contact.info.hours.value': { pt: 'Seg - Sex: 9h às 18h', en: 'Mon - Fri: 9am to 6pm' },
  'contact.form.budget': { pt: 'Orçamento Estimado', en: 'Estimated Budget' },
  'contact.form.budget.placeholder': { pt: 'Selecione uma faixa', en: 'Select a range' },
  'contact.form.service.placeholder': { pt: 'Selecione um serviço', en: 'Select a service' },
  'contact.form.name.placeholder': { pt: 'Seu nome completo', en: 'Your full name' },
  'contact.form.email.placeholder': { pt: 'seu@email.com', en: 'your@email.com' },
  'contact.form.phone.placeholder': { pt: '(11) 93407-9208', en: '(11) 93407-9208' },
  'contact.form.message.placeholder': { pt: 'Conte-nos sobre seu projeto...', en: 'Tell us about your project...' },

  // Banner Carousel
  'banner.1.title': { pt: 'Transforme sua ideia em realidade', en: 'Transform your idea into reality' },
  'banner.1.subtitle': { pt: 'Apps mobile de alta qualidade para iOS e Android', en: 'High-quality mobile apps for iOS and Android' },
  'banner.1.cta': { pt: 'Agendar Reunião', en: 'Schedule Meeting' },
  'banner.2.title': { pt: 'Sistemas web que fazem a diferença', en: 'Web systems that make a difference' },
  'banner.2.subtitle': { pt: 'Plataformas robustas para gestão empresarial', en: 'Robust platforms for business management' },
  'banner.2.cta': { pt: 'Conversar no WhatsApp', en: 'Chat on WhatsApp' },
  'banner.3.title': { pt: 'Sua presença digital profissional', en: 'Your professional digital presence' },
  'banner.3.subtitle': { pt: 'Sites e landing pages que convertem visitantes em clientes', en: 'Websites and landing pages that convert visitors into customers' },
  'banner.3.cta': { pt: 'Ver Portfólio', en: 'View Portfolio' },

  // Testimonials
  'testimonials.title': { pt: 'Prova Social &', en: 'Social Proof &' },
  'testimonials.highlight': { pt: 'Casos de Sucesso', en: 'Success Stories' },
  'testimonials.subtitle': { pt: 'Veja o que nossos clientes têm a dizer sobre nosso trabalho', en: 'See what our clients have to say about our work' },
  'testimonial.1.role': { pt: 'CEO - Tech Solutions', en: 'CEO - Tech Solutions' },
  'testimonial.1.content': { pt: 'O site desenvolvido pela FW Digital aumentou nossos leads em 45% no primeiro mês. Profissionalismo e qualidade excepcionais!', en: 'The website developed by FW Digital increased our leads by 45% in the first month. Exceptional professionalism and quality!' },
  'testimonial.1.result': { pt: '+45% de leads', en: '+45% leads' },
  'testimonial.2.role': { pt: 'Proprietária - Boutique Elegance', en: 'Owner - Boutique Elegance' },
  'testimonial.2.content': { pt: 'O app mobile revolucionou nossas vendas. Interface linda e funcional. Recomendo muito!', en: 'The mobile app revolutionized our sales. Beautiful and functional interface. Highly recommend!' },
  'testimonial.2.result': { pt: '+60% em vendas', en: '+60% in sales' },
  'testimonial.3.role': { pt: 'Diretor - Clínica Vida', en: 'Director - Vida Clinic' },
  'testimonial.3.content': { pt: 'O robô de WhatsApp com IA automatizou 80% do nosso atendimento. Economia de tempo e melhoria na experiência do cliente.', en: 'The AI WhatsApp bot automated 80% of our customer service. Time savings and improved customer experience.' },
  'testimonial.3.result': { pt: '80% de automação', en: '80% automation' },
  'testimonial.4.role': { pt: 'Marketing - Startup Inovadora', en: 'Marketing - Innovative Startup' },
  'testimonial.4.content': { pt: 'Landing page perfeita! Conversão triplicou após o lançamento. Equipe atenciosa e prazo cumprido.', en: 'Perfect landing page! Conversion tripled after launch. Attentive team and deadline met.' },
  'testimonial.4.result': { pt: '3x mais conversões', en: '3x more conversions' },
  'testimonial.5.role': { pt: 'Fundador - Delivery Express', en: 'Founder - Delivery Express' },
  'testimonial.5.content': { pt: 'Aplicativo de delivery top! Clientes adoraram a experiência. Suporte técnico sempre disponível.', en: 'Top delivery app! Customers loved the experience. Technical support always available.' },
  'testimonial.5.result': { pt: '+200 pedidos/dia', en: '+200 orders/day' },
  'testimonial.6.role': { pt: 'Gerente - Consultoria Empresarial', en: 'Manager - Business Consulting' },
  'testimonial.6.content': { pt: 'Sistema web completo que organizou toda nossa operação. Valeu cada centavo investido!', en: 'Complete web system that organized our entire operation. Worth every penny invested!' },
  'testimonial.6.result': { pt: '100% organizado', en: '100% organized' },
  
  // Footer
  'footer.company.description': { pt: 'Transformamos ideias em negócios digitais. Sites, Apps e Robôs de WhatsApp com IA.', en: 'We transform ideas into digital businesses. Websites, Apps and AI WhatsApp Bots.' },
  'footer.services.title': { pt: 'Serviços', en: 'Services' },
  'footer.services.websites': { pt: 'Sites Profissionais', en: 'Professional Websites' },
  'footer.services.apps': { pt: 'Apps Mobile', en: 'Mobile Apps' },
  'footer.services.bots': { pt: 'Robôs WhatsApp IA', en: 'AI WhatsApp Bots' },
  'footer.services.systems': { pt: 'Sistemas Web', en: 'Web Systems' },
  'footer.links.title': { pt: 'Links Rápidos', en: 'Quick Links' },
  'footer.contact.title': { pt: 'Contato', en: 'Contact' },
  'footer.copyright': { pt: '© 2025 Agência FW Digital. Todos os direitos reservados.', en: '© 2025 FW Digital Agency. All rights reserved.' },
  'footer.privacy': { pt: 'Política de Privacidade', en: 'Privacy Policy' },
  'footer.terms': { pt: 'Termos de Uso', en: 'Terms of Use' },
  
  // AI Chat
  'chat.placeholder': { pt: 'Digite sua pergunta...', en: 'Type your question...' },
  'chat.whatsapp.button': { pt: 'Falar no WhatsApp', en: 'Talk on WhatsApp' },
  'chat.welcome': {
    pt: 'Olá! 👋 Sou o assistente virtual da Agência FW Digital. Como posso ajudá-lo hoje? Posso responder sobre nossos serviços, tecnologias e muito mais!',
    en: 'Hello! 👋 I\'m the virtual assistant of FW Digital Agency. How can I help you today? I can answer about our services, technologies and much more!'
  },
  
  // Language selector
  'language.change': { pt: 'Alterar idioma', en: 'Change language' },
  'language.current': { pt: 'Idioma atual', en: 'Current language' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language] || translation.pt || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
