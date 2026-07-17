export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://brisavo.com";

export const SITE_NAME = "BRISΛVO";

export const POSTS_PER_PAGE = 9;

export const CATEGORY_LABELS: Record<string, string> = {
  "ai-automation": "AI & Automation",
  "cloud-infrastructure": "Cloud & Infrastructure",
  "product-engineering": "Product Engineering",
  "real-estate-tech": "Real Estate Tech",
  "company-news": "Company News",
  engineering: "Engineering",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
