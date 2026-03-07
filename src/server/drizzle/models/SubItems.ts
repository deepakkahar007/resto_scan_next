import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, isActive } from "./modelsHelper";
import { ItemsTable } from "./ItemsTable";

export const SubItemsTable = pgTable("sub_items", {
  id,

  sub_item_title: varchar().notNull(),
  size: varchar().notNull(),
  price: integer().notNull(),

  item_id: uuid()
    .notNull()
    .references(() => ItemsTable.id),

  isActive,
  createdAt,
  updatedAt,
});

export type SelectSubItemsTableType = typeof SubItemsTable.$inferSelect;
export type InsertSubItemsTableType = typeof SubItemsTable.$inferInsert;
