"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  className?: string;
}

export function CurrencySelector({
  currency,
  setCurrency,
  className,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const current = CURRENCIES.find((item) => item.code === currency)!;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-accent-blue/40"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span>{current.code}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
            role="listbox"
            aria-label="Select currency"
          >
            <div className="p-2">
              {CURRENCIES.map((item) => {
                const selected = item.code === currency;
                return (
                  <button
                    key={item.code}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      void setCurrency(item.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      selected
                        ? "bg-accent-blue/10 text-accent-blue"
                        : "hover:bg-foreground/5"
                    )}
                  >
                    <span className="text-lg leading-none" aria-hidden>
                      {item.flag}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-foreground">
                        {item.code}
                      </span>
                      <span className="block text-xs text-muted">
                        {item.label}
                      </span>
                    </span>
                    {selected ? <Check className="h-4 w-4" /> : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
