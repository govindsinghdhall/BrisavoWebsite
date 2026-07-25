import bcrypt from "bcrypt";

import { PASSWORD_HASH_ROUNDS } from "@/server/constants";

export function hashPassword(password: string) {
  return bcrypt.hash(password, PASSWORD_HASH_ROUNDS);
}

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function hashToken(token: string) {
  return bcrypt.hash(token, PASSWORD_HASH_ROUNDS);
}

export function verifyTokenHash(token: string, tokenHash: string) {
  return bcrypt.compare(token, tokenHash);
}
