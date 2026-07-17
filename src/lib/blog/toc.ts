export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractToc(content: string): TocHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[#*_`]/g, "").trim();
    if (!text) continue;

    let id = slugify(text);
    const count = seen.get(id) ?? 0;
    if (count > 0) {
      id = `${id}-${count}`;
    }
    seen.set(slugify(text), count + 1);

    headings.push({ id, text, level });
  }

  return headings;
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
