"use client";

import { BlurReveal, TextReveal } from "@/components/animations/TextReveal";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden mesh-gradient noise-overlay">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-accent-violet/10 blur-[100px] rounded-full" />
      </div>
      <div className="container-wide relative z-10 px-4 md:px-8">
        <BlurReveal immediate>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan mb-6">
            <span className="w-8 h-px bg-accent-cyan/50" />
            {label}
          </span>
        </BlurReveal>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-6 max-w-4xl">
          <TextReveal text={title} as="span" immediate />
        </h1>
        {description && (
          <BlurReveal immediate>
            <p className="text-lg text-muted max-w-2xl leading-relaxed">{description}</p>
          </BlurReveal>
        )}
      </div>
    </section>
  );
}
