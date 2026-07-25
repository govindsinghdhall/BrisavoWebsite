import type { PublicUser, UserEntity } from "@/types";

export function toPublicUser(user: UserEntity): PublicUser {
  return {
    createdAt: user.createdAt,
    email: user.email,
    id: user.id,
    isActive: user.isActive,
    name: user.name,
    role: user.role,
    updatedAt: user.updatedAt,
  };
}
