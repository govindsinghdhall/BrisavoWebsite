import type { BlogFaq } from "@/types/blog";

interface FaqSectionProps {
  faqs: BlogFaq[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  if (!faqs.length) return null;

  return (
    <section aria-labelledby="blog-faq-heading" className="mt-14">
      <h2
        id="blog-faq-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        Frequently Asked Questions
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border bg-surface/60 px-5 py-4"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {faq.question}
                <span className="mt-0.5 text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-foreground/75">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
