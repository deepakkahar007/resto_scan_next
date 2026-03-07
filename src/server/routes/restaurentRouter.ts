import { Elysia } from "elysia";

export const restaurentRouter = new Elysia({
  prefix: "/restaurent",
}).get("/", async () => {
  return { message: "hello world" };
});
