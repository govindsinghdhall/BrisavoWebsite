"use client";

import dynamic from "next/dynamic";
import { TextReveal, BlurReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Globe2 } from "lucide-react";

const GlobeScene = dynamic(
  () => import("@/components/three/Globe").then((m) => m.Globe),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-surface rounded-full" /> }
);

const ParticleScene = dynamic(
  () => import("@/components/three/Particles").then((m) => m.Particles),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-start overflow-hidden mesh-gradient noise-overlay">
      <ParticleScene className="absolute inset-0 z-0 opacity-40" />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px] animate-aurora" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-violet/10 blur-[100px] animate-aurora" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent-cyan/5 blur-[150px]" />
      </div>

      <div className="container-wide relative z-10 px-[clamp(1.5rem,5vw,4rem)] pt-[4.75rem] pb-12 sm:pt-20 sm:pb-14">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-6 items-center">
          <div className="max-w-2xl">
            <BlurReveal immediate>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 glass rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 mb-4 sm:mb-5 max-w-full">
                <Globe2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-cyan shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wide sm:tracking-wider text-foreground/70 leading-snug">
                  <span className="sm:hidden">Canada × India — Global Tech</span>
                  <span className="hidden sm:inline">Canada 🇨🇦 × India 🇮🇳 — Global Technology Company</span>
                </span>
              </div>
            </BlurReveal>

            <h1 className="text-[1.625rem] min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.05] sm:leading-[0.95] mb-4 sm:mb-5">
              <TextReveal text="Building The Future Of" as="span" className="block text-foreground" immediate />
              <span className="block mt-1 sm:mt-1.5 text-gradient-accent">Digital Infrastructure</span>
            </h1>

            <BlurReveal immediate>
              <p className="text-sm sm:text-base md:text-lg text-muted max-w-lg leading-relaxed mb-2 sm:mb-3">
                AI. Software. Automation. Scale.
              </p>
              <p className="text-xs sm:text-sm text-foreground/50 max-w-md leading-relaxed mb-5 sm:mb-7">
                Engineering excellence across continents. Serving businesses worldwide with mission-critical technology.
              </p>
            </BlurReveal>

            <BlurReveal immediate>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  className="!px-5 !py-2.5 !text-xs sm:!px-8 sm:!py-3.5 sm:!text-sm"
                >
                  Request a Demo
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </MagneticButton>
                <MagneticButton
                  href="/products"
                  variant="secondary"
                  className="!px-5 !py-2.5 !text-xs sm:!px-8 sm:!py-3.5 sm:!text-sm"
                >
                  Explore Products
                </MagneticButton>
              </div>
            </BlurReveal>

            <BlurReveal immediate>
              <div className="flex items-center gap-4 sm:gap-6 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border">
                {[
                  { value: "150+", label: "Clients" },
                  { value: "30+", label: "Countries" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg sm:text-xl font-semibold text-gradient-accent">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wider mt-0.5 sm:mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </BlurReveal>
          </div>

          <div className="relative h-[240px] md:h-[320px] lg:h-[440px] hidden sm:block">
            <div className="absolute inset-0 glow-blue rounded-full" />
            <GlobeScene className="w-full h-full" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 text-xs font-mono text-foreground/60 whitespace-nowrap">
              Live Global Network
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-glass-border flex items-start justify-center p-1.5 sm:p-2 animate-float">
          <div className="w-1 h-2 rounded-full bg-foreground/40" />
        </div>
      </div>
    </section>
  );
}
