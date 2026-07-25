import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const publishBlogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(2, "Category is required"),
  author: z.string().min(2, "Author is required"),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  image: z.string().min(1, "Image URL is required"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  markdown: z.string().min(20, "Markdown content is required"),
});

export type PublishBlogInput = z.infer<typeof publishBlogSchema>;

export const publishBlogFormSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(2, "Category is required"),
  author: z.string().min(2, "Author is required"),
  tags: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  markdown: z.string().min(20, "Markdown content is required"),
});

export type PublishBlogFormValues = z.infer<typeof publishBlogFormSchema>;

export function normalizeTagsInput(
  tags: string | string[] | undefined
): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean);
  }
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
