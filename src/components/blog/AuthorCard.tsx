import Image from "next/image";
import type { BlogAuthor } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

interface AuthorCardProps {
  author: BlogAuthor;
  date?: string;
  readingTime?: number;
  className?: string;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function AuthorCard({
  author,
  date,
  readingTime,
  className,
}: AuthorCardProps) {
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-sm font-semibold text-foreground">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {author.name}
        </p>
        <p className="truncate text-xs text-muted">
          {author.role}
          {date ? ` · ${formatDate(date)}` : ""}
          {typeof readingTime === "number" ? ` · ${readingTime} min read` : ""}
        </p>
      </div>
    </div>
  );
}
