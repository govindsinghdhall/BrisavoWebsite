import { BLOG_PUBLISH_STATUSES, DEFAULT_WORDS_PER_MINUTE, MEDIA_TYPES } from "@/server/constants";
import type { BlogPublishStatus, MediaType } from "@/types";

export class BlogValidationError extends Error {
  constructor(
    message: string,
    public readonly details: Record<string, string> = {},
  ) {
    super(message);
    this.name = "BlogValidationError";
  }
}

export function normalizeSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) {
    throw new BlogValidationError("Invalid slug.", { slug: "Slug is required." });
  }

  return slug;
}

export function validateRequiredString(value: unknown, field: string, minLength = 1) {
  if (typeof value !== "string" || value.trim().length < minLength) {
    throw new BlogValidationError(`Invalid ${field}.`, { [field]: `${field} must be at least ${minLength} character(s).` });
  }

  return value.trim();
}

export function validateOptionalUrl(value: unknown, field: string) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new BlogValidationError(`Invalid ${field}.`, { [field]: `${field} must be a URL.` });
  }

  try {
    return new URL(value).toString();
  } catch {
    throw new BlogValidationError(`Invalid ${field}.`, { [field]: `${field} must be a valid URL.` });
  }
}

export function validateIntegerId(value: unknown, field: string) {
  if (!Number.isInteger(value) || Number(value) < 1) {
    throw new BlogValidationError(`Invalid ${field}.`, { [field]: `${field} must be a positive integer ID.` });
  }

  return Number(value);
}

export function validateIntegerIds(value: unknown, field: string) {
  if (!Array.isArray(value)) {
    throw new BlogValidationError(`Invalid ${field}.`, { [field]: `${field} must be an array of integer IDs.` });
  }

  return [...new Set(value.map((item) => validateIntegerId(item, field)))];
}

export function validatePublishStatus(value: unknown): BlogPublishStatus {
  if (typeof value === "string" && BLOG_PUBLISH_STATUSES.includes(value as BlogPublishStatus)) {
    return value as BlogPublishStatus;
  }

  throw new BlogValidationError("Invalid publish status.", {
    status: "Status must be draft, scheduled, published, or archived.",
  });
}

export function validateMediaType(value: unknown): MediaType {
  if (typeof value === "string" && MEDIA_TYPES.includes(value as MediaType)) {
    return value as MediaType;
  }

  throw new BlogValidationError("Invalid media type.", {
    type: "Media type must be image, video, or document.",
  });
}

export function calculateReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / DEFAULT_WORDS_PER_MINUTE));
}

export function validateScheduledPublishing(status: BlogPublishStatus, scheduledFor?: Date) {
  if (status === "scheduled" && !scheduledFor) {
    throw new BlogValidationError("Scheduled posts require a scheduled date.", {
      scheduledFor: "scheduledFor is required when status is scheduled.",
    });
  }

  if (status !== "scheduled" && scheduledFor) {
    throw new BlogValidationError("Only scheduled posts can have a scheduled date.", {
      scheduledFor: "scheduledFor is only allowed when status is scheduled.",
    });
  }
}
