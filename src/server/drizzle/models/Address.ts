import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, isActive } from "./modelsHelper";
import { RestaurentProfileTable } from "./RestaurentProfileTable";

export const AddressTable = pgTable("address", {
  id,

  address_line_1: varchar().notNull(),
  address_line_2: varchar(),
  city: varchar().notNull(),
  state: varchar().notNull(),
  country: varchar().notNull(),
  pincode: varchar().notNull(),
  restaurent_id: uuid()
    .notNull()
    .references(() => RestaurentProfileTable.id, { onDelete: "cascade" }),

  isActive,
  createdAt,
  updatedAt,
});

export type SelectAddressTableType = typeof AddressTable.$inferSelect;
export type InsertAddressTableType = typeof AddressTable.$inferInsert;
