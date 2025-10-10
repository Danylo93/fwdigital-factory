import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: "1",
      text: t('chat.welcome'),
      isUser: false,
      timestamp: new Date(),
    }]);
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulação de resposta da IA (MVP)
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();

    // Respostas em português
    const responsesPT = {
      price: "💰 Nossos preços variam conforme o projeto e suas necessidades específicas. Oferecemos:\n\n• Sites profissionais e institucionais\n• Apps mobile para iOS e Android\n• Sistemas web personalizados\n• Landing pages de alta conversão\n• Robôs de WhatsApp com IA\n\nPara um orçamento personalizado, fale conosco no WhatsApp! 📱",
      services: "🚀 A Agência FW Digital oferece:\n\n• Desenvolvimento de Sites Profissionais\n• Criação de Apps Mobile (iOS/Android)\n• Sistemas Web Personalizados\n• Landing Pages de Alta Conversão\n• E-commerce Completo\n• Integração com WhatsApp Business\n• Suporte 24/7\n\nQual serviço te interessa mais?",
      tech: "⚡ Utilizamos as tecnologias mais modernas:\n\n• Frontend: React, Next.js, TypeScript\n• Mobile: React Native, Flutter\n• Backend: Node.js, Python, PHP\n• Banco de dados: PostgreSQL, MongoDB\n• Cloud: AWS, Google Cloud\n• Design: Figma, Adobe Creative Suite\n\nSempre atualizados com as últimas tendências!",
      time: "⏱️ Nossos prazos médios de entrega:\n\n• Landing Page: 3-5 dias úteis\n• Site institucional: 7-15 dias úteis\n• E-commerce: 15-30 dias úteis\n• App mobile: 30-60 dias úteis\n• Sistema web: 30-90 dias úteis\n\nTrabalhamos com metodologia ágil e entregas parciais!",
      contact: "📞 Entre em contato conosco:\n\n• WhatsApp: (11) 93407-9208\n• Email: contato@fwdigital.com.br\n• Horário: Segunda a Sexta, 9h às 18h\n\nClique no botão 'Falar no WhatsApp' abaixo para conversar diretamente! 😊",
      experience: "🏆 A Agência FW Digital tem:\n\n• +10 anos de experiência no mercado\n• +100 projetos entregues\n• 98% de satisfação dos clientes\n• Equipe especializada e certificada\n• Suporte contínuo pós-entrega\n\nSomos uma fábrica de software confiável!",
      default: "🤖 Obrigado pela sua pergunta! Posso ajudar com informações sobre:\n\n• Nossos serviços e soluções\n• Preços e orçamentos\n• Tecnologias utilizadas\n• Prazos de entrega\n• Formas de contato\n\nPoderia reformular sua pergunta ou escolher um dos tópicos acima?"
    };

    // Respostas em inglês
    const responsesEN = {
      price: "💰 Our prices vary according to the project and your specific needs. We offer:\n\n• Professional and institutional websites\n• Mobile apps for iOS and Android\n• Custom web systems\n• High conversion landing pages\n• AI WhatsApp bots\n\nFor a personalized quote, contact us on WhatsApp! 📱",
      services: "🚀 FW Digital Agency offers:\n\n• Professional Website Development\n• Mobile App Creation (iOS/Android)\n• Custom Web Systems\n• High Conversion Landing Pages\n• Complete E-commerce\n• WhatsApp Business Integration\n• 24/7 Support\n\nWhich service interests you most?",
      tech: "⚡ We use the most modern technologies:\n\n• Frontend: React, Next.js, TypeScript\n• Mobile: React Native, Flutter\n• Backend: Node.js, Python, PHP\n• Database: PostgreSQL, MongoDB\n• Cloud: AWS, Google Cloud\n• Design: Figma, Adobe Creative Suite\n\nAlways updated with the latest trends!",
      time: "⏱️ Our average delivery times:\n\n• Landing Page: 3-5 business days\n• Institutional website: 7-15 business days\n• E-commerce: 15-30 business days\n• Mobile app: 30-60 business days\n• Web system: 30-90 business days\n\nWe work with agile methodology and partial deliveries!",
      contact: "📞 Contact us:\n\n• WhatsApp: (11) 93407-9208\n• Email: contato@fwdigital.com.br\n• Hours: Monday to Friday, 9am to 6pm\n\nClick the 'Talk on WhatsApp' button below to chat directly! 😊",
      experience: "🏆 FW Digital Agency has:\n\n• +10 years of market experience\n• +100 delivered projects\n• 98% client satisfaction\n• Specialized and certified team\n• Continuous post-delivery support\n\nWe are a reliable software factory!",
      default: "🤖 Thank you for your question! I can help with information about:\n\n• Our services and solutions\n• Prices and quotes\n• Technologies used\n• Delivery times\n• Contact methods\n\nCould you rephrase your question or choose one of the topics above?"
    };

    // Seleciona as respostas baseadas no idioma atual
    const responses = t('language.current') === 'Idioma atual' ? responsesPT : responsesEN;

    // Respostas baseadas em palavras-chave (português e inglês)
    if (message.includes("preço") || message.includes("valor") || message.includes("custo") ||
        message.includes("price") || message.includes("cost") || message.includes("pricing")) {
      return responses.price;
    }

    if (message.includes("serviço") || message.includes("fazem") || message.includes("oferecem") ||
        message.includes("service") || message.includes("offer") || message.includes("provide")) {
      return responses.services;
    }

    if (message.includes("tecnologia") || message.includes("tech") || message.includes("linguagem") ||
        message.includes("technology") || message.includes("language") || message.includes("stack")) {
      return responses.tech;
    }

    if (message.includes("tempo") || message.includes("prazo") || message.includes("entrega") ||
        message.includes("time") || message.includes("delivery") || message.includes("timeline")) {
      return responses.time;
    }

    if (message.includes("contato") || message.includes("falar") || message.includes("whatsapp") ||
        message.includes("contact") || message.includes("talk") || message.includes("reach")) {
      return responses.contact;
    }

    if (message.includes("experiência") || message.includes("tempo de mercado") || message.includes("anos") ||
        message.includes("experience") || message.includes("years") || message.includes("expertise")) {
      return responses.experience;
    }

    // Resposta padrão
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp: (11) 93407-9208",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="glass hover-glass text-primary rounded-2xl p-4 sm:p-5 shadow-glass hover:shadow-glow transition-glass hover-lift flex items-center justify-center group touch-manipulation min-h-[56px] min-w-[56px] border border-primary/20 backdrop-blur-md animate-pulse hover:animate-none"
          aria-label="Abrir chat com IA"
        >
          <Bot className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="glass text-gray-800 dark:text-white text-sm px-4 py-3 rounded-2xl whitespace-nowrap shadow-glass border border-gray-200/20 dark:border-white/20 backdrop-blur-md">
            Chat com IA - Tire suas dúvidas
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200/20 dark:border-t-white/20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 sm:w-96 h-96 sm:h-[500px]'
    }`}>
      <div className="glass rounded-2xl shadow-glass border border-white/10 backdrop-blur-md h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistente FW Digital</h3>
              <p className="text-xs text-muted-foreground">Online agora</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-accent/20 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent/20 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser ? 'bg-primary' : 'bg-gradient-primary'
                    }`}>
                      {message.isUser ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3 text-white" />}
                    </div>
                    <div className={`rounded-2xl p-3 ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'glass border border-white/10'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="glass border border-white/10 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-background/50 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  size="sm"
                  className="rounded-xl px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* WhatsApp Button */}
              <Button
                onClick={() => window.open('https://wa.me/5511934079208?text=Olá! Gostaria de saber mais sobre os serviços da Agência FW Digital.', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="h-4 w-4" />
                {t('chat.whatsapp.button')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChat;
