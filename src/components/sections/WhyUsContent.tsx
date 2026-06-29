"use client";

import { motion } from "framer-motion";
import { WHY_US } from "@/lib/data";
import { BlurReveal } from "@/components/animations/TextReveal";
import { Globe, Shield, Brain, Layers, Handshake, BarChart3 } from "lucide-react";

const ICON_MAP = {
  globe: Globe,
  shield: Shield,
  brain: Brain,
  layers: Layers,
  handshake: Handshake,
  chart: BarChart3,
} as const;

export function WhyUsContent() {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((item, i) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            return (
              <BlurReveal key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-8 border border-border hover:border-border transition-all duration-500 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-violet/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-accent-violet" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </motion.div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
