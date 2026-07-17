import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AuthorCard,
  BlogCard,
  BlogLayout,
  CategoryBadge,
  CoverImage,
  JsonLd,
  MDXContent,
  ReadingProgress,
  ShareButtons,
  TagBadge,
  TOC,
} from "@/components/blog";
import { SITE_NAME, SITE_URL } from "@/lib/blog/constants";
import {
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";
import {
  absoluteUrl,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/blog/seo";
import { extractToc } from "@/lib/blog/toc";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Post Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = post.metaTitle || `${post.title} | ${SITE_NAME} Blog`;
  const description =
    post.metaDescription || post.description || post.excerpt;
  const canonical = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const image = absoluteUrl(post.ogImage || post.coverImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: !post.draft,
      follow: !post.draft,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [related, adjacent] = await Promise.all([
    getRelatedPosts(slug, 3),
    getAdjacentPosts(slug),
  ]);

  const headings = extractToc(post.content);
  const shareUrl = absoluteUrl(post.canonicalUrl || `/blog/${post.slug}`);
  const faqSchema = buildFaqJsonLd(post.faqs);

  return (
    <>
      <ReadingProgress />
      <BlogLayout>
        <JsonLd data={buildArticleJsonLd(post)} />
        <JsonLd
          data={buildBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ])}
        />
        {faqSchema ? <JsonLd data={faqSchema} /> : null}

        <article id="blog-article" className="pb-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <CategoryBadge
              category={post.category}
              href={`/blog?category=${post.category}`}
            />
            {post.featured ? (
              <span className="rounded-full border border-accent-violet/30 bg-accent-violet/10 px-3 py-1 text-xs font-medium text-accent-violet">
                Featured
              </span>
            ) : null}
          </div>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-col gap-4 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
            <AuthorCard
              author={post.author}
              date={post.publishedDate}
              readingTime={post.readingTime}
            />
            <ShareButtons title={post.title} url={shareUrl} />
          </div>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              priority
              sizes="100vw"
            />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <div className="prose-blog max-w-none">
                <MDXContent source={post.content} />
              </div>

              {post.faqs.length > 0 ? (
                <section className="mt-12 space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Frequently asked questions
                  </h2>
                  <div className="space-y-3">
                    {post.faqs.map((faq) => (
                      <details
                        key={faq.question}
                        className="glass rounded-2xl px-5 py-4"
                      >
                        <summary className="cursor-pointer list-none font-medium text-foreground">
                          {faq.question}
                        </summary>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} href={`/blog?tag=${tag}`} />
                ))}
              </div>

              <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {adjacent.previous ? (
                  <Link
                    href={`/blog/${adjacent.previous.slug}`}
                    className="glass group rounded-3xl p-5 transition-colors hover:bg-surface-hover"
                  >
                    <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous
                    </p>
                    <p className="font-semibold text-foreground group-hover:text-accent-blue">
                      {adjacent.previous.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {adjacent.next ? (
                  <Link
                    href={`/blog/${adjacent.next.slug}`}
                    className="glass group rounded-3xl p-5 text-right transition-colors hover:bg-surface-hover sm:justify-self-end"
                  >
                    <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted sm:ml-auto">
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </p>
                    <p className="font-semibold text-foreground group-hover:text-accent-blue">
                      {adjacent.next.title}
                    </p>
                  </Link>
                ) : null}
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <TOC headings={headings} />
            </aside>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="mt-8 border-t border-border pt-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
              Related posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </BlogLayout>
    </>
  );
}
