import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { BLOG_ADMIN_COOKIE, verifyBlogAdminToken } from "@/lib/blog-auth";
import {
  blogFileExists,
  buildMarkdownDocument,
} from "@/lib/blogs";
import {
  normalizeTagsInput,
  publishBlogSchema,
} from "@/lib/blog-schema";
import { GitHubPublishError, publishBlogToGitHub } from "@/lib/github";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(BLOG_ADMIN_COOKIE)?.value;

    if (!(await verifyBlogAdminToken(session))) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = publishBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Validation failed",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const slug = slugify(data.slug, { lower: true, strict: true });
    const tags = normalizeTagsInput(data.tags);
    const date = new Date().toISOString().slice(0, 10);

    if (blogFileExists(slug)) {
      return NextResponse.json(
        { error: `A blog with slug "${slug}" already exists.` },
        { status: 409 }
      );
    }

    const markdown = buildMarkdownDocument({
      title: data.title.trim(),
      description: data.description.trim(),
      date,
      author: data.author.trim(),
      category: data.category.trim(),
      tags,
      image: data.image.trim(),
      slug,
      seoTitle: data.seoTitle?.trim() || data.title.trim(),
      seoDescription: data.seoDescription?.trim() || data.description.trim(),
      markdown: data.markdown,
    });

    const result = await publishBlogToGitHub({
      slug,
      title: data.title.trim(),
      markdown,
    });

    return NextResponse.json({
      success: true,
      slug,
      path: result.path,
      commitSha: result.commitSha,
      url: `/blog/${slug}`,
    });
  } catch (error) {
    if (error instanceof GitHubPublishError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Failed to publish blog" },
      { status: 500 }
    );
  }
}
