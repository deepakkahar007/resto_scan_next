import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { restaurentRouter } from "./routes/restaurentRouter";
import { auth, betterAuthView } from "./auth/better-auth";
import { env } from "@/env/envSchema";

export const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: env.BETTER_AUTH_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .all("/api/auth/*", betterAuthView)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  })
  .get("/", async () => {
    return { message: "hello world" };
  })
  .use(restaurentRouter);

export type App = typeof app;
