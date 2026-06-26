import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  /** Display value such as "100+", "98%", "R$ 50k", "24/7", "3x". */
  value: string;
  className?: string;
  /** Animation duration in ms. */
  duration?: number;
}

/** Splits "+200%" -> { prefix: "+", target: 200, suffix: "%", decimals: 0 }. */
const parse = (value: string) => {
  const match = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);
  if (!match) return null;
  const [, prefix, rawNumber, suffix] = match;
  const normalized = rawNumber.replace(/,/g, "");
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  return { prefix, target: parseFloat(normalized), suffix, decimals };
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const AnimatedCounter = ({ value, className, duration = 1600 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // Stable across renders so the effect below doesn't restart every frame.
  const parsed = useMemo(() => parse(value), [value]);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || !inView) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = parsed.target * easeOutCubic(progress);
      setDisplay(
        `${parsed.prefix}${current.toLocaleString("pt-BR", {
          minimumFractionDigits: parsed.decimals,
          maximumFractionDigits: parsed.decimals,
        })}${parsed.suffix}`,
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed, duration]);

  return (
    <span ref={ref} className={className}>
      {parsed ? display : value}
    </span>
  );
};

export default AnimatedCounter;
