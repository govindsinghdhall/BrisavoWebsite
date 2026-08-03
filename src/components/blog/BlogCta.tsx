import Link from "next/link";
import { PRODUCT_CTA } from "@/lib/site";

interface BlogCtaProps {
  heading?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function BlogCta({
  heading = PRODUCT_CTA.heading,
  text = PRODUCT_CTA.text,
  primaryLabel = PRODUCT_CTA.primaryLabel,
  primaryHref = PRODUCT_CTA.primaryHref,
  secondaryLabel = PRODUCT_CTA.secondaryLabel,
  secondaryHref = PRODUCT_CTA.secondaryHref,
}: BlogCtaProps) {
  return (
    <section className="mt-14 overflow-hidden rounded-[2rem] border border-accent-blue/20 bg-linear-to-br from-accent-blue/15 via-surface to-transparent p-8 sm:p-10">
      <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
        {text}
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href={primaryHref}
          className="inline-flex items-center rounded-2xl bg-linear-to-r from-accent-blue to-accent-violet px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center rounded-2xl border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-blue/40"
        >
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
