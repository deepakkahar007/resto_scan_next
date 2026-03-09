import { Elysia } from "elysia";
import {
  createRestaurentDrizzleSchema,
  CreateRestaurentSchemaResponse,
} from "../schema/zod-schema";

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
  );
