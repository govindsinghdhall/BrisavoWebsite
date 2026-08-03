"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Database,
  Globe,
  GraduationCap,
  Shield,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const trustItems = [
  { icon: Shield, label: "CRM Setup", description: "Free onboarding" },
  { icon: Globe, label: "Website Setup", description: "Professional design" },
  { icon: Database, label: "Data Migration", description: "Free assistance" },
  { icon: GraduationCap, label: "Team Training", description: "Included" },
  { icon: Shield, label: "SSL", description: "Free security" },
  { icon: Zap, label: "Hosting", description: "Fast & reliable" },
  { icon: Clock, label: "Ongoing Updates", description: "Always current" },
];

export function TrustBadges() {
  return (
    <section className="relative section-padding !py-12 md:!py-16">
      <div className="container-wide">
        <div className="rounded-[1.75rem] border border-accent-blue/20 bg-linear-to-br from-accent-blue/10 via-surface to-accent-cyan/10 p-6 sm:p-10">
          <SectionHeader
            label="Included Free"
            title="Everything You Need, Included Free"
            description="Start your real estate business with zero setup costs."
            align="center"
            compact
          />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/80 p-3 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
