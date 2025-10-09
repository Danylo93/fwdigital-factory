import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou o assistente virtual da Agência FW Digital. Como posso ajudá-lo hoje? Posso responder sobre nossos serviços, preços, tecnologias e muito mais!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    
    // Respostas baseadas em palavras-chave
    if (message.includes("preço") || message.includes("valor") || message.includes("custo")) {
      return "💰 Nossos preços variam conforme o projeto. Oferecemos:\n\n• Sites profissionais: A partir de R$ 2.500\n• Apps mobile: A partir de R$ 8.000\n• Sistemas web: A partir de R$ 5.000\n• Landing pages: A partir de R$ 1.200\n\nGostaria de um orçamento personalizado? Entre em contato conosco!";
    }
    
    if (message.includes("serviço") || message.includes("fazem") || message.includes("oferecem")) {
      return "🚀 A Agência FW Digital oferece:\n\n• Desenvolvimento de Sites Profissionais\n• Criação de Apps Mobile (iOS/Android)\n• Sistemas Web Personalizados\n• Landing Pages de Alta Conversão\n• E-commerce Completo\n• Integração com WhatsApp Business\n• Suporte 24/7\n\nQual serviço te interessa mais?";
    }
    
    if (message.includes("tecnologia") || message.includes("tech") || message.includes("linguagem")) {
      return "⚡ Utilizamos as tecnologias mais modernas:\n\n• Frontend: React, Next.js, TypeScript\n• Mobile: React Native, Flutter\n• Backend: Node.js, Python, PHP\n• Banco de dados: PostgreSQL, MongoDB\n• Cloud: AWS, Google Cloud\n• Design: Figma, Adobe Creative Suite\n\nSempre atualizados com as últimas tendências!";
    }
    
    if (message.includes("tempo") || message.includes("prazo") || message.includes("entrega")) {
      return "⏱️ Nossos prazos médios de entrega:\n\n• Landing Page: 3-5 dias úteis\n• Site institucional: 7-15 dias úteis\n• E-commerce: 15-30 dias úteis\n• App mobile: 30-60 dias úteis\n• Sistema web: 30-90 dias úteis\n\nTrabalhamos com metodologia ágil e entregas parciais!";
    }
    
    if (message.includes("contato") || message.includes("falar") || message.includes("whatsapp")) {
      return "📞 Entre em contato conosco:\n\n• WhatsApp: (11) 93407-9208\n• Email: contato@fwdigital.com.br\n• Horário: Segunda a Sexta, 9h às 18h\n\nTambém pode clicar no botão verde do WhatsApp no canto da tela! 😊";
    }
    
    if (message.includes("experiência") || message.includes("tempo de mercado") || message.includes("anos")) {
      return "🏆 A Agência FW Digital tem:\n\n• +5 anos de experiência no mercado\n• +100 projetos entregues\n• 98% de satisfação dos clientes\n• Equipe especializada e certificada\n• Suporte contínuo pós-entrega\n\nSomos uma fábrica de software confiável!";
    }
    
    // Resposta padrão
    return "🤖 Obrigado pela sua pergunta! Posso ajudar com informações sobre:\n\n• Nossos serviços e soluções\n• Preços e orçamentos\n• Tecnologias utilizadas\n• Prazos de entrega\n• Formas de contato\n\nPoderia reformular sua pergunta ou escolher um dos tópicos acima?";
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
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40">
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
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua pergunta..."
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChat;
