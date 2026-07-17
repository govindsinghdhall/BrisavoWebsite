"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

interface TOCProps {
  headings: TocHeading[];
  className?: string;
}

export function TOC({ headings, className }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "glass rounded-3xl p-5",
        className
      )}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-colors",
                heading.level === 3 ? "pl-3" : "pl-0",
                activeId === heading.id
                  ? "font-medium text-accent-blue"
                  : "text-foreground/65 hover:text-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
