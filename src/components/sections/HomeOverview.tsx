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
    <section className="section-padding !py-16 md:!py-20 relative">
      <div className="container-wide">
        <BlurReveal>
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan mb-3 block">
              Explore Brisavo
            </span>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
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
                    className="glass rounded-2xl p-5 md:p-6 border border-border hover:border-border transition-all duration-500 h-full"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1.5">{item.label}</h3>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-foreground/30 group-hover:text-foreground transition-colors shrink-0" />
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
