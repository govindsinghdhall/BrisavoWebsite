import { AUTH_TOKEN_EXPIRY_SECONDS } from "@/server/constants";
import { connectToDatabase } from "@/server/db";
import type { LoginInput, RegisterInput } from "@/server/validators";
import type { AuthTokenPayload, PublicUser, RefreshTokenRecord, UserEntity } from "@/types";
import { userRepository, type UserRepository } from "../repositories";
import {
  createTokenId,
  hashPassword,
  hashToken,
  signAccessToken,
  signRefreshToken,
  toPublicUser,
  verifyJwt,
  verifyPassword,
  verifyTokenHash,
} from "../utils";

export class AuthenticationError extends Error {
  constructor(message = "Invalid authentication credentials.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message = "You are not allowed to perform this action.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: PublicUser;
};

export class AuthService {
  constructor(private readonly users: UserRepository = userRepository) {}

  async register(input: RegisterInput): Promise<AuthSession> {
    await connectToDatabase();

    const existingUser = await this.users.findByEmail(input.email);

    if (existingUser) {
      throw new AuthenticationError("A user with this email already exists.");
    }

    const user = await this.users.create({
      email: input.email,
      isActive: true,
      name: input.name,
      passwordHash: await hashPassword(input.password),
      refreshTokens: [],
      role: input.role ?? "author",
    });

    if (!user) {
      throw new Error("Unable to create user.");
    }

    return this.createSession(user);
  }

  async login(input: LoginInput): Promise<AuthSession> {
    await connectToDatabase();

    const user = await this.users.findByEmailWithSecrets(input.email);

    if (!user || !user.isActive) {
      throw new AuthenticationError();
    }

    const isValidPassword = await verifyPassword(input.password, user.passwordHash);

    if (!isValidPassword) {
      throw new AuthenticationError();
    }

    await this.users.revokeExpiredRefreshTokens(user.id);
    return this.createSession(user);
  }

  async refresh(refreshToken: string): Promise<AuthSession> {
    await connectToDatabase();

    const payload = verifyJwt(refreshToken);

    if (payload.type !== "refresh" || !payload.tokenId) {
      throw new AuthenticationError("Invalid refresh token.");
    }

    const user = await this.users.findByIdWithSecrets(payload.sub);

    if (!user || !user.isActive) {
      throw new AuthenticationError();
    }

    const storedToken = await this.findMatchingRefreshToken(refreshToken, payload.tokenId, user.refreshTokens);

    if (!storedToken) {
      throw new AuthenticationError("Refresh token has been revoked.");
    }

    await this.users.revokeRefreshToken(user.id, storedToken.tokenId);
    await this.users.revokeExpiredRefreshTokens(user.id);

    return this.createSession(user);
  }

  async logout(refreshToken?: string) {
    await connectToDatabase();

    if (!refreshToken) {
      return;
    }

    try {
      const payload = verifyJwt(refreshToken);

      if (payload.type === "refresh" && payload.tokenId) {
        await this.users.revokeRefreshToken(payload.sub, payload.tokenId);
      }
    } catch {
      return;
    }
  }

  async getAuthenticatedUser(accessToken?: string) {
    await connectToDatabase();

    if (!accessToken) {
      throw new AuthenticationError("Missing access token.");
    }

    const payload = verifyJwt(accessToken);

    if (payload.type !== "access") {
      throw new AuthenticationError("Invalid access token.");
    }

    const user = await this.users.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new AuthenticationError();
    }

    return toPublicUser(user);
  }

  private async createSession(user: UserEntity): Promise<AuthSession> {
    const tokenId = createTokenId();
    const tokenPayload: Omit<AuthTokenPayload, "type"> = {
      email: user.email,
      role: user.role,
      sub: user.id,
      tokenId,
    };
    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);
    const expiresAt = new Date(Date.now() + AUTH_TOKEN_EXPIRY_SECONDS.refresh * 1000);

    await this.users.addRefreshToken(user.id, tokenId, await hashToken(refreshToken), expiresAt);

    return {
      accessToken,
      refreshToken,
      user: toPublicUser(user),
    };
  }

  private async findMatchingRefreshToken(refreshToken: string, tokenId: string, tokens: RefreshTokenRecord[]) {
    const candidate = tokens.find((token) => token.tokenId === tokenId && token.expiresAt > new Date());

    if (!candidate) {
      return null;
    }

    return (await verifyTokenHash(refreshToken, candidate.tokenHash)) ? candidate : null;
  }
}

export const authService = new AuthService();
