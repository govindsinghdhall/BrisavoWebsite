import type { PublicUser, UserRole } from "@/types";
import { AuthenticationError, AuthorizationError } from "../services";

const ROLE_RANK: Record<UserRole, number> = {
  admin: 3,
  editor: 2,
  author: 1,
};

export function requireAuthenticatedUser(user: PublicUser | null | undefined): PublicUser {
  if (!user) {
    throw new AuthenticationError("Authentication required.");
  }

  return user;
}

export function requireRole(user: PublicUser | null | undefined, roles: UserRole[]) {
  const authenticatedUser = requireAuthenticatedUser(user);

  if (!roles.includes(authenticatedUser.role)) {
    throw new AuthorizationError();
  }

  return authenticatedUser;
}

export function requireMinimumRole(user: PublicUser | null | undefined, role: UserRole) {
  const authenticatedUser = requireAuthenticatedUser(user);

  if (ROLE_RANK[authenticatedUser.role] < ROLE_RANK[role]) {
    throw new AuthorizationError();
  }

  return authenticatedUser;
}
