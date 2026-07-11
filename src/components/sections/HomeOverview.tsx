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

const CLIENTS = ["Durga Property", "Vercel", "Render", "Neon", "Crestwood Payments", "Regina Food Corner", "DGN Haulers Transport"] as const;

export function HomeOverview() {
  return (
    <section className="section-padding !py-16 md:!py-20 relative">
      <div className="container-wide">
        <BlurReveal delay={0.03}>
          <div className="mb-12 md:mb-14">
            <div className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-background via-background/95 to-accent-cyan/5 p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-cyan mb-3 block">
                    Our Clients
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Trusted by teams building what’s next.
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-muted max-w-xl">
                    A select group of partners who rely on Brisavo for strategy, product design, and digital delivery.
                  </p>
                </div>
                <div className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] text-foreground/70">
                  Another Brisavo section
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3 md:p-4">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  className="flex w-max gap-3"
                >
                  {[...CLIENTS, ...CLIENTS].map((client, index) => (
                    <div
                      key={`${client}-${index}`}
                      className="min-w-[180px] rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-center text-sm font-medium text-foreground/80 shadow-sm"
                    >
                      {client}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </BlurReveal>

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
