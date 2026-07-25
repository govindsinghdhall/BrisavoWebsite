import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached = globalForMongoose.mongooseCache ??= {
  connection: null,
  promise: null,
};

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI. Add it to your environment before connecting to MongoDB.");
  }

  return uri;
}

export async function connectToDatabase() {
  if (cached.connection) {
    return cached.connection;
  }

  cached.promise ??= mongoose.connect(getMongoUri(), {
    bufferCommands: false,
    dbName: process.env.MONGODB_DB || undefined,
  });

  cached.connection = await cached.promise;
  return cached.connection;
}

export async function disconnectFromDatabase() {
  if (!cached.connection) {
    return;
  }

  await mongoose.disconnect();
  cached.connection = null;
  cached.promise = null;
}

export function getDatabaseConnection() {
  return cached.connection;
}

export function getDatabaseConnectionState() {
  return mongoose.connection.readyState;
}

export function isDatabaseConnected() {
  return getDatabaseConnectionState() === 1;
}
