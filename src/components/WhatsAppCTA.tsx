import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

export const WHATSAPP_PHONE = "5511934079208";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

interface WhatsAppCTAProps {
  message: string;
  children: ReactNode;
  className?: string;
  /** Visual style. `primary` = gradient, `light` = white on color, `outline` = ghost. */
  tone?: "primary" | "light" | "outline";
  size?: "default" | "lg";
  showIcon?: boolean;
}

const toneClasses: Record<NonNullable<WhatsAppCTAProps["tone"]>, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:shadow-strong hover:brightness-110",
  light:
    "bg-white text-primary shadow-strong hover:-translate-y-0.5 hover:bg-white/90",
  outline:
    "btn-fill border border-primary/60 bg-transparent text-foreground hover:text-primary-foreground hover:border-primary",
};

/** Single source of truth for the WhatsApp call-to-action used across sections. */
const WhatsAppCTA = ({
  message,
  children,
  className,
  tone = "primary",
  size = "lg",
  showIcon = true,
}: WhatsAppCTAProps) => {
  return (
    <Button
      size={size}
      onClick={() => window.open(whatsappUrl(message), "_blank")}
      className={cn(
        "group h-auto whitespace-normal rounded-sm text-center font-heading font-bold uppercase tracking-wide leading-tight transition-all duration-300",
        size === "lg" && "min-h-[3.5rem] px-7 py-3.5 text-sm sm:px-9 sm:text-[0.95rem]",
        toneClasses[tone],
        className,
      )}
    >
      {showIcon && (
        <FaWhatsapp className="mr-2.5 h-5 w-5 transition-transform group-hover:scale-110" />
      )}
      {children}
    </Button>
  );
};

export default WhatsAppCTA;
