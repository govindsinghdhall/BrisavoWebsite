export const USER_ROLES = ["admin", "editor", "author"] as const;

export const AUTH_COOKIE_NAMES = {
  accessToken: "brisavo_access_token",
  refreshToken: "brisavo_refresh_token",
} as const;

export const AUTH_TOKEN_EXPIRY_SECONDS = {
  access: 15 * 60,
  refresh: 30 * 24 * 60 * 60,
} as const;

export const PASSWORD_HASH_ROUNDS = 12;
