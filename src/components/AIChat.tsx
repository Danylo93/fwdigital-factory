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
  const [showAutoPrompt, setShowAutoPrompt] = useState(false);
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

  // Show auto-prompt after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutoPrompt(true);
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, []);

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

    // Respostas em português - Abordagens melhoradas e mais conversacionais
    const responsesPT = {
      price: "💰 Ótima pergunta! Nossos investimentos são personalizados para cada negócio:\n\n🎯 **Pacotes populares:**\n• Landing Page: a partir de R$ 2.500\n• Site Profissional: a partir de R$ 4.500\n• App Mobile: a partir de R$ 8.500\n• Bot WhatsApp IA: a partir de R$ 1.200/mês\n\n💡 **Dica:** Brasileiros no exterior costumam ter ROI de 300%+ no primeiro ano!\n\nQuer um orçamento específico? Fale comigo no WhatsApp! 📱",
      services: "🚀 Perfeito! Somos especialistas em transformar negócios de brasileiros no exterior:\n\n✅ **Nossos diferenciais:**\n• Sites que vendem 24/7\n• Apps que seus clientes amam\n• Automação que escala vendas\n• Suporte em português\n\n🎯 **Para quem mora fora:**\n• Entendemos o mercado local\n• Criamos presença digital forte\n• Automatizamos processos\n\nQual seu maior desafio hoje?",
      tech: "⚡ Usamos o que há de mais moderno no mercado:\n\n🔥 **Stack Premium:**\n• React/Next.js (sites ultrarrápidos)\n• React Native (apps nativos)\n• IA OpenAI (automação inteligente)\n• Cloud AWS (segurança máxima)\n\n🎯 **Resultado:** Sites 3x mais rápidos que a concorrência!\n\nQuer saber como isso pode ajudar seu negócio?",
      time: "⏱️ Entregamos rápido porque somos especialistas:\n\n⚡ **Prazos garantidos:**\n• Landing Page: 5 dias úteis\n• Site Profissional: 10 dias úteis\n• App Mobile: 45 dias úteis\n• Bot IA: 7 dias úteis\n\n🎯 **Metodologia ágil:**\n• Entregas parciais\n• Feedback constante\n• Ajustes em tempo real\n\nPrecisa de algo urgente? Podemos acelerar!",
      contact: "📞 Vamos conversar! Estou aqui para ajudar:\n\n💬 **Formas de contato:**\n• WhatsApp: (11) 93407-9208\n• Email: contato@fwdigital.com.br\n• Horário: Segunda a Sexta, 9h às 18h\n\n🎯 **Por que falar comigo?**\n• Entendo o mercado exterior\n• Falo português\n• Consultoria gratuita\n\nClique no botão abaixo e vamos transformar seu negócio! 🚀",
      experience: "🏆 Somos referência em brasileiros no exterior:\n\n📊 **Números que impressionam:**\n• +10 anos no mercado\n• +100 projetos entregues\n• 98% de satisfação\n• 300%+ ROI médio\n\n🎯 **Especialização:**\n• Brasileiros no exterior\n• Mercados: EUA, Canadá, UK, Portugal\n• Nichos: restaurantes, serviços, e-commerce\n\nQuer ser nosso próximo case de sucesso?",
      default: "🤖 Oi! Como posso te ajudar hoje?\n\n💡 **Posso falar sobre:**\n• Como vender mais no exterior\n• Sites que convertem visitantes\n• Apps que seus clientes amam\n• Automação que escala vendas\n• Preços e investimentos\n\n🎯 **Ou me conte:**\n• Qual seu negócio?\n• Onde você mora?\n• Qual seu maior desafio?\n\nVamos conversar! 😊"
    };

    // Respostas em inglês - Abordagens melhoradas e mais conversacionais
    const responsesEN = {
      price: "💰 Great question! Our investments are customized for each business:\n\n🎯 **Popular packages:**\n• Landing Page: starting at $500\n• Professional Website: starting at $900\n• Mobile App: starting at $1,700\n• AI WhatsApp Bot: starting at $240/month\n\n💡 **Tip:** Brazilians abroad typically see 300%+ ROI in the first year!\n\nWant a specific quote? Chat with me on WhatsApp! 📱",
      services: "🚀 Perfect! We specialize in transforming Brazilian businesses abroad:\n\n✅ **Our advantages:**\n• Websites that sell 24/7\n• Apps your customers love\n• Automation that scales sales\n• Support in Portuguese\n\n🎯 **For those living abroad:**\n• We understand the local market\n• We create strong digital presence\n• We automate processes\n\nWhat's your biggest challenge today?",
      tech: "⚡ We use the most modern technology in the market:\n\n🔥 **Premium Stack:**\n• React/Next.js (ultra-fast websites)\n• React Native (native apps)\n• OpenAI AI (smart automation)\n• AWS Cloud (maximum security)\n\n🎯 **Result:** Websites 3x faster than competitors!\n\nWant to know how this can help your business?",
      time: "⏱️ We deliver fast because we're specialists:\n\n⚡ **Guaranteed deadlines:**\n• Landing Page: 5 business days\n• Professional Website: 10 business days\n• Mobile App: 45 business days\n• AI Bot: 7 business days\n\n🎯 **Agile methodology:**\n• Partial deliveries\n• Constant feedback\n• Real-time adjustments\n\nNeed something urgent? We can speed it up!",
      contact: "📞 Let's talk! I'm here to help:\n\n💬 **Contact methods:**\n• WhatsApp: (11) 93407-9208\n• Email: contato@fwdigital.com.br\n• Hours: Monday to Friday, 9am to 6pm\n\n🎯 **Why talk to me?**\n• I understand the abroad market\n• I speak Portuguese\n• Free consultation\n\nClick the button below and let's transform your business! 🚀",
      experience: "🏆 We're the reference for Brazilians abroad:\n\n📊 **Impressive numbers:**\n• +10 years in the market\n• +100 delivered projects\n• 98% satisfaction\n• 300%+ average ROI\n\n🎯 **Specialization:**\n• Brazilians abroad\n• Markets: USA, Canada, UK, Portugal\n• Niches: restaurants, services, e-commerce\n\nWant to be our next success case?",
      default: "🤖 Hi! How can I help you today?\n\n💡 **I can talk about:**\n• How to sell more abroad\n• Websites that convert visitors\n• Apps your customers love\n• Automation that scales sales\n• Prices and investments\n\n🎯 **Or tell me:**\n• What's your business?\n• Where do you live?\n• What's your biggest challenge?\n\nLet's chat! 😊"
    };

    // Seleciona as respostas baseadas no idioma atual
    const responses = t('language.current') === 'Idioma atual' ? responsesPT : responsesEN;

    // Respostas baseadas em palavras-chave (português e inglês)
    if (message.includes("preço") || message.includes("valor") || message.includes("custo") || 
        message.includes("quanto") || message.includes("investimento") || message.includes("orçamento") ||
        message.includes("price") || message.includes("cost") || message.includes("pricing") || 
        message.includes("how much") || message.includes("investment") || message.includes("quote")) {
      return responses.price;
    }

    if (message.includes("serviço") || message.includes("fazem") || message.includes("oferecem") || 
        message.includes("site") || message.includes("app") || message.includes("bot") || 
        message.includes("landing") || message.includes("ecommerce") || message.includes("sistema") ||
        message.includes("service") || message.includes("offer") || message.includes("provide") || 
        message.includes("website") || message.includes("application") || message.includes("landing page") ||
        message.includes("e-commerce") || message.includes("system")) {
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
        message.includes("conversar") || message.includes("ajudar") || message.includes("duvida") ||
        message.includes("contact") || message.includes("talk") || message.includes("reach") || 
        message.includes("chat") || message.includes("help") || message.includes("question")) {
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
      <div className="group fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
        <div className="relative">
          {/* Pulse ring */}
          <span className="absolute inset-0 -z-10 rounded-md bg-primary/40 animate-pulse-ring" />
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-strong"
            aria-label="Abrir chat com IA"
          >
            <Bot className="h-7 w-7 transition-transform group-hover:scale-110" />
          </button>

          {/* Notification dot when auto-prompt is active */}
          {showAutoPrompt && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          )}
        </div>

        {/* Tooltip / auto-prompt */}
        <div
          className={`pointer-events-none absolute bottom-full right-0 mb-3 transition-opacity duration-300 ${
            showAutoPrompt ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="whitespace-nowrap rounded-2xl border border-border/60 bg-background/90 px-4 py-2.5 text-sm font-medium text-foreground shadow-glass backdrop-blur-xl">
            {showAutoPrompt ? t("chat.title") : "Chat com IA — tire suas dúvidas"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-[22rem] sm:w-96 h-[28rem] sm:h-[32rem]'
    }`}>
      <div className="flex h-full flex-col overflow-hidden rounded-md border border-border/60 bg-background/95 shadow-glass backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 p-4">
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
                        : 'border border-border/60 bg-muted/50'
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
                    <div className="rounded-2xl border border-border/60 bg-muted/50 p-3">
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
            <div className="space-y-3 border-t border-border/60 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
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
