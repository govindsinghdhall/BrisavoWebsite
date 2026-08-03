import type { TocHeading } from "@/types/blog";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border bg-surface/80 p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        On this page
      </p>
      <ol className="mt-4 space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-3" : undefined}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm leading-6 text-foreground/75 transition-colors hover:text-accent-blue"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
