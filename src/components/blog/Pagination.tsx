import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  buildHref,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Blog pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border",
          page <= 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-surface-hover"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((item) => (
        <Link
          key={item}
          href={buildHref(item)}
          className={cn(
            "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm",
            item === page
              ? "border-accent-blue/40 bg-accent-blue/15 text-accent-blue"
              : "border-border text-foreground/70 hover:bg-surface-hover"
          )}
        >
          {item}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border",
          page >= totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-surface-hover"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
