"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "lucide-react";

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[500px] lg:w-[600px] group"
    >
      <div className="glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 h-full">
        <div
          className="h-48 md:h-64 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${product.color}15, transparent)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[70%] rounded-xl glass-strong p-4 transform group-hover:scale-[1.02] transition-transform duration-700">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                <div className="h-2 w-24 rounded-full bg-white/10" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-white/5" />
                <div className="h-2 w-3/4 rounded-full bg-white/5" />
                <div className="h-2 w-1/2 rounded-full bg-white/5" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-12 rounded-lg bg-white/5" />
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}10, transparent 70%)` }}
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight mb-1">{product.name}</h3>
              <p className="text-sm font-mono" style={{ color: product.color }}>{product.tagline}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-2">
            {product.metrics.map((metric) => (
              <span
                key={metric}
                className="text-xs font-mono px-3 py-1.5 rounded-full glass text-white/60"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Products({ showHeader = true }: { showHeader?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section className="section-padding relative overflow-hidden">
      {showHeader && (
        <div className="container-wide mb-16">
          <SectionHeader
            label="Products"
            title="Billion-Dollar Software Platforms"
            description="Production-ready products engineered for scale — powering operations for enterprises worldwide."
          />
        </div>
      )}

      <div ref={containerRef} className="relative">
        <div className="overflow-x-auto scrollbar-hide pb-8">
          <motion.div style={{ x }} className="flex gap-6 px-4 md:px-8 lg:px-[max(2rem,calc((100vw-1400px)/2+2rem))]">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="absolute right-0 top-0 bottom-8 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
