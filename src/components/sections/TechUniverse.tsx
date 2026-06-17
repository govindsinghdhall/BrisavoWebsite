"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlurReveal } from "@/components/animations/TextReveal";

const TechGraphScene = dynamic(
  () => import("@/components/three/TechGraph").then((m) => m.TechGraph),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[500px] animate-pulse bg-white/5 rounded-3xl" /> }
);

const CATEGORIES = [
  { name: "Frontend", count: 12, color: "#61dafb" },
  { name: "Backend", count: 15, color: "#68a063" },
  { name: "Cloud", count: 10, color: "#ff9900" },
  { name: "AI/ML", count: 8, color: "#10a37f" },
  { name: "Data", count: 11, color: "#14b8a6" },
  { name: "DevOps", count: 9, color: "#326ce5" },
];

export function TechUniverse({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.02] to-transparent" />

      <div className="container-wide relative">
        {showHeader && (
          <SectionHeader
            label="Technology Universe"
            title="A Living Technology Ecosystem"
            description="Technologies orbit and connect dynamically — forming the infrastructure backbone of every solution we engineer."
            align="center"
          />
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            {CATEGORIES.slice(0, 3).map((cat, i) => (
              <BlurReveal key={cat.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 group cursor-default"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 20px ${cat.color}40` }}
                  />
                  <div>
                    <div className="font-medium text-sm">{cat.name}</div>
                    <div className="text-xs text-muted">{cat.count} technologies</div>
                  </div>
                  <div className="ml-auto text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors">
                    Active
                  </div>
                </motion.div>
              </BlurReveal>
            ))}
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 glow-violet rounded-3xl" />
            <TechGraphScene className="w-full h-full rounded-3xl overflow-hidden" />
          </div>

          <div className="space-y-4">
            {CATEGORIES.slice(3).map((cat, i) => (
              <BlurReveal key={cat.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: -8 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 group cursor-default"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 20px ${cat.color}40` }}
                  />
                  <div>
                    <div className="font-medium text-sm">{cat.name}</div>
                    <div className="text-xs text-muted">{cat.count} technologies</div>
                  </div>
                  <div className="ml-auto text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors">
                    Active
                  </div>
                </motion.div>
              </BlurReveal>
            ))}
          </div>
        </div>

        <BlurReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-sm font-mono text-muted uppercase tracking-widest">
              65+ Technologies • Continuously Evolving • Production Proven
            </p>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
