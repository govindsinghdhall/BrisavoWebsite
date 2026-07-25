import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { BlogContent } from "@/components/blog/BlogContent";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import {
  formatBlogDate,
  getAllBlogs,
  getBlogBySlug,
} from "@/lib/blogs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: `Post Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seoTitle || `${blog.title} | ${SITE_NAME} Blog`;
  const description = blog.seoDescription || blog.description;
  const canonical = `${SITE_URL}/blog/${blog.slug}`;
  const imageUrl = blog.image.startsWith("http")
    ? blog.image
    : `${SITE_URL}${blog.image}`;

  return {
    title,
    description,
    keywords: blog.tags,
    authors: [{ name: blog.author }],
    category: blog.category,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: blog.seoTitle || blog.title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-60" />

      <article className="container-wide relative section-padding !pt-28 sm:!pt-32">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header className="mx-auto max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
            {blog.category}
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">{blog.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {blog.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatBlogDate(blog.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {blog.readingTime} min read
            </span>
          </div>

          {blog.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-foreground/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-[2rem] border border-border">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <BlogContent html={blog.html} />
        </div>

        <div className="mx-auto max-w-5xl">
          <RelatedPosts slug={blog.slug} />
        </div>
      </article>
    </div>
  );
}
