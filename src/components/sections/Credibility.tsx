"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { METRICS, TIMELINE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlurReveal } from "@/components/animations/TextReveal";

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

export function Credibility({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section-padding relative overflow-hidden">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
          {METRICS.map((metric, i) => (
            <BlurReveal key={metric.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 md:p-8 text-center group cursor-default border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="text-3xl md:text-5xl font-semibold text-gradient-accent mb-2">
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
          <h3 className="text-2xl font-semibold text-center mb-12">Our Journey</h3>
        </BlurReveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-violet/50 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
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
