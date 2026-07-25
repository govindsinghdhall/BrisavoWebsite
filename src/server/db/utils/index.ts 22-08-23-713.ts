export * from "./auto-increment";
export * from "./filters";
export * from "./sequences";

import { Types } from "mongoose";

export function createDatabaseId() {
  return new Types.ObjectId().toHexString();
}

export function isValidDatabaseId(value: string) {
  return Types.ObjectId.isValid(value);
}
