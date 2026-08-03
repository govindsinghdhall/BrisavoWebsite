"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PricingIllustration } from "@/components/pricing/PricingIllustration";

export function PricingHero() {
  return (
    <section className="relative overflow-hidden section-padding !pt-28 sm:!pt-32 !pb-16 md:!pb-20">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-70" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent-blue/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-accent-violet/15 blur-[140px]" />

      <div className="container-wide relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent-blue">
            Pricing
          </p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Simple Pricing for Growing Real Estate Businesses
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Everything you need to manage leads, properties, sales, marketing,
            websites, and customer relationships in one platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/contact?intent=trial" variant="primary">
              Start Free Trial
            </MagneticButton>
            <MagneticButton href="/contact?intent=demo" variant="secondary">
              Book Demo
            </MagneticButton>
          </div>

          <p className="mt-5 text-sm text-muted">
            14-day free trial · No credit card required · Cancel anytime ·{" "}
            <Link
              href="#compare"
              className="font-medium text-accent-blue transition-opacity hover:opacity-80"
            >
              Compare plans
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <PricingIllustration />
        </motion.div>
      </div>
    </section>
  );
}
