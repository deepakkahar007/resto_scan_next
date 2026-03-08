// import postgres from "postgres";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env/envSchema";
import * as schema from "./models";
import * as relations from "./models/relations";

// const client = postgres(env.DATABASE_URL);
const client = neon(env.NEON_DATABASE_URI);

export const db = drizzle({ client, schema, relations });
