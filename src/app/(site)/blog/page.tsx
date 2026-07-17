import type { Metadata } from "next";
import { Suspense } from "react";
import {
  BlogCard,
  BlogFilters,
  BlogLayout,
  EmptyState,
  FeaturedCard,
  JsonLd,
  Newsletter,
  Pagination,
  SearchBar,
} from "@/components/blog";
import { SITE_NAME, SITE_URL } from "@/lib/blog/constants";
import {
  getCategories,
  getFeaturedPosts,
  getFilteredPosts,
  getTags,
} from "@/lib/blog/posts";
import { buildBlogListingJsonLd } from "@/lib/blog/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Blog — Insights on AI, Cloud & Product | ${SITE_NAME}`,
  description:
    "Explore BRISΛVO insights on AI-native systems, cloud infrastructure, real estate technology, and product engineering.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "AI, cloud, CRM, and engineering insights from the BRISΛVO global technology team.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description:
      "AI, cloud, CRM, and engineering insights from the BRISΛVO global technology team.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const tag = params.tag?.trim() ?? "";
  const page = Number(params.page || "1") || 1;

  const [featured, filtered, categories, tags] = await Promise.all([
    getFeaturedPosts(2),
    getFilteredPosts({ query, category, tag, page }),
    getCategories(),
    getTags(),
  ]);

  const showFeatured = !query && !category && !tag && page === 1;

  function buildHref(nextPage: number) {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (category) next.set("category", category);
    if (tag) next.set("tag", tag);
    if (nextPage > 1) next.set("page", String(nextPage));
    const value = next.toString();
    return value ? `/blog?${value}` : "/blog";
  }

  return (
    <BlogLayout showBackLink={false}>
      <JsonLd data={buildBlogListingJsonLd(filtered.posts)} />

      <header className="mb-12 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-blue">
          Insights
        </p>
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          BRISΛVO Blog
        </h1>
        <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
          Practical thinking on AI, cloud infrastructure, product engineering,
          and the systems that help ambitious businesses scale.
        </p>
      </header>

      <div className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Suspense fallback={<div className="glass h-[58px] animate-pulse rounded-2xl" />}>
          <SearchBar />
        </Suspense>
        <div className="glass rounded-2xl px-5 py-4 text-sm text-muted">
          {filtered.total} article{filtered.total === 1 ? "" : "s"}
          {query ? ` matching “${query}”` : ""}
          {category ? ` in ${category}` : ""}
          {tag ? ` tagged #${tag}` : ""}
        </div>
      </div>

      <div className="mb-12">
        <BlogFilters
          categories={categories}
          tags={tags}
          activeCategory={category || undefined}
          activeTag={tag || undefined}
          query={query || undefined}
        />
      </div>

      {showFeatured && featured.length > 0 ? (
        <section className="mb-14 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Featured
            </h2>
          </div>
          <div className="space-y-6">
            {featured.map((post) => (
              <FeaturedCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mb-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {showFeatured ? "Latest posts" : "Results"}
          </h2>
        </div>

        {filtered.posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <Pagination
        page={filtered.page}
        totalPages={filtered.totalPages}
        buildHref={buildHref}
        className="mb-16"
      />

      <Newsletter />
    </BlogLayout>
  );
}
