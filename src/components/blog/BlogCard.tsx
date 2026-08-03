import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { BlogMeta } from "@/types/blog";
import { formatBlogDate } from "@/lib/blogs";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: BlogMeta;
  priority?: boolean;
  className?: string;
}

export function BlogCard({ blog, priority = false, className }: BlogCardProps) {
  const href = `/blog/${blog.slug}`;

  return (
    <article
      className={cn(
        "group glass flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden"
        aria-label={blog.title}
      >
        <Image
          src={blog.image}
          alt={blog.imageAlt || blog.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
            {blog.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatBlogDate(blog.date)}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
            <Link href={href} className="transition-colors hover:text-accent-blue">
              {blog.title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {blog.description}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue transition-opacity hover:opacity-80"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
