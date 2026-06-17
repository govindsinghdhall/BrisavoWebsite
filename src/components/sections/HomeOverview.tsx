"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HOME_LINKS } from "@/lib/data";
import { BlurReveal } from "@/components/animations/TextReveal";
import { ArrowUpRight, Layers, Cpu, Box, Globe, Star, Users } from "lucide-react";

const ICON_MAP = {
  layers: Layers,
  cpu: Cpu,
  box: Box,
  globe: Globe,
  star: Star,
  users: Users,
} as const;

export function HomeOverview() {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <BlurReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan mb-4 block">
              Explore Brisavo
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Everything We Build
            </h2>
          </div>
        </BlurReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOME_LINKS.map((item, i) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            return (
              <BlurReveal key={item.href} delay={i * 0.05}>
                <Link href={item.href} className="block group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-white/10 transition-all duration-500 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors shrink-0" />
                    </div>
                  </motion.div>
                </Link>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
