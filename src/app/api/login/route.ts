import { NextResponse } from "next/server";
import {
  BLOG_ADMIN_COOKIE,
  blogAdminCookieOptions,
  createBlogAdminToken,
  verifyBlogAdminPassword,
} from "@/lib/blog-auth";
import { loginSchema } from "@/lib/blog-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request" },
        { status: 400 }
      );
    }

    if (!(await verifyBlogAdminPassword(parsed.data.password))) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await createBlogAdminToken();
    const response = NextResponse.json({ success: true });
    const secure =
      process.env.NODE_ENV === "production" ||
      request.url.startsWith("https://");

    response.cookies.set(
      BLOG_ADMIN_COOKIE,
      token,
      blogAdminCookieOptions(secure)
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Unable to process login" },
      { status: 500 }
    );
  }
}
