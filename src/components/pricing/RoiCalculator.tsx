"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import {
  Calculator,
  Clock,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/lib/currency";

const valueCards = [
  {
    icon: TrendingUp,
    title: "More Leads",
    description:
      "Capture leads from multiple channels and never miss an opportunity",
  },
  {
    icon: Clock,
    title: "Close Deals Faster",
    description:
      "Automated follow-ups and pipeline management accelerate your sales cycle",
  },
  {
    icon: Zap,
    title: "Save Hours Every Week",
    description:
      "Automate manual tasks and focus on what matters — closing deals",
  },
  {
    icon: Users,
    title: "Increase Team Productivity",
    description:
      "Collaboration tools and shared pipelines boost team efficiency",
  },
];

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const controls = animate(current.current, value, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (latest) => {
        current.current = latest;
        setDisplay(latest);
      },
    });
    return () => controls.stop();
  }, [value]);

  return <span>{format(Math.round(display))}</span>;
}

export function RoiCalculator() {
  const { currency } = useCurrency();
  const [leads, setLeads] = useState(120);
  const [conversion, setConversion] = useState(8);
  const [commission, setCommission] = useState(150000);

  const results = useMemo(() => {
    const deals = leads * (conversion / 100);
    const potentialRevenue = deals * commission;
    const lift = 0.28;
    const additionalRevenue = potentialRevenue * lift;
    const hoursSaved = Math.round(leads * 0.35);
    const platformMonthly = 2499;
    const roi =
      additionalRevenue > 0 ? (additionalRevenue / platformMonthly) * 100 : 0;

    return {
      potentialRevenue,
      additionalRevenue,
      hoursSaved,
      roi,
    };
  }, [leads, conversion, commission]);

  const formatMoney = (n: number) => formatPrice(n, currency);

  return (
    <section id="roi" className="relative scroll-mt-36 section-padding !py-16 md:!py-20">
      <div className="container-wide">
        <SectionHeader
          label="ROI Calculator"
          title="Why Brosavo Pays for Itself"
          description="See how much time and money you can save with better follow-ups, faster response times, and organized pipelines."
          align="center"
          compact
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="rounded-2xl border border-border bg-surface/70 p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-border bg-surface/70 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Inputs</h3>
                <p className="text-sm text-muted">Adjust to match your agency.</p>
              </div>
            </div>

            <label className="block">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Monthly Leads</span>
                <span className="text-muted">{leads}</span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={5}
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="w-full accent-[var(--accent-blue)]"
                aria-label="Monthly leads"
              />
            </label>

            <label className="mt-6 block">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Conversion %</span>
                <span className="text-muted">{conversion}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={conversion}
                onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full accent-[var(--accent-blue)]"
                aria-label="Conversion percentage"
              />
            </label>

            <label className="mt-6 block">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  Average Commission
                </span>
                <span className="text-muted">{formatMoney(commission)}</span>
              </div>
              <input
                type="range"
                min={25000}
                max={500000}
                step={5000}
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full accent-[var(--accent-blue)]"
                aria-label="Average commission"
              />
            </label>
          </div>

          <div className="rounded-[1.75rem] border border-accent-blue/25 bg-linear-to-br from-accent-blue/15 via-surface to-accent-violet/10 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-foreground">
              Estimated Impact
            </h3>
            <p className="mt-1 text-sm text-muted">
              Illustrative model based on typical CRM follow-up lift.
            </p>

            <dl className="mt-8 space-y-5">
              <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
                <dt className="text-sm text-muted">Potential Revenue</dt>
                <dd className="text-xl font-bold tracking-tight text-foreground">
                  <AnimatedNumber
                    value={results.potentialRevenue}
                    format={formatMoney}
                  />
                </dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
                <dt className="text-sm text-muted">
                  Additional Revenue with Brosavo
                </dt>
                <dd className="text-xl font-bold tracking-tight text-accent-blue">
                  <AnimatedNumber
                    value={results.additionalRevenue}
                    format={formatMoney}
                  />
                </dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
                <dt className="text-sm text-muted">Time Saved / month</dt>
                <dd className="text-xl font-bold tracking-tight text-foreground">
                  <AnimatedNumber
                    value={results.hoursSaved}
                    format={(n) => `${n} hrs`}
                  />
                </dd>
              </div>
              <div className="flex items-end justify-between gap-4">
                <dt className="text-sm text-muted">Estimated ROI</dt>
                <dd className="text-xl font-bold tracking-tight text-foreground">
                  <AnimatedNumber
                    value={results.roi}
                    format={(n) => `${n.toLocaleString("en-IN")}%`}
                  />
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-center text-sm text-muted">
              If Brosavo helps you close just one additional property this year,
              it pays for itself many times over.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
