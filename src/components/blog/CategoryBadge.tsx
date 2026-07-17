import Link from "next/link";
import { getCategoryLabel } from "@/lib/blog/constants";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  href?: string;
  className?: string;
}

export function CategoryBadge({ category, href, className }: CategoryBadgeProps) {
  const label = getCategoryLabel(category);
  const classes = cn(
    "inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
