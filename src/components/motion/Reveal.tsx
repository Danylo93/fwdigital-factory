import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Direction the element travels in from. */
  direction?: Direction;
  /** Travel distance in px. */
  distance?: number;
  /** Fraction of the element that must be visible to trigger (0-1). */
  amount?: number;
  /** Replay every time it enters the viewport. */
  once?: boolean;
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/** Scroll-triggered reveal wrapper. Use `delay` to choreograph staggered groups. */
const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = "up",
  distance = 56,
  amount = 0.2,
  once = true,
}: RevealProps) => {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      // expo-out, matching FIAP's GSAP easing
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
