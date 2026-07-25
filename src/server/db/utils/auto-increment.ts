import type { Schema } from "mongoose";

import { getNextSequence } from "./sequences";

export type AutoIncrementPluginOptions = {
  field?: string;
  sequenceName: string;
};

type PrivateMongooseFields = {
  __v?: number;
  _id?: unknown;
};

function removePrivateMongooseFields<T extends PrivateMongooseFields>(returnedObject: T) {
  delete returnedObject._id;
  delete returnedObject.__v;
  return returnedObject;
}

export function autoIncrementPlugin(schema: Schema, options: AutoIncrementPluginOptions) {
  const field = options.field ?? "id";

  schema.add({
    [field]: {
      type: Number,
      immutable: true,
      index: true,
      required: true,
      unique: true,
    },
  });

  schema.pre("validate", async function assignAutoIncrementId() {
    if (!this.isNew || this.get(field)) {
      return;
    }

    this.set(field, await getNextSequence(options.sequenceName));
  });

  schema.set("toJSON", {
    transform: (_document, returnedObject) => {
      return removePrivateMongooseFields(returnedObject);
    },
    virtuals: true,
  });

  schema.set("toObject", {
    transform: (_document, returnedObject) => {
      return removePrivateMongooseFields(returnedObject);
    },
    virtuals: true,
  });
}
