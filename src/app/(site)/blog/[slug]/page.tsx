import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, RefreshCw, User } from "lucide-react";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogBreadcrumbs } from "@/components/blog/BlogBreadcrumbs";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogCta } from "@/components/blog/BlogCta";
import { FaqSection } from "@/components/blog/FaqSection";
import { JsonLd } from "@/components/blog/JsonLd";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { resolveAuthor } from "@/lib/authors";
import {
  absoluteUrl,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/blog-seo";
import {
  formatBlogDate,
  getAllBlogs,
  getBlogBySlug,
} from "@/lib/blogs";
import { BLOG_TITLE_SUFFIX, PRODUCT_CTA, SITE_NAME, SITE_URL } from "@/lib/site";

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
      title: `Post Not Found${BLOG_TITLE_SUFFIX}`,
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seoTitle || `${blog.title}${BLOG_TITLE_SUFFIX}`;
  const description = blog.seoDescription || blog.description;
  const canonical = `${SITE_URL}/blog/${blog.slug}`;
  const imageUrl = absoluteUrl(blog.image);
  const imageAlt = blog.imageAlt || blog.title;

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
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      publishedTime: blog.date,
      modifiedTime: blog.updatedAt || blog.date,
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
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

  const author = resolveAuthor(blog.author);
  const imageAlt = blog.imageAlt || blog.title;
  const takeaways = blog.keyTakeaways ?? [];
  const faqs = blog.faqs ?? [];
  const articleSchema = buildArticleJsonLd(blog, author);
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: blog.title, url: `/blog/${blog.slug}` },
  ]);
  const faqSchema = buildFaqJsonLd(faqs);

  return (
    <div className="relative overflow-hidden">
      <JsonLd data={[articleSchema, breadcrumbSchema, faqSchema]} />
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-60" />

      <article className="container-wide relative section-padding !pt-28 sm:!pt-32">
        <BlogBreadcrumbs title={blog.title} />

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
              {author.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              Published {formatBlogDate(blog.date)}
            </span>
            {blog.updatedAt && blog.updatedAt !== blog.date ? (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4" />
                Updated {formatBlogDate(blog.updatedAt)}
              </span>
            ) : null}
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

        <div className="relative mx-auto mt-10 aspect-[1200/630] max-w-4xl overflow-hidden rounded-[2rem] border border-border">
          <Image
            src={blog.image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <TableOfContents headings={blog.headings} />
          </aside>

          <div className="mx-auto w-full max-w-3xl">
            {takeaways.length > 0 ? (
              <div className="mb-10">
                <KeyTakeaways items={takeaways} />
              </div>
            ) : null}

            <BlogContent html={blog.html} />

            {faqs.length > 0 ? <FaqSection faqs={faqs} /> : null}

            <BlogCta
              heading={PRODUCT_CTA.heading}
              text={PRODUCT_CTA.text}
              primaryLabel={PRODUCT_CTA.primaryLabel}
              secondaryLabel={PRODUCT_CTA.secondaryLabel}
            />

            <div className="mt-14">
              <AuthorCard author={author} />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <RelatedPosts slug={blog.slug} />
        </div>
      </article>
    </div>
  );
}
