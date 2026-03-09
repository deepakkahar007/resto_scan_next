import { z } from "zod";
import { RestaurentProfileTable } from "../drizzle/models";
import { createInsertSchema } from "drizzle-orm/zod";

export const createRestaurentDrizzleSchema = createInsertSchema(
  RestaurentProfileTable,
  {
    name: (val) => val.min(3).trim(),
    description: (val) => val.trim().min(10),
    available_tables: (val) => val.min(1),
    logo_url: (val) => z.url(),
    userId: (val) => val.trim(),
    cuisine_type: (val) => val.min(1),
  },
).strip();

export const CreateRestaurentSchemaResponse = z.object({
  message: z.string(),
  name: z.string(),
});
