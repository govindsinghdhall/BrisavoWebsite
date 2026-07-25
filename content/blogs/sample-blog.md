---
title: "The Complete Sample Blog: Every Markdown Element in One Place"
description: "A reference blog post demonstrating every supported Markdown element — headings, formatting, lists, tables, code, images, FAQs, and more."
date: 2026-07-18
author: BRISΛVO Editorial
category: Engineering
tags:
  - sample blog
  - markdown reference
  - content template
  - brisavo blog
image: /blog/sample-blog/cover.webp
slug: sample-blog
seoTitle: "The Complete Sample Blog: Every Markdown Element in One Place"
seoDescription: "A reference blog post demonstrating every supported Markdown element — headings, formatting, lists, tables, code, images, FAQs, and more."
---

## Introduction

This is the **introduction** section. It shows how *paragraphs* render, along with **bold text**, *italic text*, and `inline code`.

You can write multiple paragraphs inside a single section by separating them with a blank line — exactly like this one.

## Headings

Markdown headings are supported. The section `heading` field above acts as the H2, and you can add sub-headings inside the body:

### This is an H3 sub-heading
Some supporting text under the H3.

#### This is an H4 sub-heading
Even smaller supporting text under the H4.

## Text Formatting

Inline formatting you can use anywhere in the body:

- **Bold** with double asterisks
- *Italic* with single asterisks
- ***Bold and italic*** together
- `inline code` with backticks
- [A link](https://brisavo.com) with standard Markdown syntax

## Bulleted Lists

Unordered lists use hyphens and support nesting:

- First item
- Second item
  - Nested item A
  - Nested item B
- Third item

## Numbered Lists

Ordered lists use numbers and are great for step-by-step instructions:

1. Clone the repository
2. Install dependencies
3. Run the development server
4. Open the browser

## Blockquotes

Blockquotes are useful for callouts and quotes:

> Great software is built by teams who care about the details.
>
> — BRISΛVO Engineering

## Code Block

Fenced code blocks support language hints for syntax highlighting:

```ts
import { getBlogs } from '@/lib/blogs';

const blogs = getBlogs();
console.log(`Loaded ${blogs.length} blogs`);
```

## Table

GitHub-flavored Markdown tables are supported:

| Feature        | Supported | Notes                     |
| -------------- | :-------: | ------------------------- |
| Headings       |    Yes    | H2–H4                     |
| Code blocks    |    Yes    | With language hints       |
| Tables         |    Yes    | GFM syntax                |
| Images         |    Yes    | Stored under /public/blog |

## Image

Images use standard Markdown syntax. Store assets under `/public/blog/<slug>/`:

![Sample cover illustration](/blog/sample-blog/cover.webp)

*Tip: always include descriptive alt text for accessibility and SEO.*

## FAQ

A simple FAQ pattern using bold questions followed by answers:

**Q: How do I create a new blog post?**
A: Duplicate `sample-blog.ts`, update the fields, and register it in `index.ts`.

**Q: Where do images go?**
A: Under `/public/blog/<slug>/`, then reference them with a `/blog/...` path.

**Q: Can I feature more than one post?**
A: You can, but it's recommended to keep a single featured post at a time.

## Conclusion

That's every supported element in one place. To create your next post:

1. Duplicate this file.
2. Update the fields and content.
3. Register it in `src/content/blogs/index.ts`.

Happy writing!
