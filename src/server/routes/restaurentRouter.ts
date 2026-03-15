import { Elysia } from "elysia";
import {
  CreateCategoryDrizzleSchema,
  createRestaurentDrizzleSchema,
  CreateRestaurentSchemaResponse,
} from "../schema/zod-schema";
import { z } from "zod";
import {
  createRestaurentDb,
  findRestaurentProfileByUserId,
} from "../drizzle/queries";
import { db } from "../drizzle/db";
import { RestaurentProfileTable } from "../drizzle/models";
import {
  createCategoryMutation,
  deleteCategoryMutation,
} from "../drizzle/mutations";

export const restaurentRouter = new Elysia({
  prefix: "/restaurent",
})
  .get("/", async () => {
    return { message: "hello world" };
  })
  .post(
    "/create",
    async ({ body }) => {
      const res = await db
        .insert(RestaurentProfileTable)
        .values({ ...body })
        .returning({ id: RestaurentProfileTable.id });

      return {
        message: "hello world",
        name: body.name,
        id: res[0].id,
      };
    },
    {
      body: createRestaurentDrizzleSchema,
      response: CreateRestaurentSchemaResponse,
    },
  )
  .get(
    "/get_restaurent",
    async ({ query }) => {
      const { id } = query;

      const restaurent = await findRestaurentProfileByUserId(id);

      return { status: !!restaurent };
    },
    {
      query: z.object({
        id: z.string(),
      }),
    },
  )
  .post(
    "/category/create",
    async ({ body }) => {
      const createdCategory = await createCategoryMutation(body);

      return {
        message: `${body.category} created successfully`,
        name: createdCategory,
      };
    },
    {
      body: CreateCategoryDrizzleSchema,
      response: CreateRestaurentSchemaResponse,
    },
  )
  .delete(
    "/category/delete",
    async ({ body }) => {
      const deletedCategory = await deleteCategoryMutation(body.id);

      return {
        message: `${deletedCategory} deleted successfully`,
      };
    },
    {
      body: z.object({
        id: z.string(),
      }),
    },
  );
