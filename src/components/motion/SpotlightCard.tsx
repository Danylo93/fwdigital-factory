import { type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Render a gradient hairline border. */
  bordered?: boolean;
}

/**
 * Glass card with a pointer-following spotlight glow and optional gradient
 * border. The spotlight position is written to CSS vars consumed by the
 * `.spotlight` utility, so there is no React re-render on mouse move.
 */
const SpotlightCard = ({ children, className, bordered = true }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight group relative rounded-md bg-card/60 backdrop-blur-xl transition-smooth hover:-translate-y-1.5",
        bordered && "gradient-border",
        "shadow-soft hover:shadow-medium",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
