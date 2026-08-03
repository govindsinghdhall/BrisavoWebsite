"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRICING_FAQS } from "@/lib/pricing";

export function PricingFaq() {
  return (
    <section id="faq" className="relative scroll-mt-36 section-padding !py-16 md:!py-20">
      <div className="container-wide">
        <SectionHeader
          label="FAQ"
          title="Frequently Asked Questions"
          description="Clear answers about trials, domains, WhatsApp, migrations, and security."
          align="center"
          compact
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {PRICING_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border bg-surface/70 px-5 py-4 open:bg-surface"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span className="mt-0.5 text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
