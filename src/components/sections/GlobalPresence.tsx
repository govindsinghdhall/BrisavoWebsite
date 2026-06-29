"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { OFFICES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlurReveal } from "@/components/animations/TextReveal";
import { MapPin, Clock, Radio } from "lucide-react";

const GlobeScene = dynamic(
  () => import("@/components/three/Globe").then((m) => m.Globe),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[400px] animate-pulse bg-surface rounded-3xl" /> }
);

export function GlobalPresence({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-blue/5 blur-[200px] rounded-full" />
      </div>

      <div className="container-wide relative">
        {showHeader && (
          <SectionHeader
            label="Global Presence"
            title="Engineering Across Continents"
            description="Building technology without borders. Our Canada × India network delivers 24/7 engineering velocity with local expertise."
            align="center"
          />
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] order-2 lg:order-1">
            <div className="absolute inset-0 glow-blue rounded-3xl" />
            <GlobeScene className="w-full h-full rounded-3xl overflow-hidden" />

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 right-4 glass rounded-full px-4 py-2 flex items-center gap-2 text-xs font-mono"
            >
              <Radio className="w-3 h-3 text-green-400" />
              Network Active
            </motion.div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            {OFFICES.map((office, i) => (
              <BlurReveal key={office.country} delay={i * 0.15}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="glass rounded-2xl p-6 md:p-8 group cursor-default border border-border hover:border-border transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{office.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{office.country}</h3>
                        <span className="text-xs font-mono text-accent-cyan px-2 py-0.5 rounded-full glass">
                          {office.timezone}
                        </span>
                      </div>
                      <p className="text-sm text-accent-blue font-medium mb-1">{office.role}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted mt-3">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {office.city}
                        </span>
                        <a
                          href={office.phoneHref}
                          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                        >
                          {office.phone}
                        </a>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Operational
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 h-px bg-gradient-to-r from-border via-border to-transparent" />
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-foreground/40 group-hover:text-foreground/60 transition-colors">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Connected to global network
                  </div>
                </motion.div>
              </BlurReveal>
            ))}

            <BlurReveal delay={0.4}>
              <div className="glass rounded-2xl p-6 text-center border border-accent-cyan/10">
                <p className="text-lg font-medium text-gradient-accent mb-2">
                  Global Delivery. Local Expertise.
                </p>
                <p className="text-sm text-muted">
                  Serving businesses worldwide from two strategic engineering hubs.
                </p>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
