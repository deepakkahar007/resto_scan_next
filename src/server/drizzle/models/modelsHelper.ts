import { uuid, timestamp, boolean } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();

export const isActive = boolean("is_active").default(true);

export const createdAt = timestamp("created_at").defaultNow();

export const updatedAt = timestamp("updated_at")
  .defaultNow()
  .$onUpdateFn(() => new Date());
