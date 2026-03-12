// development
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// production
// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env/envSchema";
import { relations } from "./models/relations";
import * as schema from "./models";

const client = neon(env.NEON_DATABASE_URI);
// const client = postgres(env.DATABASE_URL);

export const db = drizzle({ client, schema, relations });
