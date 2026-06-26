import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Vertical drift in px across the element's scroll through the viewport.
   *  Positive moves the element up as you scroll down. */
  amount?: number;
}

/**
 * Scroll-linked vertical parallax (the `scrub` drift FIAP uses heavily).
 * Movement is tied to scroll position, not a one-shot trigger.
 */
const Parallax = ({ children, className, amount = 60 }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default Parallax;
