import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  href?: string;
  className?: string;
}

export function TagBadge({ tag, href, className }: TagBadgeProps) {
  const classes = cn(
    "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-foreground/70 transition-colors hover:bg-surface-hover hover:text-foreground",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        #{tag}
      </Link>
    );
  }

  return <span className={classes}>#{tag}</span>;
}
