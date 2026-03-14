import { Elysia } from "elysia";
import {
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
  );
