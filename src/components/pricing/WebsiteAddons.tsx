"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WEBSITE_ADDONS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function WebsiteAddons() {
  return (
    <section id="addons" className="relative scroll-mt-36 section-padding !py-16 md:!py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-accent-cyan/10 blur-[120px]" />
      </div>
      <div className="container-wide relative">
        <SectionHeader
          label="Website Add-ons"
          title="Need More?"
          description="Pair Brosavo CRM with a high-converting real estate website — from launch-ready to luxury enterprise builds."
          align="center"
          compact
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {WEBSITE_ADDONS.map((addon, index) => (
            <motion.article
              key={addon.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={cn(
                "group flex h-full flex-col rounded-[1.75rem] border p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1",
                addon.highlighted
                  ? "border-accent-violet/35 bg-linear-to-b from-accent-violet/10 to-surface"
                  : "border-border bg-surface/70"
              )}
            >
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {addon.name}
              </h3>
              <p className="mt-3 text-2xl font-semibold text-accent-blue">
                {addon.priceLabel}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {addon.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-6 text-foreground/80"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MagneticButton
                  href={addon.ctaHref}
                  variant={addon.highlighted ? "primary" : "secondary"}
                  className="w-full !rounded-2xl"
                >
                  {addon.ctaLabel}
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
