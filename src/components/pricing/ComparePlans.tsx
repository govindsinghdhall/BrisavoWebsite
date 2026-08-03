"use client";

import { Check, Minus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COMPARE_ROWS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
        <span className="sr-only">Included</span>
      </span>
    ) : (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-muted">
        <Minus className="h-3.5 w-3.5" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }

  return <span className="text-sm font-medium text-foreground/85">{value}</span>;
}

export function ComparePlans() {
  return (
    <section id="compare" className="relative scroll-mt-36 section-padding !py-16 md:!py-20">
      <div className="container-wide">
        <SectionHeader
          label="Compare"
          title="Compare Plans"
          description="See exactly what's included across Starter, Professional, and Enterprise."
          align="center"
          compact
        />

        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface/60 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface/90">
                  <th className="sticky left-0 z-10 bg-surface/95 px-5 py-4 text-sm font-semibold text-foreground backdrop-blur sm:px-6">
                    Feature
                  </th>
                  {["Starter", "Professional", "Enterprise"].map((plan, index) => (
                    <th
                      key={plan}
                      className={cn(
                        "px-5 py-4 text-sm font-semibold sm:px-6",
                        index === 1 ? "text-accent-blue" : "text-foreground"
                      )}
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-border/70",
                      index % 2 === 0 ? "bg-transparent" : "bg-foreground/[0.02]"
                    )}
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-inherit px-5 py-3.5 text-sm font-medium text-foreground/80 backdrop-blur sm:px-6"
                    >
                      {row.feature}
                    </th>
                    <td className="px-5 py-3.5 sm:px-6">
                      <CellValue value={row.starter} />
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <CellValue value={row.professional} />
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <CellValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
