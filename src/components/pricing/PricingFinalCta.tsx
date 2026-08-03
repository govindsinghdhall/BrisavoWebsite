"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function PricingFinalCta() {
  return (
    <section className="relative section-padding !pt-8 !pb-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-accent-blue/25 bg-linear-to-br from-accent-blue/20 via-accent-violet/10 to-accent-cyan/15 px-8 py-14 text-center sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-accent-blue/30 blur-[90px]" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-accent-violet/25 blur-[100px]" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Ready to Grow Your Real Estate Business?
            </h2>
            <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
              Join agencies using Brosavo to close more deals with less effort.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href="/contact?intent=trial" variant="primary">
                Start Free Trial
              </MagneticButton>
              <MagneticButton href="/contact?intent=demo" variant="secondary">
                Schedule Demo
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
