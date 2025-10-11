import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const AutoChatBot = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! 👋 Como posso ajudar você hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Mostrar o chatbot após 12 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 12000); // 12 segundos

    return () => clearTimeout(timer);
  }, []);

  // Auto-abrir o chat após aparecer (opcional)
  useEffect(() => {
    if (isVisible) {
      const autoOpenTimer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // 2 segundos após aparecer

      return () => clearTimeout(autoOpenTimer);
    }
  }, [isVisible]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Saudações
    if (lowerMessage.includes("oi") || lowerMessage.includes("olá") || lowerMessage.includes("hello")) {
      return "Olá! 😊 Sou o assistente da FW Digital. Como posso ajudar você hoje?";
    }

    // Preços e orçamentos
    if (lowerMessage.includes("preço") || lowerMessage.includes("valor") || lowerMessage.includes("custo") || lowerMessage.includes("orçamento")) {
      return "Nossos preços variam conforme o projeto e suas necessidades específicas. Que tal agendar uma conversa gratuita para entender melhor o que você precisa? 💰✨";
    }

    // Sites e desenvolvimento web
    if (lowerMessage.includes("site") || lowerMessage.includes("website") || lowerMessage.includes("landing")) {
      return "Criamos sites modernos, responsivos e otimizados! 🌐\n• Landing Pages\n• E-commerce\n• Sites institucionais\n• Portais corporativos\n\nQual tipo de site você tem em mente?";
    }

    // Apps mobile
    if (lowerMessage.includes("app") || lowerMessage.includes("aplicativo") || lowerMessage.includes("mobile")) {
      return "Desenvolvemos apps incríveis para iOS e Android! 📱\n• Apps nativos\n• Apps híbridos\n• PWAs\n\nQual funcionalidade principal seu app precisa ter?";
    }

    // Sistemas
    if (lowerMessage.includes("sistema") || lowerMessage.includes("erp") || lowerMessage.includes("crm")) {
      return "Desenvolvemos sistemas personalizados para otimizar seu negócio! 💻\n• ERP\n• CRM\n• Sistemas de gestão\n• Automações\n\nQue processo você gostaria de automatizar?";
    }

    // Contato
    if (lowerMessage.includes("contato") || lowerMessage.includes("falar") || lowerMessage.includes("whatsapp")) {
      return "Ótimo! Você pode entrar em contato conosco: 📞\n• WhatsApp: (11) 99999-9999\n• Email: contato@fwdigital.com\n\nOu posso conectar você diretamente com nossa equipe agora!";
    }

    // Sobre a empresa
    if (lowerMessage.includes("empresa") || lowerMessage.includes("quem") || lowerMessage.includes("fw digital")) {
      return "A FW Digital é uma fábrica de software especializada em: 🚀\n• Desenvolvimento de sites\n• Criação de apps\n• Sistemas personalizados\n• Consultoria em tecnologia\n\nEstamos aqui para transformar suas ideias em realidade!";
    }

    // Tempo de desenvolvimento
    if (lowerMessage.includes("tempo") || lowerMessage.includes("prazo") || lowerMessage.includes("quanto tempo")) {
      return "O prazo varia conforme a complexidade do projeto: ⏰\n• Sites simples: 1-2 semanas\n• E-commerce: 3-6 semanas\n• Apps: 2-4 meses\n• Sistemas: 1-6 meses\n\nVamos conversar sobre seu projeto para dar um prazo mais preciso!";
    }

    // Tecnologias
    if (lowerMessage.includes("tecnologia") || lowerMessage.includes("react") || lowerMessage.includes("javascript")) {
      return "Trabalhamos com as melhores tecnologias do mercado! 💻\n• React, Next.js, Vue.js\n• Node.js, Python, PHP\n• React Native, Flutter\n• AWS, Vercel, Firebase\n\nQual tecnologia você tem interesse?";
    }

    // Resposta padrão mais inteligente
    const responses = [
      "Interessante! Nossa equipe pode ajudar você com isso. Quer que eu conecte você com um especialista? 🚀",
      "Entendi! Vamos conversar mais sobre isso. Que tal agendar uma call gratuita? 📞",
      "Ótima pergunta! Nossa equipe tem experiência nisso. Posso transferir você para um especialista? 💡",
      "Legal! Temos soluções personalizadas para isso. Quer saber mais detalhes? ✨"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 h-96 bg-background border border-border rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header do Chat */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">FW Assistant</h3>
                  <p className="text-xs opacity-90">Online agora</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão do Chat */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg relative overflow-hidden"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Indicador de nova mensagem */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default AutoChatBot;
