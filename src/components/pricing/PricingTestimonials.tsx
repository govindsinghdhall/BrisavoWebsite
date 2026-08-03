"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRICING_TESTIMONIALS } from "@/lib/pricing";

export function PricingTestimonials() {
  return (
    <section className="relative section-padding !py-16 md:!py-20">
      <div className="container-wide">
        <SectionHeader
          label="Testimonials"
          title="Trusted by Growing Agencies"
          description="Real estate teams use Brosavo to respond faster, stay organized, and close more deals."
          align="center"
          compact
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_TESTIMONIALS.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex h-full flex-col rounded-[1.75rem] border border-border bg-surface/70 p-6 sm:p-7"
            >
              <div className="mb-4 flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-blue text-accent-blue"
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-7 text-foreground/85 sm:text-[15px]">
                &ldquo;{item.quote}&rdquo;
              </p>

              <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-accent-blue to-accent-violet text-sm font-semibold text-white"
                  aria-hidden
                >
                  {item.avatar}
                </div>
                <div>
                  <cite className="not-italic text-sm font-semibold text-foreground">
                    {item.author}
                  </cite>
                  <p className="text-xs text-muted">{item.company}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
