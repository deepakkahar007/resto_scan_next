import { treaty } from "@elysiajs/eden";
import { app, type App } from "@/server/elysia";

export const api =
  typeof process !== "undefined"
    ? treaty(app).api
    : treaty<App>("localhost:3000").api;
