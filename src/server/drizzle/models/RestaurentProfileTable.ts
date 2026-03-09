import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, isActive } from "./modelsHelper";

export const RestaurentProfileTable = pgTable(
  "restaurent_profile",
  {
    id,

    name: varchar().notNull(),
    description: varchar().notNull(),
    cuisine_type: varchar().array().notNull(),
    logo_url: varchar().notNull(),
    cover_image_url: varchar(),
    available_tables: integer().notNull(),
    userId: text().notNull(),

    isActive,
    createdAt,
    updatedAt,
  },
  (t) => [uniqueIndex("unique_user_id").on(t.userId)],
);

export type SelectRestaurentProfileTableType =
  typeof RestaurentProfileTable.$inferSelect;
export type InsertRestaurentProfileTableType =
  typeof RestaurentProfileTable.$inferInsert;
