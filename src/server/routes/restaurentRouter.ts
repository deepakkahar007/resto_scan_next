import { Elysia } from "elysia";
import {
  createRestaurentDrizzleSchema,
  CreateRestaurentSchemaResponse,
} from "../schema/zod-schema";
import { z } from "zod";
import { findRestaurentProfileByUserId } from "../drizzle/queries";

export const restaurentRouter = new Elysia({
  prefix: "/restaurent",
})
  .get("/", async () => {
    return { message: "hello world" };
  })
  .post(
    "/create",
    async ({ body }) => {
      console.log(body);
      return {
        message: "hello world",
        name: body.name,
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
