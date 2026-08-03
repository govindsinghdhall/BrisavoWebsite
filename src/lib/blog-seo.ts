import type { AuthorProfile } from "@/lib/authors";
import {
  COMPANY_DESCRIPTION,
  LEGAL_NAME,
  PRODUCT_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import type { BlogFaq, BlogPost, TocHeading } from "@/types/blog";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildArticleJsonLd(
  post: BlogPost,
  author: AuthorProfile
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.description,
    image: [absoluteUrl(post.image)],
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      url: author.website || SITE_URL,
      sameAs: [author.linkedin, author.website].filter(Boolean),
    },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.trim().split(/\s+/).filter(Boolean).length,
    about: {
      "@type": "SoftwareApplication",
      name: PRODUCT_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function buildFaqJsonLd(faqs: BlogFaq[]) {
  if (!faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    description: COMPANY_DESCRIPTION,
  };
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(markdown: string): TocHeading[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[#*_`]/g, "").trim();
    if (!text) continue;

    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    const id = count > 0 ? `${base}-${count}` : base;
    seen.set(base, count + 1);
    headings.push({ id, text, level });
  }

  return headings;
}

export function extractFaqsFromMarkdown(markdown: string): BlogFaq[] {
  const faqIndex = markdown.search(/^##\s+Frequently Asked Questions\s*$/im);
  if (faqIndex === -1) return [];

  const section = markdown.slice(faqIndex).split(/\n##\s+/)[0] ?? "";
  const faqs: BlogFaq[] = [];
  const qaRegex = /###\s+(.+?)\n+([\s\S]*?)(?=\n###\s+|\n##\s+|$)/g;
  let match: RegExpExecArray | null;

  while ((match = qaRegex.exec(section)) !== null) {
    const question = match[1].trim().replace(/\?$/, "") + "?";
    const answer = match[2].trim().replace(/\n+/g, " ");
    if (question && answer) faqs.push({ question, answer });
  }

  return faqs;
}

export function extractKeyTakeawaysFromMarkdown(markdown: string): string[] {
  const index = markdown.search(/^##\s+Key Takeaways\s*$/im);
  if (index === -1) return [];

  const section = markdown.slice(index).split(/\n##\s+/)[0] ?? "";
  return section
    .split("\n")
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(
      (line) =>
        Boolean(line) &&
        !/^##\s+Key Takeaways$/i.test(line) &&
        !line.startsWith("#")
    );
}

export function stripMarkdownSection(
  markdown: string,
  heading: string
): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `^##\\s+${escaped}\\s*\\n[\\s\\S]*?(?=^##\\s+|$)`,
    "im"
  );
  return markdown.replace(regex, "").replace(/\n{3,}/g, "\n\n").trim();
}
