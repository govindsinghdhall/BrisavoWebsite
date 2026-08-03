import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import slugify from "slugify";
import { DEFAULT_AUTHOR_ID, resolveAuthor } from "@/lib/authors";
import {
  extractFaqsFromMarkdown,
  extractHeadings,
  extractKeyTakeawaysFromMarkdown,
  stripMarkdownSection,
} from "@/lib/blog-seo";
import { DEFAULT_BLOG_COVER, DEFAULT_OG_IMAGE } from "@/lib/site";
import type {
  BlogFaq,
  BlogFrontmatter,
  BlogMeta,
  BlogPost,
} from "@/types/blog";

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

function normalizeStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/\n|,/)
      .map((item) => item.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeFaqs(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const question = String(record.question ?? "").trim();
      const answer = String(record.answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is BlogFaq => Boolean(item));
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug: string
): BlogFrontmatter {
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const date = String(data.date ?? "").trim();
  const updatedAt = data.updatedAt
    ? String(data.updatedAt).trim()
    : undefined;
  const authorRaw = String(data.author ?? DEFAULT_AUTHOR_ID).trim();
  const author = resolveAuthor(authorRaw).name;
  const category = String(data.category ?? "Real Estate Tech").trim();
  const image = String(
    data.image ?? DEFAULT_BLOG_COVER ?? DEFAULT_OG_IMAGE
  ).trim();
  const imageAlt = data.imageAlt
    ? String(data.imageAlt).trim()
    : undefined;
  const slugSource = String(data.slug ?? fallbackSlug).trim() || fallbackSlug;
  const slug = slugify(slugSource, { lower: true, strict: true });

  return {
    title,
    description,
    date,
    updatedAt,
    author,
    category,
    tags: normalizeTags(data.tags),
    image,
    imageAlt,
    slug,
    seoTitle: data.seoTitle ? String(data.seoTitle).trim() : undefined,
    seoDescription: data.seoDescription
      ? String(data.seoDescription).trim()
      : undefined,
    keyTakeaways: normalizeStringList(data.keyTakeaways),
    faqs: normalizeFaqs(data.faqs),
  };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
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

export function sortBlogsByDate(list: BlogMeta[]): BlogMeta[] {
  return [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllBlogs(): BlogMeta[] {
  const blogs = listMarkdownFiles().map((filename) => {
    const { frontmatter, readingTime } = readMarkdownFile(filename);
    return { ...frontmatter, readingTime };
  });

  return sortBlogsByDate(
    blogs.filter((blog) => Boolean(blog.title && blog.slug && blog.date))
  );
}

export function getBlogs(): BlogMeta[] {
  return getAllBlogs();
}

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
  const faqs =
    frontmatter.faqs && frontmatter.faqs.length > 0
      ? frontmatter.faqs
      : extractFaqsFromMarkdown(content);
  const keyTakeaways =
    frontmatter.keyTakeaways && frontmatter.keyTakeaways.length > 0
      ? frontmatter.keyTakeaways
      : extractKeyTakeawaysFromMarkdown(content);

  // Structured UI blocks handle these sections — avoid duplicate render.
  let bodyMarkdown = content;
  if (keyTakeaways.length > 0) {
    bodyMarkdown = stripMarkdownSection(bodyMarkdown, "Key Takeaways");
  }
  if (faqs.length > 0) {
    bodyMarkdown = stripMarkdownSection(
      bodyMarkdown,
      "Frequently Asked Questions"
    );
  }

  const rendered = await markdownToHtml(bodyMarkdown);
  const headings = extractHeadings(bodyMarkdown);

  return {
    ...frontmatter,
    keyTakeaways,
    faqs,
    readingTime,
    content,
    html: rendered,
    headings,
  };
}

export function getRecentBlogs(limit = 6): BlogMeta[] {
  return getAllBlogs().slice(0, limit);
}

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
    month: "long",
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
    return (
      frontmatter.slug === normalized ||
      file.replace(/\.mdx?$/, "") === normalized
    );
  });
}

export function buildMarkdownDocument(input: {
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
  markdown: string;
}): string {
  const tagsYaml =
    input.tags.length > 0
      ? input.tags.map((tag) => `  - ${JSON.stringify(tag)}`).join("\n")
      : "";

  const takeawaysYaml =
    input.keyTakeaways && input.keyTakeaways.length > 0
      ? input.keyTakeaways
          .map((item) => `  - ${JSON.stringify(item)}`)
          .join("\n")
      : "";

  const faqsYaml =
    input.faqs && input.faqs.length > 0
      ? input.faqs
          .map(
            (faq) =>
              `  - question: ${JSON.stringify(faq.question)}\n    answer: ${JSON.stringify(faq.answer)}`
          )
          .join("\n")
      : "";

  return `---
title: ${JSON.stringify(input.title)}
description: ${JSON.stringify(input.description)}
date: ${input.date}
updatedAt: ${input.updatedAt || input.date}
author: ${JSON.stringify(input.author)}
category: ${JSON.stringify(input.category)}
tags:${tagsYaml ? `\n${tagsYaml}` : " []"}
image: ${input.image}
imageAlt: ${JSON.stringify(input.imageAlt || input.title)}
slug: ${input.slug}
seoTitle: ${JSON.stringify(input.seoTitle || `${input.title} | Brosavo Blog`)}
seoDescription: ${JSON.stringify(input.seoDescription || input.description)}
keyTakeaways:${takeawaysYaml ? `\n${takeawaysYaml}` : " []"}
faqs:${faqsYaml ? `\n${faqsYaml}` : " []"}
---

${input.markdown.trim()}
`;
}

export { BLOGS_DIRECTORY };
