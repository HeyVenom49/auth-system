import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("Database url missing");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,

  max: 20,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool);
