import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { CoverImage } from "@/components/blog/CoverImage";
import type { BlogPostMeta } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

interface FeaturedCardProps {
  post: BlogPostMeta;
  className?: string;
}

export function FeaturedCard({ post, className }: FeaturedCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border bg-surface",
        className
      )}
    >
      <div className="grid min-h-[420px] lg:grid-cols-2">
        <Link
          href={`/blog/${post.slug}`}
          className="relative min-h-[260px] overflow-hidden lg:min-h-full"
        >
          <CoverImage
            src={post.coverImage}
            alt={post.title}
            priority
            className="transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/20 via-transparent to-background/40" />
        </Link>

        <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-violet/20 bg-accent-violet/10 px-3 py-1 text-xs font-medium text-accent-violet">
            <Sparkles className="h-3.5 w-3.5" />
            Featured
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={post.category} />
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="max-w-xl text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              <Link href={`/blog/${post.slug}`} className="hover:text-accent-blue">
                {post.title}
              </Link>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>
          </div>

          <AuthorCard
            author={post.author}
            date={post.publishedDate}
            className="pt-2"
          />

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-r from-accent-blue to-accent-violet px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Read article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
