import { connectToDatabase } from "../config";
import { CounterModel } from "../models";

export async function getNextSequence(sequenceName: string) {
  await connectToDatabase();

  const counter = await CounterModel.findOneAndUpdate(
    { sequenceName },
    { $inc: { value: 1 } },
    {
      new: true,
      projection: { _id: 0, value: 1 },
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  )
    .lean<{ value: number }>()
    .exec();

  if (!counter) {
    throw new Error(`Unable to generate sequence for "${sequenceName}".`);
  }

  return counter.value;
}
