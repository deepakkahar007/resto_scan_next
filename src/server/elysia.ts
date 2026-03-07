import { Elysia } from "elysia";
import { restaurentRouter } from "./routes/restaurentRouter";

export const app = new Elysia({ prefix: "/api" })
  .get("/", async () => {
    return { message: "hello world" };
  })
  .use(restaurentRouter);

export type App = typeof app;
