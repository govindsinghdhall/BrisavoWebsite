"use client";

import { BlurReveal, TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16 md:mb-24",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      <BlurReveal>
        <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan mb-6">
          <span className="w-8 h-px bg-accent-cyan/50" />
          {label}
        </span>
      </BlurReveal>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
        <TextReveal text={title} as="span" />
      </h2>
      {description && (
        <BlurReveal delay={0.2}>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            {description}
          </p>
        </BlurReveal>
      )}
    </div>
  );
}
