import { createRestaurentDrizzleSchema } from "@/server/schema/zod-schema";
import { db } from "../db";
import { RestaurentProfileTable } from "../models";

export const findRestaurentProfileByUserId = async (userId: string) => {
  const restaurentProfile = await db.query.RestaurentProfileTable.findFirst({
    where: {
      userId: userId,
    },
    columns: {
      id: true,
    },
  });

  return restaurentProfile;
};

export const createRestaurentDb = async (value) => {
  const body = createRestaurentDrizzleSchema.parse(value);

  const { name, description, cuisine_type, logo_url, cover_image_url, userId } =
    body;

  const restaurent = await db
    .insert(RestaurentProfileTable)
    .values({
      name: name,
      description: description,
      cuisineType: cuisine_type,
      logoUrl: logo_url,
      coverImageUrl: cover_image_url,
      userId: userId,
    })
    .returning({ id: RestaurentProfileTable.id });

  return restaurent[0];
};
