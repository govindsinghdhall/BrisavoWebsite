import { model, models, Schema } from "mongoose";

import { USER_ROLES } from "@/server/constants";
import type { UserEntity } from "@/types";
import { autoIncrementPlugin } from "../utils";

export const USER_MODEL_NAME = "User";

const refreshTokenSchema = new Schema(
  {
    createdAt: {
      default: Date.now,
      required: true,
      type: Date,
    },
    expiresAt: {
      required: true,
      type: Date,
    },
    tokenHash: {
      required: true,
      select: false,
      type: String,
    },
    tokenId: {
      required: true,
      type: String,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<UserEntity>(
  {
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    isActive: {
      default: true,
      required: true,
      type: Boolean,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
    passwordHash: {
      required: true,
      select: false,
      type: String,
    },
    refreshTokens: {
      default: [],
      select: false,
      type: [refreshTokenSchema],
    },
    role: {
      default: "author",
      enum: USER_ROLES,
      required: true,
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

userSchema.plugin(autoIncrementPlugin, { sequenceName: "users" });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ id: 1 }, { unique: true });
userSchema.index({ role: 1 });

export const UserModel = models[USER_MODEL_NAME] || model<UserEntity>(USER_MODEL_NAME, userSchema);
