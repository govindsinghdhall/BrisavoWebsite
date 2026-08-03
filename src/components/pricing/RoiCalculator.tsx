"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { animate } from "framer-motion";
import { Calculator } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatInr } from "@/lib/pricing";

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
  const [leads, setLeads] = useState(120);
  const [conversion, setConversion] = useState(8);
  const [commission, setCommission] = useState(150000);

  const results = useMemo(() => {
    const deals = leads * (conversion / 100);
    const potentialRevenue = deals * commission;
    const lift = 0.28;
    const additionalRevenue = potentialRevenue * lift;
    const hoursSaved = Math.round(leads * 0.35);
    const roi = additionalRevenue > 0 ? (additionalRevenue / 2499) * 100 : 0;

    return {
      potentialRevenue,
      additionalRevenue,
      hoursSaved,
      roi,
    };
  }, [leads, conversion, commission]);

  return (
    <section id="roi" className="relative scroll-mt-36 section-padding !py-16 md:!py-20">
      <div className="container-wide">
        <SectionHeader
          label="ROI Calculator"
          title="See Your Growth Potential"
          description="Estimate revenue impact from better follow-ups, faster response times, and organized pipelines."
          align="center"
          compact
        />

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
                <span className="font-medium text-foreground">Average Commission</span>
                <span className="text-muted">{formatInr(commission)}</span>
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
            <h3 className="text-lg font-semibold text-foreground">Estimated Impact</h3>
            <p className="mt-1 text-sm text-muted">
              Illustrative model based on typical CRM follow-up lift.
            </p>

            <dl className="mt-8 space-y-5">
              <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
                <dt className="text-sm text-muted">Potential Revenue</dt>
                <dd className="text-xl font-bold tracking-tight text-foreground">
                  <AnimatedNumber value={results.potentialRevenue} format={formatInr} />
                </dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
                <dt className="text-sm text-muted">Additional Revenue with Brosavo</dt>
                <dd className="text-xl font-bold tracking-tight text-accent-blue">
                  <AnimatedNumber value={results.additionalRevenue} format={formatInr} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
