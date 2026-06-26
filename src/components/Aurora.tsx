import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
  /** Show the faint grid overlay. */
  grid?: boolean;
  /** Show the dot-grid overlay instead of the line grid. */
  dots?: boolean;
  /** Intensity of the colored blobs. */
  intensity?: "soft" | "bold";
}

/**
 * Reusable animated ambient background — drifting aurora blobs over an optional
 * grid texture. Purely decorative and pointer-events: none, so it sits behind
 * content. Renders no heavy images, keeping the page light and fast.
 */
const Aurora = ({ className, grid = true, dots = false, intensity = "soft" }: AuroraProps) => {
  const opacity = intensity === "bold" ? "opacity-70" : "opacity-40";

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {grid && (
        <div className={cn("absolute inset-0 mask-fade-edges", dots ? "bg-dot-grid" : "bg-grid")} />
      )}

      <div
        className={cn(
          "aurora-blob animate-aurora left-[-10%] top-[-15%] h-[42rem] w-[42rem] bg-primary/40",
          opacity,
        )}
      />
      <div
        className={cn(
          "aurora-blob animate-aurora right-[-12%] top-[10%] h-[38rem] w-[38rem] bg-secondary/35",
          opacity,
        )}
        style={{ animationDelay: "-7s" }}
      />
      <div
        className={cn(
          "aurora-blob animate-aurora bottom-[-20%] left-[30%] h-[40rem] w-[40rem] bg-brand/30",
          opacity,
        )}
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
};

export default Aurora;
