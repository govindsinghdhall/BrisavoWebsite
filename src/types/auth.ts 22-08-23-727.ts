import type { USER_ROLES } from "@/server/constants";
import type { EntityWithIntegerId, TimestampedEntity } from "./database";

export type UserRole = (typeof USER_ROLES)[number];

export type RefreshTokenRecord = {
  createdAt: Date;
  expiresAt: Date;
  tokenHash: string;
  tokenId: string;
};

export type UserEntity = EntityWithIntegerId &
  TimestampedEntity & {
    email: string;
    isActive: boolean;
    name: string;
    passwordHash: string;
    refreshTokens: RefreshTokenRecord[];
    role: UserRole;
  };

export type PublicUser = Omit<UserEntity, "passwordHash" | "refreshTokens">;

export type AuthTokenPayload = {
  email: string;
  role: UserRole;
  sub: number;
  tokenId?: string;
  type: "access" | "refresh";
};
