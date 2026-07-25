import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import slugify from "slugify";
import type { BlogFrontmatter, BlogMeta, BlogPost } from "@/types/blog";

const BLOGS_DIRECTORY = path.join(process.cwd(), "content", "blogs");

function ensureBlogsDirectory() {
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    fs.mkdirSync(BLOGS_DIRECTORY, { recursive: true });
  }
}

function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug: string
): BlogFrontmatter {
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const date = String(data.date ?? "").trim();
  const author = String(data.author ?? "BRISΛVO Editorial").trim();
  const category = String(data.category ?? "Engineering").trim();
  const image = String(data.image ?? "/blog/sample-blog/cover.webp").trim();
  const slugSource = String(data.slug ?? fallbackSlug).trim() || fallbackSlug;
  const slug = slugify(slugSource, { lower: true, strict: true });

  return {
    title,
    description,
    date,
    author,
    category,
    tags: normalizeTags(data.tags),
    image,
    slug,
    seoTitle: data.seoTitle ? String(data.seoTitle).trim() : undefined,
    seoDescription: data.seoDescription
      ? String(data.seoDescription).trim()
      : undefined,
  };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return String(result);
}

function listMarkdownFiles(): string[] {
  ensureBlogsDirectory();
  return fs
    .readdirSync(BLOGS_DIRECTORY)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function readMarkdownFile(filename: string) {
  const fullPath = path.join(BLOGS_DIRECTORY, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const fallbackSlug = filename.replace(/\.mdx?$/, "");
  const frontmatter = normalizeFrontmatter(
    data as Record<string, unknown>,
    fallbackSlug
  );

  return {
    frontmatter,
    content: content.trim(),
    readingTime: estimateReadingTime(content),
  };
}

/**
 * Sort blogs by date, newest first. Returns a new array.
 */
export function sortBlogsByDate(list: BlogMeta[]): BlogMeta[] {
  return [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Read every markdown blog and return metadata only, newest first.
 */
export function getAllBlogs(): BlogMeta[] {
  const blogs = listMarkdownFiles().map((filename) => {
    const { frontmatter, readingTime } = readMarkdownFile(filename);
    return { ...frontmatter, readingTime };
  });

  return sortBlogsByDate(
    blogs.filter((blog) => Boolean(blog.title && blog.slug && blog.date))
  );
}

/** Alias for callers that previously used getBlogs(). */
export function getBlogs(): BlogMeta[] {
  return getAllBlogs();
}

/**
 * Load a single blog by slug, including rendered HTML.
 */
export async function getBlogBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const normalized = slugify(slug, { lower: true, strict: true });
  const filename = listMarkdownFiles().find((file) => {
    const { frontmatter } = readMarkdownFile(file);
    return frontmatter.slug === normalized;
  });

  if (!filename) return undefined;

  const { frontmatter, content, readingTime } = readMarkdownFile(filename);
  const rendered = await markdownToHtml(content);

  return {
    ...frontmatter,
    readingTime,
    content,
    html: rendered,
  };
}

/**
 * Recent blogs, newest first.
 */
export function getRecentBlogs(limit = 6): BlogMeta[] {
  return getAllBlogs().slice(0, limit);
}

/**
 * Related blogs by shared category / tags.
 */
export function getRelatedBlogs(slug: string, limit = 3): BlogMeta[] {
  const all = getAllBlogs();
  const source = all.find((blog) => blog.slug === slug);
  if (!source) return [];

  const candidates = all.filter((blog) => blog.slug !== slug);
  const scored = candidates
    .map((blog) => {
      let score = 0;
      if (blog.category === source.category) score += 3;
      score += blog.tags.filter((tag) => source.tags.includes(tag)).length;
      return { blog, score };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.blog.date).getTime() - new Date(a.blog.date).getTime()
    )
    .map((item) => item.blog);

  if (scored.length >= limit) return scored.slice(0, limit);

  const remaining = sortBlogsByDate(
    candidates.filter((blog) => !scored.some((item) => item.slug === blog.slug))
  );

  return [...scored, ...remaining].slice(0, limit);
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function getReadingTime(blog: BlogMeta): number {
  return blog.readingTime;
}

export function blogFileExists(slug: string): boolean {
  const normalized = slugify(slug, { lower: true, strict: true });
  return listMarkdownFiles().some((file) => {
    const { frontmatter } = readMarkdownFile(file);
    return frontmatter.slug === normalized || file.replace(/\.mdx?$/, "") === normalized;
  });
}

export function buildMarkdownDocument(input: {
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
  markdown: string;
}): string {
  const tagsYaml =
    input.tags.length > 0
      ? input.tags.map((tag) => `  - ${JSON.stringify(tag)}`).join("\n")
      : "";

  return `---
title: ${JSON.stringify(input.title)}
description: ${JSON.stringify(input.description)}
date: ${input.date}
author: ${JSON.stringify(input.author)}
category: ${JSON.stringify(input.category)}
tags:${tagsYaml ? `\n${tagsYaml}` : " []"}
image: ${input.image}
slug: ${input.slug}
seoTitle: ${JSON.stringify(input.seoTitle || input.title)}
seoDescription: ${JSON.stringify(input.seoDescription || input.description)}
---

${input.markdown.trim()}
`;
}

export { BLOGS_DIRECTORY };
