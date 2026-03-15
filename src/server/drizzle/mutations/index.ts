import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  CategoriesTable,
  InsertCategoriesTableType,
} from "../models/Categories";

export const createRestaurentMutation = async () => {};

export const createCategoryMutation = async (
  data: InsertCategoriesTableType,
) => {
  const res = await db
    .insert(CategoriesTable)
    .values(data)
    .returning({ id: CategoriesTable.id });

  return res[0].id;
};

export const updateCategoryMutation = async (
  value: InsertCategoriesTableType,
  id: string,
) => {
  const updatedResponse = await db
    .update(CategoriesTable)
    .set(value)
    .where(eq(CategoriesTable.id, id))
    .returning({ id: CategoriesTable.id });

  return updatedResponse[0];
};

export const deleteCategoryMutation = async (id: string) => {
  const deletedResponse = await db
    .delete(CategoriesTable)
    .where(eq(CategoriesTable.id, id))
    .returning({ id: CategoriesTable.id });

  return deletedResponse[0];
};
