import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, isActive } from "./modelsHelper";

export const AddressTable = pgTable("address", {
  id,

  address_line_1: varchar().notNull(),
  address_line_2: varchar(),
  city: varchar().notNull(),
  state: varchar().notNull(),
  country: varchar().notNull(),
  pincode: varchar().notNull(),
  restaurent_id: uuid().notNull(),

  isActive,
  createdAt,
  updatedAt,
});

export type SelectAddressTableType = typeof AddressTable.$inferSelect;
export type InsertAddressTableType = typeof AddressTable.$inferInsert;
