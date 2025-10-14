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
  'hero.badge': { pt: '🚀 Especialistas em transformação digital', en: '🚀 Digital transformation specialists' },
  'hero.title': { pt: 'Transformamos o seu negócio em uma', en: 'We transform your business into a' },
  'hero.highlight': { pt: 'marca digital lucrativa', en: 'profitable digital brand' },
  'hero.title.end': { pt: '— sites, apps e automações com IA', en: '— websites, apps and AI automation' },
  'hero.subtitle': { pt: 'Soluções completas para brasileiros que vivem no exterior e querem vender mais com presença digital profissional', en: 'Complete solutions for Brazilians living abroad who want to sell more with professional digital presence' },
  'hero.original.title': { pt: 'Transformamos ideias em', en: 'We transform ideas into' },
  'hero.original.highlight': { pt: 'negócios digitais', en: 'digital businesses' },
  'hero.original.subtitle': { pt: 'Sites, Apps e Robôs de WhatsApp com IA para impulsionar seu negócio', en: 'Websites, Apps and AI WhatsApp Bots to boost your business' },
  'hero.cta.quote': { pt: 'Orçamento Grátis', en: 'Free Quote' },
  'hero.cta.whatsapp': { pt: 'Falar no WhatsApp', en: 'Talk on WhatsApp' },
  'hero.cta.transform': { pt: 'Quero transformar meu negócio digitalmente', en: 'I want to digitally transform my business' },
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
  
  // Our Offer Section
  'our-offer.badge': { pt: 'Modelo de Negócio', en: 'Business Model' },
  'our-offer.title': { pt: 'Nossa', en: 'Our' },
  'our-offer.highlight': { pt: 'Oferta', en: 'Offer' },
  'our-offer.implementation.title': { pt: 'Implementação + Recorrência', en: 'Implementation + Recurrence' },
  'our-offer.implementation.description': { pt: 'Na FW Digital, trabalhamos com uma estrutura simples e eficiente:', en: 'At FW Digital, we work with a simple and efficient structure:' },
  'our-offer.step1.title': { pt: 'Implementação', en: 'Implementation' },
  'our-offer.step1.description': { pt: 'Primeiro criamos toda a base digital do seu negócio (site, app, automação, marca).', en: 'First we create the entire digital foundation of your business (website, app, automation, brand).' },
  'our-offer.step2.title': { pt: 'Recorrência', en: 'Recurrence' },
  'our-offer.step2.description': { pt: 'Depois seguimos com a manutenção e crescimento contínuo, garantindo resultados reais mês após mês.', en: 'Then we continue with maintenance and continuous growth, ensuring real results month after month.' },
  'our-offer.benefit1.title': { pt: 'Site profissional e moderno', en: 'Professional and modern website' },
  'our-offer.benefit1.description': { pt: 'Design responsivo e otimizado para conversão', en: 'Responsive design optimized for conversion' },
  'our-offer.benefit2.title': { pt: 'Automação com IA no WhatsApp', en: 'AI automation on WhatsApp' },
  'our-offer.benefit2.description': { pt: 'Chatbots inteligentes que vendem 24/7', en: 'Intelligent chatbots that sell 24/7' },
  'our-offer.benefit3.title': { pt: 'Suporte e otimização contínua', en: 'Continuous support and optimization' },
  'our-offer.benefit3.description': { pt: 'Melhorias constantes baseadas em dados', en: 'Constant improvements based on data' },
  'our-offer.benefit4.title': { pt: 'Crescimento previsível e sustentável', en: 'Predictable and sustainable growth' },
  'our-offer.benefit4.description': { pt: 'Estratégias que geram resultados consistentes', en: 'Strategies that generate consistent results' },
  'our-offer.benefit5.title': { pt: 'Apps mobile nativos', en: 'Native mobile apps' },
  'our-offer.benefit5.description': { pt: 'Presença completa em todas as plataformas', en: 'Complete presence on all platforms' },
  'our-offer.benefit6.title': { pt: 'Suporte especializado', en: 'Specialized support' },
  'our-offer.benefit6.description': { pt: 'Time dedicado ao seu sucesso', en: 'Team dedicated to your success' },
  'our-offer.cta': { pt: 'Quero saber mais sobre a oferta', en: 'I want to know more about the offer' },
  
  // How It Works Section
  'how-it-works.badge': { pt: 'Nossa Metodologia', en: 'Our Methodology' },
  'how-it-works.title': { pt: 'Como', en: 'How' },
  'how-it-works.highlight': { pt: 'funciona', en: 'it works' },
  'how-it-works.subtitle': { pt: 'Nossa estratégia comprovada em 3 etapas para transformar seu negócio em uma máquina de vendas digital', en: 'Our proven 3-step strategy to transform your business into a digital sales machine' },
  'how-it-works.step1.title': { pt: 'Captação', en: 'Acquisition' },
  'how-it-works.step1.description': { pt: 'Entendemos o seu negócio e criamos uma presença digital feita para atrair clientes — no país onde você vive.', en: 'We understand your business and create a digital presence designed to attract customers — in the country where you live.' },
  'how-it-works.step2.title': { pt: 'Comercial', en: 'Sales' },
  'how-it-works.step2.description': { pt: 'Desenvolvemos sites, automações e funis inteligentes que convertem visitantes em clientes todos os dias.', en: 'We develop websites, automations and intelligent funnels that convert visitors into customers every day.' },
  'how-it-works.step3.title': { pt: 'Entrega', en: 'Delivery' },
  'how-it-works.step3.description': { pt: 'Você recebe tudo pronto para operar, e nós seguimos cuidando da manutenção, IA e evolução da sua marca.', en: 'You receive everything ready to operate, and we continue taking care of maintenance, AI and evolution of your brand.' },
  'how-it-works.cta': { pt: 'Quero dar o primeiro passo', en: 'I want to take the first step' },
  
  // Who Is It For Section
  'who-is-it-for.badge': { pt: 'Público Ideal', en: 'Target Audience' },
  'who-is-it-for.title': { pt: 'Para', en: 'For' },
  'who-is-it-for.highlight': { pt: 'quem é', en: 'who it is' },
  'who-is-it-for.subtitle': { pt: 'Nossas soluções são perfeitas para brasileiros empreendedores que querem dominar o mercado digital', en: 'Our solutions are perfect for Brazilian entrepreneurs who want to dominate the digital market' },
  'who-is-it-for.audience1.title': { pt: 'Brasileiros que vivem fora', en: 'Brazilians living abroad' },
  'who-is-it-for.audience1.subtitle': { pt: 'e têm negócio local', en: 'and have local business' },
  'who-is-it-for.audience1.description': { pt: 'Você mora nos EUA, Canadá, Reino Unido ou Portugal e quer profissionalizar seu negócio com presença digital forte.', en: 'You live in the USA, Canada, UK or Portugal and want to professionalize your business with a strong digital presence.' },
  'who-is-it-for.audience2.title': { pt: 'Prestadores de serviço', en: 'Service providers' },
  'who-is-it-for.audience2.subtitle': { pt: 'que querem crescer', en: 'who want to grow' },
  'who-is-it-for.audience2.description': { pt: 'Profissionais autônomos que precisam de mais clientes e querem automatizar processos de vendas.', en: 'Self-employed professionals who need more customers and want to automate sales processes.' },
  'who-is-it-for.audience3.title': { pt: 'Pequenas empresas', en: 'Small businesses' },
  'who-is-it-for.audience3.subtitle': { pt: 'em expansão', en: 'in expansion' },
  'who-is-it-for.audience3.description': { pt: 'Negócios que já funcionam mas precisam de uma presença digital profissional para crescer mais.', en: 'Businesses that already work but need a professional digital presence to grow more.' },
  'who-is-it-for.audience4.title': { pt: 'Delivery e E-commerce', en: 'Delivery and E-commerce' },
  'who-is-it-for.audience4.subtitle': { pt: 'que querem vender mais', en: 'who want to sell more' },
  'who-is-it-for.audience4.description': { pt: 'Empresas que vendem produtos ou serviços e precisam de automação para escalar as vendas.', en: 'Companies that sell products or services and need automation to scale sales.' },
  'who-is-it-for.examples': { pt: 'Exemplos:', en: 'Examples:' },
  'who-is-it-for.examples1': { pt: 'Restaurantes, Serviços de limpeza, Construção civil, Estética e beleza', en: 'Restaurants, Cleaning services, Construction, Beauty and aesthetics' },
  'who-is-it-for.examples2': { pt: 'Consultores, Coaches, Freelancers, Técnicos especializados', en: 'Consultants, Coaches, Freelancers, Specialized technicians' },
  'who-is-it-for.examples3': { pt: 'Lojas locais, Clínicas, Escritórios, Academias', en: 'Local stores, Clinics, Offices, Gyms' },
  'who-is-it-for.examples4': { pt: 'Food trucks, Lojas online, Distribuidores, Marketplaces', en: 'Food trucks, Online stores, Distributors, Marketplaces' },
  'who-is-it-for.bottom.title': { pt: 'Se identificou com algum perfil?', en: 'Did you identify with any profile?' },
  'who-is-it-for.bottom.description': { pt: 'Vamos conversar sobre como podemos transformar seu negócio em uma máquina de vendas digital', en: 'Let\'s talk about how we can transform your business into a digital sales machine' },
  'who-is-it-for.cta': { pt: 'Quero falar com um especialista', en: 'I want to talk to a specialist' },
  
  // Services detailed features
  'services.features.responsive': { pt: 'Design Responsivo', en: 'Responsive Design' },
  'services.features.seo': { pt: 'SEO Otimizado', en: 'SEO Optimized' },
  'services.features.performance': { pt: 'Alta Performance', en: 'High Performance' },
  'services.features.ssl': { pt: 'Certificado SSL', en: 'SSL Certificate' },
  'services.features.ui-ux': { pt: 'UI/UX Premium', en: 'Premium UI/UX' },
  'services.features.api': { pt: 'Integração APIs', en: 'API Integration' },
  'services.features.stores': { pt: 'Publicação nas Stores', en: 'Store Publishing' },
  'services.features.automation': { pt: 'Atendimento Automático', en: 'Automatic Support' },
  'services.features.crm': { pt: 'Integração CRM', en: 'CRM Integration' },
  'services.features.analytics': { pt: 'Analytics Completo', en: 'Complete Analytics' },
  'services.features.dashboard': { pt: 'Dashboard Admin', en: 'Admin Dashboard' },
  'services.features.database': { pt: 'Banco de Dados', en: 'Database' },
  'services.features.auth': { pt: 'Autenticação Segura', en: 'Secure Authentication' },
  'services.features.reports': { pt: 'Relatórios Avançados', en: 'Advanced Reports' },
  'services.features.react-native': { pt: 'React Native / Flutter', en: 'React Native / Flutter' },
  'services.features.openai': { pt: 'IA OpenAI', en: 'OpenAI AI' },
  'services.popular': { pt: 'Mais Popular', en: 'Most Popular' },
  
  // Solutions detailed
  'solutions.websites.landing.name': { pt: 'Landing Page', en: 'Landing Page' },
  'solutions.websites.landing.features': { pt: 'Página única, CTA WhatsApp, SEO básico, Responsivo', en: 'Single page, WhatsApp CTA, Basic SEO, Responsive' },
  'solutions.websites.institutional.name': { pt: 'Site Institucional', en: 'Institutional Website' },
  'solutions.websites.institutional.features': { pt: '3-5 páginas, Formulário de contato, Google Maps, Blog', en: '3-5 pages, Contact form, Google Maps, Blog' },
  'solutions.websites.ecommerce.name': { pt: 'Loja Virtual', en: 'Online Store' },
  'solutions.websites.ecommerce.features': { pt: 'Carrinho de compras, Pagamento integrado, Gestão de produtos, Relatórios', en: 'Shopping cart, Integrated payment, Product management, Reports' },
  'solutions.apps.simple.name': { pt: 'App Simples', en: 'Simple App' },
  'solutions.apps.simple.features': { pt: 'Catálogo digital, Delivery local, Push notifications, iOS + Android', en: 'Digital catalog, Local delivery, Push notifications, iOS + Android' },
  'solutions.apps.backend.name': { pt: 'App com Backend', en: 'App with Backend' },
  'solutions.apps.backend.features': { pt: 'Sistema de login, Chat integrado, Notificações, APIs personalizadas', en: 'Login system, Integrated chat, Notifications, Custom APIs' },
  'solutions.apps.custom.name': { pt: 'App Sob Medida', en: 'Custom App' },
  'solutions.apps.custom.features': { pt: 'Marketplace completo, Gestão avançada, Integrações complexas, Suporte dedicado', en: 'Complete marketplace, Advanced management, Complex integrations, Dedicated support' },
  'solutions.bots.basic.name': { pt: 'Bot Básico', en: 'Basic Bot' },
  'solutions.bots.basic.features': { pt: 'Respostas automáticas, Menu interativo, Integração WhatsApp, Suporte básico', en: 'Automatic responses, Interactive menu, WhatsApp integration, Basic support' },
  'solutions.bots.advanced.name': { pt: 'Bot com IA', en: 'AI Bot' },
  'solutions.bots.advanced.features': { pt: 'ChatGPT integrado, Análise de sentimento, Aprendizado contínuo, Multi-idioma', en: 'ChatGPT integrated, Sentiment analysis, Continuous learning, Multi-language' },
  'solutions.bots.enterprise.name': { pt: 'Bot Empresarial', en: 'Enterprise Bot' },
  'solutions.bots.enterprise.features': { pt: 'CRM completo, Vendas automáticas, Analytics avançado, Suporte 24/7', en: 'Complete CRM, Automatic sales, Advanced analytics, 24/7 support' },
  'solutions.systems.basic.name': { pt: 'Sistema Básico', en: 'Basic System' },
  'solutions.systems.basic.features': { pt: 'Dashboard simples, Usuários básicos, Relatórios simples, Backup automático', en: 'Simple dashboard, Basic users, Simple reports, Automatic backup' },
  'solutions.systems.advanced.name': { pt: 'Sistema Avançado', en: 'Advanced System' },
  'solutions.systems.advanced.features': { pt: 'Multi-empresa, Permissões avançadas, API completa, Integrações', en: 'Multi-company, Advanced permissions, Complete API, Integrations' },
  'solutions.systems.enterprise.name': { pt: 'Sistema Empresarial', en: 'Enterprise System' },
  'solutions.systems.enterprise.features': { pt: 'Customizado, Alta performance, Suporte dedicado, SLA garantido', en: 'Customized, High performance, Dedicated support, Guaranteed SLA' },
  'solutions.combos.presence.name': { pt: 'Presença Digital', en: 'Digital Presence' },
  'solutions.combos.presence.features': { pt: 'Site profissional, Bot WhatsApp, Google Meu Negócio, Suporte mensal', en: 'Professional website, WhatsApp Bot, Google My Business, Monthly support' },
  'solutions.combos.automation.name': { pt: 'Automação Comercial', en: 'Business Automation' },
  'solutions.combos.automation.features': { pt: 'Site + Bot IA, CRM integrado, Email marketing, Gestão de leads', en: 'Website + AI Bot, Integrated CRM, Email marketing, Lead management' },
  'solutions.combos.enterprise.name': { pt: 'Premium Empresarial', en: 'Enterprise Premium' },
  'solutions.combos.enterprise.features': { pt: 'App + Site + IA, Automação completa, Gestão de leads, Suporte prioritário', en: 'App + Website + AI, Complete automation, Lead management, Priority support' },
  
  // Contact form improvements
  'contact.title.vamos': { pt: 'Vamos', en: 'Let\'s' },
  'contact.title.conversar': { pt: 'Conversar', en: 'Talk' },
  'contact.subtitle.ready': { pt: 'Pronto para transformar sua ideia em realidade? Entre em contato conosco!', en: 'Ready to turn your idea into reality? Contact us!' },
  'contact.form.budget.title': { pt: 'Orçamento Estimado', en: 'Estimated Budget' },
  'contact.form.budget.description': { pt: 'Selecione uma faixa', en: 'Select a range' },
  'contact.form.budget.1000-5000': { pt: 'R$ 1.000 - R$ 5.000', en: '$1,000 - $5,000' },
  'contact.form.budget.5000-15000': { pt: 'R$ 5.000 - R$ 15.000', en: '$5,000 - $15,000' },
  'contact.form.budget.15000-30000': { pt: 'R$ 15.000 - R$ 30.000', en: '$15,000 - $30,000' },
  'contact.form.budget.30000+': { pt: 'Acima de R$ 30.000', en: 'Above $30,000' },
  'contact.form.message.title': { pt: 'Mensagem', en: 'Message' },
  'contact.form.message.description': { pt: 'Descreva seu projeto com o máximo de detalhes possível...', en: 'Describe your project with as much detail as possible...' },
  'contact.form.submit.sending': { pt: 'Enviando...', en: 'Sending...' },
  'contact.form.submit.text': { pt: 'Enviar Solicitação', en: 'Send Request' },
  'contact.form.service.app': { pt: 'App Mobile', en: 'Mobile App' },
  'contact.form.service.system': { pt: 'Sistema Web', en: 'Web System' },
  'contact.form.service.website': { pt: 'Site Profissional', en: 'Professional Website' },
  'contact.form.service.landing': { pt: 'Landing Page', en: 'Landing Page' },
  'contact.form.service.custom': { pt: 'Projeto Personalizado', en: 'Custom Project' },
  'contact.form.request.title': { pt: 'Solicitar Orçamento', en: 'Request Quote' },
  'contact.info.title': { pt: 'Entre em Contato', en: 'Get in Touch' },
  'contact.why.title': { pt: 'Por que escolher a Agência FW Digital?', en: 'Why choose FW Digital Agency?' },
  'contact.why.reason1': { pt: 'Entrega rápida e dentro do prazo', en: 'Fast delivery and on time' },
  'contact.why.reason2': { pt: 'Suporte técnico 24/7', en: '24/7 technical support' },
  'contact.why.reason3': { pt: 'Tecnologias modernas e seguras', en: 'Modern and secure technologies' },
  'contact.why.reason4': { pt: 'Garantia de satisfação', en: 'Satisfaction guarantee' },
  
  // Final CTA Section
  'final-cta.badge': { pt: 'Última Chance', en: 'Last Chance' },
  'final-cta.title': { pt: 'Vamos criar algo', en: 'Let\'s create something' },
  'final-cta.highlight': { pt: 'incrível', en: 'amazing' },
  'final-cta.title.end': { pt: 'pro seu negócio?', en: 'for your business?' },
  'final-cta.subtitle': { pt: 'Fale com um especialista e entenda como nossa implementação pode te levar mais longe', en: 'Talk to a specialist and understand how our implementation can take you further' },
  'final-cta.feature1.title': { pt: 'Implementação Rápida', en: 'Fast Implementation' },
  'final-cta.feature1.description': { pt: 'Seu projeto digital pronto em até 30 dias', en: 'Your digital project ready in up to 30 days' },
  'final-cta.feature2.title': { pt: 'Consultoria Gratuita', en: 'Free Consultation' },
  'final-cta.feature2.description': { pt: 'Análise completa do seu negócio sem custo', en: 'Complete analysis of your business at no cost' },
  'final-cta.feature3.title': { pt: 'Suporte Contínuo', en: 'Continuous Support' },
  'final-cta.feature3.description': { pt: 'Acompanhamento e otimizações mensais', en: 'Monthly monitoring and optimizations' },
  'final-cta.button': { pt: 'Quero falar com a FW Digital', en: 'I want to talk to FW Digital' },
  'final-cta.response': { pt: 'Resposta em até 5 minutos', en: 'Response within 5 minutes' },
  'final-cta.consultation': { pt: 'Consultoria 100% gratuita', en: '100% free consultation' },
  'final-cta.no-commitment': { pt: 'Sem compromisso', en: 'No commitment' },
  'final-cta.stats.projects': { pt: 'Projetos Entregues', en: 'Projects Delivered' },
  'final-cta.stats.satisfaction': { pt: 'Satisfação', en: 'Satisfaction' },
  'final-cta.stats.support': { pt: 'Suporte', en: 'Support' },
  'final-cta.stats.experience': { pt: 'Anos de Experiência', en: 'Years of Experience' },
  
  // Real Results Section
  'real-results.badge': { pt: 'Cases de Sucesso', en: 'Success Cases' },
  'real-results.title': { pt: 'Resultados', en: 'Real' },
  'real-results.highlight': { pt: 'Reais', en: 'Results' },
  'real-results.subtitle': { pt: 'Veja como transformamos negócios de brasileiros no exterior em máquinas de vendas digitais', en: 'See how we transformed Brazilian businesses abroad into digital sales machines' },
  'real-results.result1.before': { pt: 'Página simples no Instagram', en: 'Simple Instagram page' },
  'real-results.result1.after': { pt: '30 novos clientes por mês', en: '30 new customers per month' },
  'real-results.result1.description': { pt: 'Restaurante brasileiro em Toronto automatizou pedidos e triplicou vendas', en: 'Brazilian restaurant in Toronto automated orders and tripled sales' },
  'real-results.result1.metric': { pt: '+200%', en: '+200%' },
  'real-results.result1.label': { pt: 'Aumento nas vendas', en: 'Sales increase' },
  'real-results.result2.before': { pt: 'Atendimento manual no WhatsApp', en: 'Manual WhatsApp support' },
  'real-results.result2.after': { pt: 'Sistema automatizado 24/7', en: 'Automated 24/7 system' },
  'real-results.result2.description': { pt: 'Empresa de limpeza em Miami reduziu tempo de resposta e aumentou conversões', en: 'Cleaning company in Miami reduced response time and increased conversions' },
  'real-results.result2.metric': { pt: '24/7', en: '24/7' },
  'real-results.result2.label': { pt: 'Atendimento automático', en: 'Automatic support' },
  'real-results.result3.before': { pt: 'Sem presença digital', en: 'No digital presence' },
  'real-results.result3.after': { pt: '500+ leads qualificados/mês', en: '500+ qualified leads/month' },
  'real-results.result3.description': { pt: 'Consultoria em Londres criou funil de vendas e explodiu o faturamento', en: 'Consultancy in London created sales funnel and exploded revenue' },
  'real-results.result3.metric': { pt: '500+', en: '500+' },
  'real-results.result3.label': { pt: 'Leads por mês', en: 'Leads per month' },
  'real-results.result4.before': { pt: 'Vendas inconsistentes', en: 'Inconsistent sales' },
  'real-results.result4.after': { pt: 'Faturamento previsível', en: 'Predictable revenue' },
  'real-results.result4.description': { pt: 'E-commerce de produtos brasileiros em Portugal estabilizou receita mensal', en: 'Brazilian products e-commerce in Portugal stabilized monthly revenue' },
  'real-results.result4.metric': { pt: 'R$ 50k', en: '$50k' },
  'real-results.result4.label': { pt: 'Faturamento mensal', en: 'Monthly revenue' },
  'real-results.testimonials.title': { pt: 'O que nossos clientes dizem', en: 'What our clients say' },
  'real-results.testimonial1.name': { pt: 'Carlos Silva', en: 'Carlos Silva' },
  'real-results.testimonial1.business': { pt: 'Restaurante Sabor Brasil - Toronto', en: 'Sabor Brasil Restaurant - Toronto' },
  'real-results.testimonial1.text': { pt: 'A FW Digital transformou completamente meu negócio. Antes eu dependia só do boca a boca, agora tenho pedidos automatizados direto pelo site.', en: 'FW Digital completely transformed my business. Before I relied only on word of mouth, now I have automated orders directly through the website.' },
  'real-results.testimonial1.result': { pt: '3x mais pedidos', en: '3x more orders' },
  'real-results.testimonial2.name': { pt: 'Ana Costa', en: 'Ana Costa' },
  'real-results.testimonial2.business': { pt: 'Clean House Services - Miami', en: 'Clean House Services - Miami' },
  'real-results.testimonial2.text': { pt: 'O chatbot da FW responde meus clientes mesmo quando estou trabalhando. Nunca mais perdi uma oportunidade de venda.', en: 'FW\'s chatbot responds to my customers even when I\'m working. I never lost a sales opportunity again.' },
  'real-results.testimonial2.result': { pt: 'Zero leads perdidos', en: 'Zero leads lost' },
  'real-results.testimonial3.name': { pt: 'Roberto Mendes', en: 'Roberto Mendes' },
  'real-results.testimonial3.business': { pt: 'Consultoria RH - Londres', en: 'HR Consulting - London' },
  'real-results.testimonial3.text': { pt: 'Em 6 meses saí de 5 clientes para mais de 50. O sistema de captação que eles criaram é impressionante.', en: 'In 6 months I went from 5 clients to more than 50. The lead generation system they created is impressive.' },
  'real-results.testimonial3.result': { pt: '10x mais clientes', en: '10x more clients' },
  'real-results.cta.title': { pt: 'Quer resultados como esses?', en: 'Want results like these?' },
  'real-results.cta.description': { pt: 'Vamos criar uma estratégia personalizada para o seu negócio', en: 'Let\'s create a personalized strategy for your business' },
  'real-results.cta.button': { pt: 'Quero resultados como esses', en: 'I want results like these' },
  
  // Alt texts and labels
  'alt.fw-logo': { pt: 'Agência FW Digital', en: 'FW Digital Agency' },
  'company.name': { pt: 'Agência FW Digital', en: 'FW Digital Agency' },
  'theme.toggle.light': { pt: 'Mudar para tema claro', en: 'Switch to light theme' },
  'theme.toggle.dark': { pt: 'Mudar para tema escuro', en: 'Switch to dark theme' },
  
  // Chat
  'chat.title': { pt: '👋 Como posso ajudar você hoje?', en: '👋 How can I help you today?' },
  
  // Catalog Generator
  'catalog.title': { pt: 'Gerador de Catálogo', en: 'Catalog Generator' },
  'catalog.subtitle': { pt: 'Crie catálogos profissionais em PDF com nossos produtos e serviços', en: 'Create professional PDF catalogs with our products and services' },
  'catalog.button': { pt: 'Gerar Catálogo PDF', en: 'Generate PDF Catalog' },
  'catalog.category.websites': { pt: 'Sites Profissionais', en: 'Professional Websites' },
  'catalog.category.apps': { pt: 'Aplicativos Mobile', en: 'Mobile Applications' },
  'catalog.category.bots': { pt: 'Bots de WhatsApp', en: 'WhatsApp Bots' },
  'catalog.category.systems': { pt: 'Sistemas Web', en: 'Web Systems' },
  'catalog.websites.landing.name': { pt: 'Landing Page', en: 'Landing Page' },
  'catalog.websites.landing.features': { pt: 'Página única, CTA WhatsApp, SEO básico, Responsivo', en: 'Single page, WhatsApp CTA, Basic SEO, Responsive' },
  'catalog.websites.institutional.name': { pt: 'Site Institucional', en: 'Institutional Website' },
  'catalog.websites.institutional.features': { pt: '3-5 páginas, Formulário de contato, Google Maps, Blog', en: '3-5 pages, Contact form, Google Maps, Blog' },
  'catalog.websites.ecommerce.name': { pt: 'Loja Virtual', en: 'E-commerce Store' },
  'catalog.websites.ecommerce.features': { pt: 'Carrinho de compras, Pagamento integrado, Gestão de produtos, Relatórios', en: 'Shopping cart, Integrated payment, Product management, Reports' },
  'catalog.apps.simple.name': { pt: 'App Simples', en: 'Simple App' },
  'catalog.apps.simple.features': { pt: 'Catálogo digital, Delivery local, Push notifications, iOS + Android', en: 'Digital catalog, Local delivery, Push notifications, iOS + Android' },
  'catalog.apps.backend.name': { pt: 'App com Backend', en: 'App with Backend' },
  'catalog.apps.backend.features': { pt: 'Sistema de login, Chat integrado, Notificações, APIs personalizadas', en: 'Login system, Integrated chat, Notifications, Custom APIs' },
  'catalog.apps.custom.name': { pt: 'App Sob Medida', en: 'Custom App' },
  'catalog.apps.custom.features': { pt: 'Marketplace completo, Gestão avançada, Integrações complexas, Suporte dedicado', en: 'Complete marketplace, Advanced management, Complex integrations, Dedicated support' },
  'catalog.bots.basic.name': { pt: 'Bot Básico', en: 'Basic Bot' },
  'catalog.bots.basic.features': { pt: 'Respostas automáticas, Menu simples, Horário de atendimento, Relatórios básicos', en: 'Automatic responses, Simple menu, Business hours, Basic reports' },
  'catalog.bots.advanced.name': { pt: 'Bot com IA', en: 'AI Bot' },
  'catalog.bots.advanced.features': { pt: 'Atendimento inteligente, OpenAI integrado, Aprendizado contínuo, Analytics avançado', en: 'Intelligent support, OpenAI integrated, Continuous learning, Advanced analytics' },
  'catalog.bots.custom.name': { pt: 'Bot Avançado', en: 'Advanced Bot' },
  'catalog.bots.custom.features': { pt: 'Integração CRM, APIs personalizadas, Multi-atendente, Dashboard completo', en: 'CRM integration, Custom APIs, Multi-agent, Complete dashboard' },
  'catalog.systems.basic.name': { pt: 'Sistema Básico', en: 'Basic System' },
  'catalog.systems.basic.features': { pt: 'Dashboard simples, Usuários básicos, Relatórios, Backup automático', en: 'Simple dashboard, Basic users, Reports, Automatic backup' },
  'catalog.systems.advanced.name': { pt: 'Sistema Avançado', en: 'Advanced System' },
  'catalog.systems.advanced.features': { pt: 'Multi-empresa, Permissões avançadas, API completa, Integrações', en: 'Multi-company, Advanced permissions, Complete API, Integrations' },
  'catalog.systems.enterprise.name': { pt: 'Sistema Empresarial', en: 'Enterprise System' },
  'catalog.systems.enterprise.features': { pt: 'Customizado, Alta performance, Suporte dedicado, SLA garantido', en: 'Customized, High performance, Dedicated support, Guaranteed SLA' },
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
