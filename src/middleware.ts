import { type NextRequest, NextResponse } from "next/server";
import { BLOG_ADMIN_COOKIE, verifyBlogAdminToken } from "@/lib/blog-auth";
import { AUTH_COOKIE_NAMES } from "@/server/constants/auth";

type MiddlewareJwtPayload = {
  exp?: number;
  type?: string;
};

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function verifyAccessToken(token: string) {
  const secret = process.env.JWT_SECRET;
  const [header, payload, signature] = token.split(".");

  if (!secret || !header || !payload || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["verify"]
  );
  const isValidSignature = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(`${header}.${payload}`)
  );

  if (!isValidSignature) {
    return false;
  }

  const tokenPayload = JSON.parse(
    new TextDecoder().decode(base64UrlToBytes(payload))
  ) as MiddlewareJwtPayload;

  return (
    tokenPayload.type === "access" &&
    Boolean(tokenPayload.exp) &&
    tokenPayload.exp! > Math.floor(Date.now() / 1000)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isBlogAdminPage = pathname.startsWith("/admin");
  const isBlogPublishApi = pathname.startsWith("/api/blog");
  const isLegacyAdminApi =
    pathname.startsWith("/api/admin") || pathname.startsWith("/api/protected");

  if (isBlogAdminPage || isBlogPublishApi) {
    const blogSession = request.cookies.get(BLOG_ADMIN_COOKIE)?.value;
    if (await verifyBlogAdminToken(blogSession)) {
      return NextResponse.next();
    }

    if (isBlogPublishApi) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/authentication", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLegacyAdminApi) {
    const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;
    if (accessToken && (await verifyAccessToken(accessToken))) {
      return NextResponse.next();
    }
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/blog/:path*",
    "/api/admin/:path*",
    "/api/protected/:path*",
  ],
};
