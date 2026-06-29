"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { METRICS, TIMELINE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlurReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export function Credibility({
  showHeader = true,
  compact = false,
}: {
  showHeader?: boolean;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "section-padding relative overflow-hidden",
        compact && "!py-16 md:!py-20"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-violet/[0.03] to-transparent" />

      <div className="container-wide relative">
        {showHeader && (
          <SectionHeader
            label="Enterprise Credibility"
            title="Trusted By Global Leaders"
            description="Numbers that reflect our commitment to engineering excellence and client success at international scale."
            align="center"
          />
        )}

        <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5", compact ? "mb-14" : "mb-24")}>
          {METRICS.map((metric, i) => (
            <BlurReveal key={metric.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  "glass rounded-2xl text-center group cursor-default border border-border hover:border-border transition-all duration-500",
                  compact ? "p-5 md:p-6" : "p-6 md:p-8"
                )}
              >
                <div
                  className={cn(
                    "font-semibold text-gradient-accent mb-2",
                    compact ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
                  )}
                >
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.suffix === "%" ? 1 : 0}
                  />
                </div>
                <div className="text-sm font-medium mb-1">{metric.label}</div>
                <div className="text-xs text-muted">{metric.description}</div>
              </motion.div>
            </BlurReveal>
          ))}
        </div>

        <BlurReveal>
          <h3 className={cn("font-semibold text-center", compact ? "text-xl mb-8" : "text-2xl mb-12")}>
            Our Journey
          </h3>
        </BlurReveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-violet/50 to-transparent md:-translate-x-px" />

          <div className={compact ? "space-y-8" : "space-y-12"}>
            {TIMELINE.map((item, i) => (
              <BlurReveal key={item.year} delay={i * 0.1}>
                <motion.div
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                    <span className="text-sm font-mono text-accent-cyan">{item.year}</span>
                    <h4 className="text-lg font-semibold mt-1 mb-2">{item.title}</h4>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>

                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue border-4 border-background z-10" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
