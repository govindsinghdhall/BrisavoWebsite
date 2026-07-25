import { USER_ROLES } from "@/server/constants";
import type { UserRole } from "@/types";

export type RegisterInput = {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
};

export type LoginInput = {
  email: string;
  password: string;
};

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly details: Record<string, string> = {},
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

function assertObject(value: unknown): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError("Invalid request body.");
  }
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") {
    throw new ValidationError("Invalid email.", { email: "Email is required." });
  }

  const email = value.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ValidationError("Invalid email.", { email: "Enter a valid email address." });
  }

  return email;
}

function normalizePassword(value: unknown) {
  if (typeof value !== "string" || value.length < 8) {
    throw new ValidationError("Invalid password.", { password: "Password must be at least 8 characters." });
  }

  return value;
}

function normalizeName(value: unknown) {
  if (typeof value !== "string" || value.trim().length < 2) {
    throw new ValidationError("Invalid name.", { name: "Name must be at least 2 characters." });
  }

  return value.trim();
}

function normalizeRole(value: unknown): UserRole | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string" && USER_ROLES.includes(value as UserRole)) {
    return value as UserRole;
  }

  throw new ValidationError("Invalid role.", { role: "Role must be admin, editor, or author." });
}

export function validateRegisterInput(value: unknown): RegisterInput {
  assertObject(value);

  return {
    email: normalizeEmail(value.email),
    name: normalizeName(value.name),
    password: normalizePassword(value.password),
    role: normalizeRole(value.role),
  };
}

export function validateLoginInput(value: unknown): LoginInput {
  assertObject(value);

  return {
    email: normalizeEmail(value.email),
    password: normalizePassword(value.password),
  };
}
