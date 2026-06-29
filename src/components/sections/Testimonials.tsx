"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="section-padding !py-16 md:!py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-violet/5 blur-[200px] rounded-full" />
      </div>

      <div className="container-wide relative">
        <SectionHeader
          label="Client Stories"
          title="Voices Of Global Impact"
          description="Leaders worldwide trust Brisavo to engineer their most critical technology."
          align="center"
          compact
        />

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-6 md:p-9 border border-border"
            >
              <Quote className="w-8 h-8 text-accent-blue/30 mb-4" />

              <p className="text-lg md:text-xl font-light leading-relaxed mb-6 text-foreground/90">
                &ldquo;{TESTIMONIALS[active].quote}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-sm font-semibold">
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <div>
                    <div className="font-medium">{TESTIMONIALS[active].author}</div>
                    <div className="text-sm text-muted">{TESTIMONIALS[active].role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-blue text-accent-blue" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-surface-hover transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-accent-blue" : "w-1.5 bg-foreground/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-surface-hover transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActive(i)}
              whileHover={{ y: -4 }}
              className={`glass rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300 ${
                i === active ? "border-accent-blue/30 bg-accent-blue/5" : "border-border"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue/50 to-accent-violet/50 flex items-center justify-center text-xs font-semibold">
                {t.avatar}
              </div>
              <div className="text-left">
                <div className="text-xs font-medium">{t.author}</div>
                <div className="text-[10px] text-muted">{t.company}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
