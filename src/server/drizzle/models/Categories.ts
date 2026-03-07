import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, isActive } from "./modelsHelper";
import { RestaurentProfileTable } from "./RestaurentProfileTable";

export const CategoriesTable = pgTable("categories", {
  id,

  category: varchar().notNull(),
  logo_url: varchar().notNull(),
  bestseller: boolean().default(false),
  is_new: boolean().default(false),

  restaurent_id: uuid()
    .notNull()
    .references(() => RestaurentProfileTable.id, { onDelete: "cascade" }),

  isActive,
  createdAt,
  updatedAt,
});

export type SelectCategoriesTableType = typeof CategoriesTable.$inferSelect;
export type InsertCategoriesTableType = typeof CategoriesTable.$inferInsert;
