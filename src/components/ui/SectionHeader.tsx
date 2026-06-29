"use client";

import { BlurReveal, TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  compact?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
  compact = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        compact ? "mb-10 md:mb-14" : "mb-16 md:mb-24",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      <BlurReveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan",
            compact ? "mb-4" : "mb-6"
          )}
        >
          <span className="w-8 h-px bg-accent-cyan/50" />
          {label}
        </span>
      </BlurReveal>
      <h2
        className={cn(
          "font-semibold tracking-tight leading-[1.1]",
          compact ? "text-3xl md:text-4xl lg:text-5xl mb-4" : "text-4xl md:text-5xl lg:text-6xl mb-6"
        )}
      >
        <TextReveal text={title} as="span" />
      </h2>
      {description && (
        <BlurReveal delay={0.2}>
          <p className={cn("text-muted max-w-2xl leading-relaxed", compact ? "text-base" : "text-lg")}>
            {description}
          </p>
        </BlurReveal>
      )}
    </div>
  );
}
