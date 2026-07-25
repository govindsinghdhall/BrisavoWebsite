import type { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAMES, AUTH_TOKEN_EXPIRY_SECONDS } from "@/server/constants";

const isProduction = process.env.NODE_ENV === "production";

export function getAccessTokenCookie(request: NextRequest) {
  return request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;
}

export function getRefreshTokenCookie(request: NextRequest) {
  return request.cookies.get(AUTH_COOKIE_NAMES.refreshToken)?.value;
}

export function setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set(AUTH_COOKIE_NAMES.accessToken, accessToken, {
    httpOnly: true,
    maxAge: AUTH_TOKEN_EXPIRY_SECONDS.access,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });

  response.cookies.set(AUTH_COOKIE_NAMES.refreshToken, refreshToken, {
    httpOnly: true,
    maxAge: AUTH_TOKEN_EXPIRY_SECONDS.refresh,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });

  return response;
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAMES.accessToken, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });

  response.cookies.set(AUTH_COOKIE_NAMES.refreshToken, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });

  return response;
}
