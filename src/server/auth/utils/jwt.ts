import { createHmac, randomUUID, timingSafeEqual } from "crypto";

import { AUTH_TOKEN_EXPIRY_SECONDS } from "@/server/constants";
import type { AuthTokenPayload } from "@/types";

type JwtHeader = {
  alg: "HS256";
  typ: "JWT";
};

export type SignedJwtPayload = AuthTokenPayload & {
  exp: number;
  iat: number;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET. Add it to your environment before using authentication.");
  }

  return secret;
}

function base64UrlEncode(value: Buffer | string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlJson(value: unknown) {
  return base64UrlEncode(JSON.stringify(value));
}

function sign(data: string) {
  return createHmac("sha256", getJwtSecret()).update(data).digest("base64url");
}

export function createTokenId() {
  return randomUUID();
}

export function signJwt(payload: AuthTokenPayload, expiresInSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const header: JwtHeader = {
    alg: "HS256",
    typ: "JWT",
  };
  const body: SignedJwtPayload = {
    ...payload,
    exp: now + expiresInSeconds,
    iat: now,
  };
  const data = `${base64UrlJson(header)}.${base64UrlJson(body)}`;

  return `${data}.${sign(data)}`;
}

export function signAccessToken(payload: Omit<AuthTokenPayload, "type">) {
  return signJwt({ ...payload, type: "access" }, AUTH_TOKEN_EXPIRY_SECONDS.access);
}

export function signRefreshToken(payload: Omit<AuthTokenPayload, "type">) {
  return signJwt({ ...payload, type: "refresh" }, AUTH_TOKEN_EXPIRY_SECONDS.refresh);
}

export function verifyJwt(token: string): SignedJwtPayload {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("Invalid token.");
  }

  const data = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = sign(data);
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error("Invalid token signature.");
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SignedJwtPayload;

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired.");
  }

  return payload;
}
