/**
 * Markdown blog frontmatter + post types.
 * Source of truth: content/blogs/*.md
 */

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
}

/** Metadata only (no HTML body) — used for listings and cards. */
export interface BlogMeta extends BlogFrontmatter {
  readingTime: number;
}

/** Full post including raw markdown and rendered HTML. */
export interface BlogPost extends BlogMeta {
  content: string;
  html: string;
}

/** Alias kept for convenience across the codebase. */
export type Blog = BlogMeta;
