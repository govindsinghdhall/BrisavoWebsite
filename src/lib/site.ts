/**
 * Brand entity constants — keep identical across website, social, and listings.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://brosavo.com";

/** Display company name used in UI and SEO titles. */
export const SITE_NAME = "Brosavo";

/** Legal company name for schema / footer. */
export const LEGAL_NAME = "Brosavo Technologies";

export const PRODUCT_NAME = "Brosavo Real Estate CRM";

export const PRODUCT_ONE_LINER =
  "Brosavo Real Estate CRM is an AI-powered CRM that helps real estate agencies manage leads, properties, sales, marketing, automation, and customer relationships from one platform.";

export const COMPANY_DESCRIPTION =
  "Brosavo develops AI-powered software for the real estate industry. Our flagship product, Brosavo Real Estate CRM, helps brokers, builders, developers, and agencies manage leads, automate follow-ups, organize property inventory, and close more deals through one modern cloud platform.";

export const DEFAULT_OG_IMAGE = "/images/og/default-blog.webp";

export const DEFAULT_BLOG_COVER = "/images/blog/real-estate-crm-benefits.webp";

export const BLOG_TITLE_SUFFIX = " | Brosavo Blog";

export const DEFAULT_CTA = {
  heading: "Ready to Grow Your Real Estate Business?",
  text: "Discover how Brosavo Real Estate CRM helps agencies capture more leads, automate follow-ups, manage properties, and close deals faster.",
  primaryLabel: "Book a Free Demo",
  primaryHref: "/contact",
  secondaryLabel: "Explore Brosavo CRM",
  secondaryHref: "/products#real-estate-crm",
} as const;

export const PRODUCT_CTA = {
  heading: "Transform Your Real Estate Business with Brosavo",
  text: "Join modern real estate professionals who use Brosavo to capture more leads, automate follow-ups, manage properties, and close deals faster with an AI-powered CRM built for growth.",
  primaryLabel: "Book a Free Demo",
  primaryHref: "/contact",
  secondaryLabel: "Explore Brosavo Real Estate CRM",
  secondaryHref: "/products#real-estate-crm",
} as const;

export const BLOG_CONTENT_TEMPLATE = `# Introduction

Write a clear opening that defines the topic and why it matters.

## Key Takeaways

- Takeaway one
- Takeaway two
- Takeaway three

## What is ______?

Give a direct definition near the top.

## Why it Matters

Explain the business impact.

## Benefits

- Benefit one
- Benefit two
- Benefit three

## Features

Describe the most important capabilities.

## How it Works

Explain the workflow in plain language.

## Step-by-Step Guide

1. Step one
2. Step two
3. Step three

## Best Practices

Share practical recommendations.

## Common Mistakes

List mistakes to avoid.

## Comparison Table

| Option | Best For | Key Advantage |
| ------ | -------- | ------------- |
| Option A | Teams | Advantage |
| Option B | Solo agents | Advantage |

## Industry Statistics

- Stat one (Source)
- Stat two (Source)

## Frequently Asked Questions

### Question one?

Answer one.

### Question two?

Answer two.

## Conclusion

Summarize the main points and reinforce the primary keyword.

## Call to Action

Invite readers to book a demo or explore Brosavo Real Estate CRM.
`;
