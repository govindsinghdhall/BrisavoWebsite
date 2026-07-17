import Link from "next/link";
import { getCategoryLabel } from "@/lib/blog/constants";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  activeCategory?: string;
  activeTag?: string;
  query?: string;
}

function buildHref({
  category,
  tag,
  query,
}: {
  category?: string;
  tag?: string;
  query?: string;
}) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category) params.set("category", category);
  if (tag) params.set("tag", tag);
  const value = params.toString();
  return value ? `/blog?${value}` : "/blog";
}

export function BlogFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
  query,
}: BlogFiltersProps) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Categories
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={buildHref({ tag: activeTag, query })}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              !activeCategory
                ? "border-accent-blue/40 bg-accent-blue/15 text-accent-blue"
                : "border-border text-foreground/70 hover:bg-surface-hover"
            )}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={buildHref({
                category,
                tag: activeTag,
                query,
              })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                activeCategory === category
                  ? "border-accent-blue/40 bg-accent-blue/15 text-accent-blue"
                  : "border-border text-foreground/70 hover:bg-surface-hover"
              )}
            >
              {getCategoryLabel(category)}
            </Link>
          ))}
        </div>
      </div>

      {tags.length ? (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={buildHref({
                  category: activeCategory,
                  tag: activeTag === tag ? undefined : tag,
                  query,
                })}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  activeTag === tag
                    ? "border-accent-violet/40 bg-accent-violet/15 text-accent-violet"
                    : "border-border text-foreground/70 hover:bg-surface-hover"
                )}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
