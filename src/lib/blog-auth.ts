export const BLOG_ADMIN_COOKIE = "blog_admin_session";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const TOKEN_MESSAGE = "brisavo-blog-admin-v1";

function getPassword(): string {
  const password = process.env.BLOG_ADMIN_PASSWORD;
  if (!password) {
    throw new Error("BLOG_ADMIN_PASSWORD is not configured.");
  }
  return password;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function hmacSha256(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return toHex(signature);
}

/** Deterministic session token derived from the admin password. */
export async function createBlogAdminToken(): Promise<string> {
  return hmacSha256(getPassword(), TOKEN_MESSAGE);
}

export async function verifyBlogAdminToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  try {
    const expected = await createBlogAdminToken();
    return timingSafeEqualString(token, expected);
  } catch {
    return false;
  }
}

export async function verifyBlogAdminPassword(
  password: string
): Promise<boolean> {
  try {
    return timingSafeEqualString(password, getPassword());
  } catch {
    return false;
  }
}

export function blogAdminCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}
