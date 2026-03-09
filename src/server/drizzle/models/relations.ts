import { defineRelations } from "drizzle-orm";
import * as models from "./index";

export const relations = defineRelations(models, (r) => ({
  // auth relations
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },

  //   models relations
  RestaurentProfileTable: {
    user: r.one.user({
      from: r.RestaurentProfileTable.userId,
      to: r.user.id,
    }),
    address: r.many.AddressTable(),
    categories: r.many.CategoriesTable(),
  },
  AddressTable: {
    restaurent: r.one.RestaurentProfileTable({
      from: r.AddressTable.restaurent_id,
      to: r.RestaurentProfileTable.id,
    }),
  },
  CategoriesTable: {
    restaurent: r.one.RestaurentProfileTable({
      from: r.CategoriesTable.restaurent_id,
      to: r.RestaurentProfileTable.id,
    }),
  },

  ItemsTable: {
    restaurent: r.one.RestaurentProfileTable({
      from: r.ItemsTable.restaurent_id,
      to: r.RestaurentProfileTable.id,
    }),
    category: r.one.CategoriesTable({
      from: r.ItemsTable.categories_id,
      to: r.CategoriesTable.id,
    }),
  },
  SubItemsTable: {
    items: r.one.ItemsTable({
      from: r.SubItemsTable.item_id,
      to: r.ItemsTable.id,
    }),
  },
  verification: {
    user: r.one.user({
      from: r.verification.identifier,
      to: r.user.id,
    }),
  },
}));
