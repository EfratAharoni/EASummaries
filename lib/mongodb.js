import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "summariesDB";

let clientPromise;

if (uri) {
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
}

export async function getDb() {
  if (!clientPromise) {
    throw new Error("MONGO_URI is missing in .env.local");
  }

  const client = await clientPromise;
  return client.db(dbName);
}