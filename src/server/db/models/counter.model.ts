import { model, models, Schema } from "mongoose";

export const COUNTER_MODEL_NAME = "Counter";

export type CounterDocument = {
  sequenceName: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

const counterSchema = new Schema<CounterDocument>(
  {
    sequenceName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
  },
  {
    collection: "counters",
    timestamps: true,
  },
);

counterSchema.index({ sequenceName: 1 }, { unique: true });

export const CounterModel = models[COUNTER_MODEL_NAME] || model<CounterDocument>(COUNTER_MODEL_NAME, counterSchema);
