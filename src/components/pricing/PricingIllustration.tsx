"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  LayoutDashboard,
  MessageCircle,
  Globe2,
} from "lucide-react";

const tiles = [
  {
    title: "CRM Dashboard",
    subtitle: "Pipeline · Tasks · Follow-ups",
    icon: LayoutDashboard,
    className: "left-[6%] top-[12%] w-[46%]",
    delay: 0.1,
  },
  {
    title: "Website Builder",
    subtitle: "Pages · Forms · SEO",
    icon: Globe2,
    className: "right-[4%] top-[8%] w-[42%]",
    delay: 0.2,
  },
  {
    title: "Analytics",
    subtitle: "Conversion · Sources · ROI",
    icon: BarChart3,
    className: "left-[10%] bottom-[18%] w-[40%]",
    delay: 0.3,
  },
  {
    title: "WhatsApp",
    subtitle: "Auto replies · Nurture",
    icon: MessageCircle,
    className: "right-[8%] bottom-[28%] w-[38%]",
    delay: 0.35,
  },
  {
    title: "Property Listings",
    subtitle: "Inventory · Matching",
    icon: Building2,
    className: "left-[28%] bottom-[4%] w-[44%]",
    delay: 0.45,
  },
];

export function PricingIllustration() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-lg lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-8 rounded-full bg-linear-to-br from-accent-blue/20 via-accent-violet/10 to-accent-cyan/20 blur-3xl" />
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-surface/40 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="absolute inset-0 mesh-gradient opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_45%)]" />

        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: tile.delay, ease: "easeOut" }}
              className={`absolute ${tile.className}`}
            >
              <div className="glass-strong rounded-2xl p-3 shadow-lg sm:p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-accent-blue to-accent-violet text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-foreground">{tile.title}</p>
                <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                  {tile.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
