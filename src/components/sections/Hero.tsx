"use client";

import dynamic from "next/dynamic";
import { TextReveal, BlurReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Globe2 } from "lucide-react";

const GlobeScene = dynamic(
  () => import("@/components/three/Globe").then((m) => m.Globe),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-full" /> }
);

const ParticleScene = dynamic(
  () => import("@/components/three/Particles").then((m) => m.Particles),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-gradient noise-overlay">
      <ParticleScene className="absolute inset-0 z-0 opacity-40" />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px] animate-aurora" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-violet/10 blur-[100px] animate-aurora" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent-cyan/5 blur-[150px]" />
      </div>

      <div className="container-wide relative z-10 section-padding pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <BlurReveal immediate>
              <div className="inline-flex items-center gap-3 glass rounded-full px-4 py-2 mb-8">
                <Globe2 className="w-4 h-4 text-accent-cyan" />
                <span className="text-xs font-mono uppercase tracking-wider text-white/70">
                  Canada 🇨🇦 × India 🇮🇳 — Global Technology Company
                </span>
              </div>
            </BlurReveal>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.95] mb-8">
              <TextReveal text="Building The Future Of" as="span" className="block text-white" immediate />
              <span className="block mt-2 text-gradient-accent">Digital Infrastructure</span>
            </h1>

            <BlurReveal immediate>
              <p className="text-lg sm:text-xl text-muted max-w-lg leading-relaxed mb-4">
                AI. Software. Automation. Scale.
              </p>
              <p className="text-base text-white/50 max-w-md leading-relaxed mb-10">
                Engineering excellence across continents. Serving businesses worldwide with mission-critical technology.
              </p>
            </BlurReveal>

            <BlurReveal immediate>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href="/contact" variant="primary">
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton href="/products" variant="secondary">
                  Explore Products
                </MagneticButton>
              </div>
            </BlurReveal>

            <BlurReveal immediate>
              <div className="flex items-center gap-8 mt-16 pt-8 border-t border-white/5">
                {[
                  { value: "150+", label: "Clients" },
                  { value: "30+", label: "Countries" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold text-gradient-accent">{stat.value}</div>
                    <div className="text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </BlurReveal>
          </div>

          <div className="relative h-[400px] lg:h-[600px] hidden sm:block">
            <div className="absolute inset-0 glow-blue rounded-full" />
            <GlobeScene className="w-full h-full" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 text-xs font-mono text-white/60 whitespace-nowrap">
              Live Global Network
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2 animate-float">
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
