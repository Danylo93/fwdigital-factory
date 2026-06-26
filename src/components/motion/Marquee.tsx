import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  /** Fade the left/right edges. */
  fade?: boolean;
  pauseOnHover?: boolean;
}

/** Seamless horizontal marquee. Content is duplicated and translated by -50%. */
const Marquee = ({
  children,
  className,
  duration = 40,
  reverse = false,
  fade = true,
  pauseOnHover = true,
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 pr-4",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
