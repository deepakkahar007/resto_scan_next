import { Elysia } from "elysia";
import { restaurentRouter } from "./routes/restaurentRouter";
import { betterAuthView } from "./auth/better-auth";

export const app = new Elysia({ prefix: "/api" })
  .all("/auth/*", betterAuthView)
  .get("/", async () => {
    return { message: "hello world" };
  })
  .use(restaurentRouter);

export type App = typeof app;
