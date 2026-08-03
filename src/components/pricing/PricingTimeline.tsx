"use client";

import { motion } from "framer-motion";
import { Check, Clock, Database, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const timelineItems = [
  {
    icon: Clock,
    title: "CRM Ready",
    description: "Same Day",
    details: "Get started immediately with your CRM setup",
  },
  {
    icon: Rocket,
    title: "Website Ready",
    description: "3–5 Business Days",
    details: "Professional website designed and launched",
  },
  {
    icon: Database,
    title: "Migration",
    description: "Free Assistance",
    details: "We help migrate your existing data seamlessly",
  },
];

export function PricingTimeline() {
  return (
    <section className="relative section-padding !py-16 md:!py-20">
      <div className="container-wide">
        <SectionHeader
          label="Onboarding"
          title="Implementation Timeline"
          description="Get up and running quickly with our streamlined onboarding."
          align="center"
          compact
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="relative rounded-[1.75rem] border border-border bg-surface/70 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/20">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent-blue">
                {item.description}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.details}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
          {[
            "Free setup included",
            "Dedicated support",
            "100% satisfaction focused",
          ].map((label) => (
            <span key={label} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-accent-blue" strokeWidth={3} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
