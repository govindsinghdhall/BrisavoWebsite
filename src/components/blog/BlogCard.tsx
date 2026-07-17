import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { CoverImage } from "@/components/blog/CoverImage";
import type { BlogPostMeta } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostMeta;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group glass flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <CoverImage
          src={post.coverImage}
          alt={post.title}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge
            category={post.category}
            href={`/blog?category=${post.category}`}
          />
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent-blue">
              {post.title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <AuthorCard author={post.author} date={post.publishedDate} />
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
            aria-label={`Read ${post.title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
