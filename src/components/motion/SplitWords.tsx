import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WordSegment {
  text: string;
  /** Render this segment with the magenta brand gradient. */
  highlight?: boolean;
}

type HeadingTag = "h1" | "h2" | "h3" | "div";

interface SplitWordsProps {
  segments: WordSegment[];
  className?: string;
  as?: HeadingTag;
  /** Seconds between each word. */
  stagger?: number;
  /** Delay before the first word, in seconds. */
  delay?: number;
  /** Animate when scrolled into view instead of on mount. */
  whileInView?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const; // expo-out, à la FIAP

/**
 * Headline reveal that splits text into words and slides each one up from
 * behind a mask — the signature GSAP/SplitText motion used on fiap.com.br.
 *
 * Each word animates independently (explicit initial/animate per word) so it
 * stays robust even when nested inside another animating container.
 */
const SplitWords = ({
  segments,
  className,
  as: Tag = "h2",
  stagger = 0.06,
  delay = 0,
  whileInView = false,
}: SplitWordsProps) => {
  // Flatten to words, remembering which segment (and highlight) each belongs to.
  const words = segments.flatMap((segment, si) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((w, wi) => ({ w, highlight: segment.highlight, key: `${si}-${wi}` })),
  );

  return (
    <Tag className={className}>
      {words.map(({ w, highlight, key }, i) => {
        const transition = { duration: 0.9, ease: EASE, delay: delay + i * stagger };
        const anim = whileInView
          ? { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 } }
          : { animate: { y: "0%" } };
        return (
          <span
            key={key}
            className="relative inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <motion.span
              className={cn("inline-block", highlight && "text-gradient-brand")}
              initial={{ y: "115%" }}
              transition={transition}
              {...anim}
            >
              {w}
            </motion.span>
            {/* preserve the space between words */}
            <span className="inline-block">&nbsp;</span>
          </span>
        );
      })}
    </Tag>
  );
};

export default SplitWords;
