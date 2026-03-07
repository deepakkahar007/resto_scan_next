import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, isActive } from "./modelsHelper";
import { RestaurentProfileTable } from "./RestaurentProfileTable";
import { CategoriesTable } from "./Categories";

export const ItemsTable = pgTable("items", {
  id,

  title: varchar().notNull(),
  discription: varchar().notNull(),
  cuisine_type: varchar(),
  price: integer().notNull(),

  restaurent_id: uuid()
    .notNull()
    .references(() => RestaurentProfileTable.id, { onDelete: "cascade" }),

  categories_id: uuid()
    .notNull()
    .references(() => CategoriesTable.id, { onDelete: "cascade" }),

  isActive,
  createdAt,
  updatedAt,
});

export type SelectItemsTableType = typeof ItemsTable.$inferSelect;
export type InsertItemsTableType = typeof ItemsTable.$inferInsert;
