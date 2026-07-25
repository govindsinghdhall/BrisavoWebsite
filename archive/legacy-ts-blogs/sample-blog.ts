import type { Blog } from "@/types/blog";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO CREATE A NEW BLOG POST
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1. DUPLICATE this file inside `src/content/blogs/`, e.g.
 *      cp src/content/blogs/sample-blog.ts src/content/blogs/my-new-post.ts
 *
 * 2. RENAME the exported constant to something unique, e.g.
 *      export const myNewPost: Blog = { ... }
 *    (Keep it `camelCase` and matching the file name for consistency.)
 *
 * 3. UPDATE every field:
 *      - `slug` MUST be unique and URL-safe (lowercase, hyphen-separated).
 *      - `publishedAt` / `updatedAt` use ISO dates: "YYYY-MM-DD".
 *      - `coverImage` should live at `/public/blog/<slug>/cover.webp`.
 *      - `featured` should be `true` for only ONE post at a time.
 *
 * 4. WRITE your content as an array of `{ heading, body }` sections.
 *      `body` is Markdown — see the sections below for every supported element.
 *
 * 5. REGISTER the post in `src/content/blogs/index.ts` by importing it and
 *    adding it to the exported `blogs` array.
 *
 * That's it — the helper functions in `src/lib/blogs.ts` will pick it up.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const sampleBlog: Blog = {
  slug: "sample-blog",
  title: "The Complete Sample Blog: Every Markdown Element in One Place",
  description:
    "A reference blog post demonstrating every supported Markdown element — headings, formatting, lists, tables, code, images, FAQs, and more.",
  excerpt:
    "Use this post as a template. It shows exactly how to structure content sections and which Markdown features are supported.",
  author: {
    name: "BRISΛVO Editorial",
    role: "Content Team",
    avatar: "/blog/authors/editorial.png",
  },
  category: "Engineering",
  publishedAt: "2026-07-18",
  updatedAt: "2026-07-18",
  coverImage: "/blog/sample-blog/cover.webp",
  featured: true,
  keywords: [
    "sample blog",
    "markdown reference",
    "content template",
    "brisavo blog",
  ],
  content: [
    {
      heading: "Introduction",
      body: [
        "This is the **introduction** section. It shows how *paragraphs* render, along with **bold text**, *italic text*, and `inline code`.",
        "",
        "You can write multiple paragraphs inside a single section by separating them with a blank line — exactly like this one.",
      ].join("\n"),
    },
    {
      heading: "Headings",
      body: [
        "Markdown headings are supported. The section `heading` field above acts as the H2, and you can add sub-headings inside the body:",
        "",
        "### This is an H3 sub-heading",
        "Some supporting text under the H3.",
        "",
        "#### This is an H4 sub-heading",
        "Even smaller supporting text under the H4.",
      ].join("\n"),
    },
    {
      heading: "Text Formatting",
      body: [
        "Inline formatting you can use anywhere in the body:",
        "",
        "- **Bold** with double asterisks",
        "- *Italic* with single asterisks",
        "- ***Bold and italic*** together",
        "- `inline code` with backticks",
        "- [A link](https://brisavo.com) with standard Markdown syntax",
      ].join("\n"),
    },
    {
      heading: "Bulleted Lists",
      body: [
        "Unordered lists use hyphens and support nesting:",
        "",
        "- First item",
        "- Second item",
        "  - Nested item A",
        "  - Nested item B",
        "- Third item",
      ].join("\n"),
    },
    {
      heading: "Numbered Lists",
      body: [
        "Ordered lists use numbers and are great for step-by-step instructions:",
        "",
        "1. Clone the repository",
        "2. Install dependencies",
        "3. Run the development server",
        "4. Open the browser",
      ].join("\n"),
    },
    {
      heading: "Blockquotes",
      body: [
        "Blockquotes are useful for callouts and quotes:",
        "",
        "> Great software is built by teams who care about the details.",
        ">",
        "> — BRISΛVO Engineering",
      ].join("\n"),
    },
    {
      heading: "Code Block",
      body: [
        "Fenced code blocks support language hints for syntax highlighting:",
        "",
        "```ts",
        "import { getBlogs } from '@/lib/blogs';",
        "",
        "const blogs = getBlogs();",
        "console.log(`Loaded ${blogs.length} blogs`);",
        "```",
      ].join("\n"),
    },
    {
      heading: "Table",
      body: [
        "GitHub-flavored Markdown tables are supported:",
        "",
        "| Feature        | Supported | Notes                     |",
        "| -------------- | :-------: | ------------------------- |",
        "| Headings       |    Yes    | H2–H4                     |",
        "| Code blocks    |    Yes    | With language hints       |",
        "| Tables         |    Yes    | GFM syntax                |",
        "| Images         |    Yes    | Stored under /public/blog |",
      ].join("\n"),
    },
    {
      heading: "Image",
      body: [
        "Images use standard Markdown syntax. Store assets under `/public/blog/<slug>/`:",
        "",
        "![Sample cover illustration](/blog/sample-blog/cover.webp)",
        "",
        "*Tip: always include descriptive alt text for accessibility and SEO.*",
      ].join("\n"),
    },
    {
      heading: "FAQ",
      body: [
        "A simple FAQ pattern using bold questions followed by answers:",
        "",
        "**Q: How do I create a new blog post?**",
        "A: Duplicate `sample-blog.ts`, update the fields, and register it in `index.ts`.",
        "",
        "**Q: Where do images go?**",
        "A: Under `/public/blog/<slug>/`, then reference them with a `/blog/...` path.",
        "",
        "**Q: Can I feature more than one post?**",
        "A: You can, but it's recommended to keep a single featured post at a time.",
      ].join("\n"),
    },
    {
      heading: "Conclusion",
      body: [
        "That's every supported element in one place. To create your next post:",
        "",
        "1. Duplicate this file.",
        "2. Update the fields and content.",
        "3. Register it in `src/content/blogs/index.ts`.",
        "",
        "Happy writing!",
      ].join("\n"),
    },
  ],
};
