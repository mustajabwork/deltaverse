import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/delta-journal";

if (!MONGO_URI) {
  throw new Error(
    "🔴Please define the MONGO_URI environment variable inside .env"
  );
}

/**
 * Next.js hot-reload-safe mongoose connection.
 * Stores connection promise on globalThis to avoid multiple connections.
 */
let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // other options here if needed
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
