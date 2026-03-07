import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.coerce.string(),
    DB_NAME: z.string(),
  },
  createFinalSchema: (schema) =>
    z.object(schema).transform((val) => {
      const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, ...rest } = val;
      return {
        ...rest,
        DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      };
    }),

  experimental__runtimeEnv: process.env,
});
