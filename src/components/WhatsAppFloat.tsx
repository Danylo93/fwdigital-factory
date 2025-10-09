import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5511934079208";
    const message = "Olá! Gostaria de saber mais sobre os serviços da Agência FW Digital.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group">
      <button
        onClick={handleWhatsAppClick}
        className="glass hover-glass text-green-600 dark:text-green-400 rounded-2xl p-4 sm:p-5 shadow-glass hover:shadow-glow transition-glass hover-lift animate-pulse hover:animate-none flex items-center justify-center group touch-manipulation min-h-[56px] min-w-[56px] border border-green-500/20 backdrop-blur-md"
        aria-label="Contato via WhatsApp"
      >
        <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform" />
      </button>

      {/* Modern Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="glass text-gray-800 dark:text-white text-sm px-4 py-3 rounded-2xl whitespace-nowrap shadow-glass border border-gray-200/20 dark:border-white/20 backdrop-blur-md">
          Fale conosco no WhatsApp
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200/20 dark:border-t-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;