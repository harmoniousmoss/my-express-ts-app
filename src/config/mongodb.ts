// src/config/mongodb.ts

import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME!;
const client = new MongoClient(uri);

let db: Db;

/**
 * Establishes a single MongoDB connection and caches the Db instance.
 */
export async function connectToDatabase(): Promise<void> {
  if (db) return; // already connected

  await client.connect();
  db = client.db(dbName);
  console.log("✅  Connected to MongoDB Atlas");
}

/**
 * Returns a typed Collection<T>; throws if DB isn't initialized.
 * Constrains T to extend MongoDB's Document type.
 * @param name  Name of the MongoDB collection
 */
export function getCollection<T extends Document>(name: string): Collection<T> {
  if (!db) {
    throw new Error("MongoDB not initialized. Call connectToDatabase() first.");
  }
  return db.collection<T>(name);
}
