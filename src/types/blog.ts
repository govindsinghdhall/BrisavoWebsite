/**
 * Markdown blog frontmatter + post types.
 * Source of truth: content/blogs/*.md
 */

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt?: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  keyTakeaways?: string[];
  faqs?: BlogFaq[];
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/** Metadata only (no HTML body) — used for listings and cards. */
export interface BlogMeta extends BlogFrontmatter {
  readingTime: number;
}

/** Full post including raw markdown, rendered HTML, and derived structure. */
export interface BlogPost extends BlogMeta {
  content: string;
  html: string;
  headings: TocHeading[];
}

/** Alias kept for convenience across the codebase. */
export type Blog = BlogMeta;
