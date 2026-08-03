"use client";

import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

const countries = [
  { name: "India", flag: "🇮🇳" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "UAE", flag: "🇦🇪" },
];

export function SocialProof() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="border-y border-border/70 bg-linear-to-r from-accent-blue/8 via-surface to-accent-violet/8"
      aria-label="Social proof"
    >
      <div className="container-wide py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-muted">
            Trusted by real estate professionals worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">4.9/5</span>
            <span className="text-sm text-muted">customer rating</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Users className="h-4 w-4" />
              Serving customers across
            </span>
            {countries.map((country) => (
              <span
                key={country.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1 text-sm"
              >
                <span aria-hidden>{country.flag}</span>
                <span className="font-medium text-foreground/85">
                  {country.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
