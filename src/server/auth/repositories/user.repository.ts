import type { QueryFilter } from "mongoose";

import { UserModel } from "@/server/db/models";
import { BaseRepository } from "@/server/db/repositories";
import type { UserEntity } from "@/types";

export class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserModel);
  }

  findByEmail(email: string) {
    return this.findOne({ email: email.toLowerCase() } as QueryFilter<UserEntity>);
  }

  async findByEmailWithSecrets(email: string) {
    const document = await UserModel.findOne({ email: email.toLowerCase() })
      .select("+passwordHash +refreshTokens")
      .lean<UserEntity>()
      .exec();

    return this.serialize(document);
  }

  async findByIdWithSecrets(id: number) {
    const document = await UserModel.findOne({ id }).select("+passwordHash +refreshTokens").lean<UserEntity>().exec();
    return this.serialize(document);
  }

  async addRefreshToken(userId: number, tokenId: string, tokenHash: string, expiresAt: Date) {
    const document = await UserModel.findOneAndUpdate(
      { id: userId },
      {
        $push: {
          refreshTokens: {
            createdAt: new Date(),
            expiresAt,
            tokenHash,
            tokenId,
          },
        },
      },
      {
        new: true,
        projection: this.privateProjection,
        runValidators: true,
      },
    )
      .lean<UserEntity>()
      .exec();

    return this.serialize(document);
  }

  async revokeRefreshToken(userId: number, tokenId: string) {
    await UserModel.updateOne(
      { id: userId },
      {
        $pull: {
          refreshTokens: { tokenId },
        },
      },
    ).exec();
  }

  async revokeExpiredRefreshTokens(userId: number) {
    await UserModel.updateOne(
      { id: userId },
      {
        $pull: {
          refreshTokens: {
            expiresAt: {
              $lte: new Date(),
            },
          },
        },
      },
    ).exec();
  }

  async revokeAllRefreshTokens(userId: number) {
    await UserModel.updateOne({ id: userId }, { $set: { refreshTokens: [] } }).exec();
  }
}

export const userRepository = new UserRepository();
