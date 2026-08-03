"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { CurrencySelector } from "@/components/pricing/CurrencySelector";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/lib/currency";
import {
  type BillingPeriod,
  getPlanPrice,
  PRICING_NAV_SECTIONS,
  PRICING_PLANS,
  YEARLY_DISCOUNT,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

function BillingToggle({
  period,
  onChange,
}: {
  period: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface/80 p-1 shadow-sm">
      {(["monthly", "yearly"] as const).map((value) => {
        const active = period === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
              active ? "text-white" : "text-muted hover:text-foreground"
            )}
            aria-pressed={active}
          >
            {active ? (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-linear-to-r from-accent-blue to-accent-violet"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-2">
              {value === "monthly" ? "Monthly" : "Yearly"}
              {value === "yearly" ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-accent-blue/10 text-accent-blue"
                  )}
                >
                  Save {Math.round(YEARLY_DISCOUNT * 100)}%
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          className="fixed inset-x-0 top-[4.75rem] z-40 hidden justify-center px-4 md:flex"
        >
          <nav
            aria-label="Pricing sections"
            className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 shadow-lg"
          >
            {PRICING_NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
            <a
              href="/contact?intent=trial"
              className="ml-1 rounded-full bg-linear-to-r from-accent-blue to-accent-violet px-4 py-1.5 text-xs font-semibold text-white"
            >
              Start Free Trial
            </a>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PricingPlans() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const { currency, setCurrency } = useCurrency();

  return (
    <section id="plans" className="relative scroll-mt-36 section-padding !pt-8 !pb-16">
      <StickyNav />
      <div className="container-wide">
        <div className="mb-10 flex flex-col items-center gap-5">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex-1" />
            <BillingToggle period={period} onChange={setPeriod} />
            <div className="flex flex-1 justify-center sm:justify-end">
              <CurrencySelector currency={currency} setCurrency={setCurrency} />
            </div>
          </div>
          <p className="text-center text-sm text-muted">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
            Yearly billing saves {Math.round(YEARLY_DISCOUNT * 100)}%.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => {
            const price = getPlanPrice(plan.monthlyPrice, period, currency);

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:p-8",
                  plan.popular
                    ? "border-accent-blue/40 bg-linear-to-b from-accent-blue/12 via-surface to-surface shadow-[0_24px_80px_rgba(59,130,246,0.18)] lg:-mt-3 lg:mb-3"
                    : "border-border bg-surface/70"
                )}
              >
                {plan.popular ? (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-accent-blue to-accent-violet px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-accent-blue/25">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </div>
                ) : null}

                <div className={cn(plan.popular && "pr-28")}>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-accent-blue">
                    {plan.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-7 min-h-[5.5rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${plan.id}-${period}-${currency}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                          {price.display}
                        </span>
                        {price.suffix ? (
                          <span className="pb-1.5 text-sm text-muted">
                            {price.suffix}
                          </span>
                        ) : null}
                      </div>

                      {plan.monthlyPrice !== null &&
                      plan.originalPrice !== null &&
                      plan.discount !== null ? (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-sm text-muted line-through">
                            {formatPrice(plan.originalPrice, currency)}
                          </span>
                          <span className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-[11px] font-semibold text-accent-blue">
                            Launch Price
                          </span>
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                            Save {plan.discount}%
                          </span>
                        </div>
                      ) : null}

                      {period === "yearly" && plan.monthlyPrice !== null ? (
                        <p className="mt-1 text-xs text-accent-blue">
                          Billed annually · Save{" "}
                          {Math.round(YEARLY_DISCOUNT * 100)}%
                        </p>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6">
                  <MagneticButton
                    href={plan.ctaHref}
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full !rounded-2xl"
                  >
                    {plan.ctaLabel}
                  </MagneticButton>
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {plan.featureIntro || "Includes"}
                </p>

                <ul className="mt-4 space-y-3.5">
                  {plan.features.map((item) => (
                    <li key={item.feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {item.feature}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted">
                          {item.benefit}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
