"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, LayoutDashboard, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WHY_CHOOSE } from "@/lib/pricing";

const ICONS = {
  home: Building2,
  globe: Globe2,
  crm: LayoutDashboard,
  rocket: Rocket,
} as const;

export function WhyChoose() {
  return (
    <section className="relative section-padding !py-16 md:!py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent-blue/10 blur-[130px]" />
      </div>
      <div className="container-wide relative">
        <SectionHeader
          label="Why Brosavo"
          title="Why Choose Brosavo"
          description="A modern real estate operating system — CRM, website, messaging, and growth tools in one premium platform."
          align="center"
          compact
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -4 }}
                className="glass rounded-[1.5rem] p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-accent-blue to-accent-violet text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
