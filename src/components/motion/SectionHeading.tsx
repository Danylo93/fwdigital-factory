import { type ReactNode } from "react";
import Reveal from "./Reveal";
import SplitWords, { type WordSegment } from "./SplitWords";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  highlight?: string;
  /** Text rendered after the highlight (e.g. trailing words). */
  titleEnd?: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}

/** Consistent eyebrow + headline + subtitle block. FIAP-style: uppercase
 * magenta kicker on a hairline, bold uppercase title, restrained subtitle. */
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  titleEnd,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) => {
  const isCenter = align === "center";

  const segments: WordSegment[] = [
    { text: String(title) },
    ...(highlight ? [{ text: highlight, highlight: true }] : []),
    ...(titleEnd ? [{ text: titleEnd }] : []),
  ];

  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col",
        isCenter ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={cn("eyebrow mb-5", light && "text-white")}>
            <span className="h-px w-8 bg-primary" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <SplitWords
        as="h2"
        segments={segments}
        whileInView
        className={cn(
          "text-display-md font-display uppercase",
          isCenter ? "justify-center" : "",
          light ? "text-white" : "text-foreground",
        )}
      />

      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-body-lg normal-case",
              light ? "text-white/75" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
