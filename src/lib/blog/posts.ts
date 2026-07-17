import { cache } from "react";
import { POSTS_PER_PAGE } from "@/lib/blog/constants";
import { getReader } from "@/lib/blog/reader";
import { estimateReadingTime } from "@/lib/blog/toc";
import type {
  BlogFilters,
  BlogPost,
  BlogPostMeta,
  PaginatedPosts,
} from "@/lib/blog/types";

type RawPostEntry = Awaited<
  ReturnType<ReturnType<typeof getReader>["collections"]["posts"]["read"]>
>;

function normalizeImage(value: string | null | undefined): string | null {
  if (!value) return null;
  return value.startsWith("/") ? value : `/${value}`;
}

function normalizePost(
  slug: string,
  entry: NonNullable<RawPostEntry>,
  content: string
): BlogPost {
  const readingTime =
    typeof entry.readingTime === "number" && entry.readingTime > 0
      ? entry.readingTime
      : estimateReadingTime(content);

  const coverImage = normalizeImage(entry.coverImage) || "/blog/.gitkeep";

  return {
    slug,
    title: entry.title || slug,
    excerpt: entry.excerpt || "",
    description: entry.description || entry.excerpt || "",
    coverImage,
    author: {
      name: entry.author?.name || "BRISΛVO Team",
      role: entry.author?.role || "Editorial",
      avatar: normalizeImage(entry.author?.avatar),
    },
    publishedDate: entry.publishedDate || new Date().toISOString().slice(0, 10),
    category: entry.category || "engineering",
    tags: (entry.tags || []).filter(Boolean),
    featured: Boolean(entry.featured),
    readingTime,
    draft: Boolean(entry.draft),
    metaTitle: entry.metaTitle || null,
    metaDescription: entry.metaDescription || null,
    canonicalUrl: entry.canonicalUrl || null,
    ogImage: normalizeImage(entry.ogImage),
    faqs: (entry.faqs || [])
      .filter((faq) => faq.question && faq.answer)
      .map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
    content,
  };
}

function toMeta(post: BlogPost): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    description: post.description,
    coverImage: post.coverImage,
    author: post.author,
    publishedDate: post.publishedDate,
    category: post.category,
    tags: post.tags,
    featured: post.featured,
    readingTime: post.readingTime,
    draft: post.draft,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    canonicalUrl: post.canonicalUrl,
    ogImage: post.ogImage,
    faqs: post.faqs,
  };
}

function isPublished(post: BlogPostMeta): boolean {
  if (post.draft && process.env.NODE_ENV === "production") {
    return false;
  }
  return Boolean(post.title && post.publishedDate);
}

function sortByDateDesc(a: BlogPostMeta, b: BlogPostMeta): number {
  return (
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

async function loadAllPostsInternal(): Promise<BlogPost[]> {
  const reader = getReader();
  const entries = await reader.collections.posts.all({
    resolveLinkedFiles: true,
  });

  const posts = await Promise.all(
    entries.map(async ({ slug, entry }) => {
      if (!entry) return null;

      const rawContent = entry.content as unknown;
      const content =
        typeof rawContent === "string"
          ? rawContent
          : typeof rawContent === "function"
            ? String(await (rawContent as () => Promise<string> | string)())
            : "";

      return normalizePost(slug, entry, content);
    })
  );

  return posts.filter((post): post is BlogPost => Boolean(post));
}

export const getAllPosts = cache(async (): Promise<BlogPostMeta[]> => {
  const posts = await loadAllPostsInternal();
  return posts
    .map(toMeta)
    .filter(isPublished)
    .sort(sortByDateDesc);
});

export const getFeaturedPosts = cache(async (limit = 3): Promise<BlogPostMeta[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, limit);
});

export const getRecentPosts = cache(async (limit = 6): Promise<BlogPostMeta[]> => {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await loadAllPostsInternal();
  const post = posts.find((item) => item.slug === slug) ?? null;
  if (!post) return null;
  if (post.draft && process.env.NODE_ENV === "production") return null;
  return post;
});

export const getCategories = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((post) => post.category))).sort();
});

export const getTags = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
});

export const getRelatedPosts = cache(
  async (slug: string, limit = 3): Promise<BlogPostMeta[]> => {
    const posts = await getAllPosts();
    const current = posts.find((post) => post.slug === slug);
    if (!current) return [];

    const scored = posts
      .filter((post) => post.slug !== slug)
      .map((post) => {
        let score = 0;
        if (post.category === current.category) score += 3;
        score += post.tags.filter((tag) => current.tags.includes(tag)).length;
        return { post, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || sortByDateDesc(a.post, b.post));

    if (scored.length >= limit) {
      return scored.slice(0, limit).map((item) => item.post);
    }

    const remaining = posts
      .filter(
        (post) =>
          post.slug !== slug &&
          !scored.some((item) => item.post.slug === post.slug)
      )
      .slice(0, limit - scored.length);

    return [...scored.map((item) => item.post), ...remaining];
  }
);

export async function getAdjacentPosts(slug: string): Promise<{
  previous: BlogPostMeta | null;
  next: BlogPostMeta | null;
}> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export async function getFilteredPosts(
  filters: BlogFilters = {}
): Promise<PaginatedPosts> {
  const page = Math.max(1, filters.page ?? 1);
  const query = filters.query?.trim().toLowerCase() ?? "";
  const category = filters.category?.trim().toLowerCase() ?? "";
  const tag = filters.tag?.trim().toLowerCase() ?? "";

  let posts = await getAllPosts();

  if (category) {
    posts = posts.filter((post) => post.category.toLowerCase() === category);
  }

  if (tag) {
    posts = posts.filter((post) =>
      post.tags.some((item) => item.toLowerCase() === tag)
    );
  }

  if (query) {
    posts = posts.filter((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        post.description,
        post.category,
        post.author.name,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;

  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    page: safePage,
    totalPages,
    total,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
