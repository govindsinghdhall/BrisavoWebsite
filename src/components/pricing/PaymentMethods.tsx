"use client";

import { motion } from "framer-motion";
import { Building2, CreditCard, Shield, Smartphone } from "lucide-react";

const paymentMethods = {
  india: [
    { name: "UPI", icon: Smartphone },
    { name: "Credit Card", icon: CreditCard },
    { name: "Debit Card", icon: CreditCard },
    { name: "Net Banking", icon: Building2 },
  ],
  international: [
    { name: "Visa", icon: CreditCard },
    { name: "Mastercard", icon: CreditCard },
    { name: "American Express", icon: CreditCard },
  ],
};

export function PaymentMethods() {
  return (
    <section className="relative section-padding !py-12 md:!py-16">
      <div className="container-wide">
        <div className="rounded-[1.75rem] border border-border bg-surface/70 p-6 sm:p-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue">
              <Shield className="h-4 w-4" />
              Secure payments
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              Payment Methods
            </h2>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-muted">
                🇮🇳 Accepted in India
              </h3>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.india.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.03] px-4 py-2.5"
                  >
                    <method.icon className="h-4 w-4 text-accent-blue" />
                    <span className="text-sm font-medium text-foreground">
                      {method.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-muted">
                🌍 International cards
              </h3>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.international.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + index * 0.04 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.03] px-4 py-2.5"
                  >
                    <method.icon className="h-4 w-4 text-accent-violet" />
                    <span className="text-sm font-medium text-foreground">
                      {method.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
