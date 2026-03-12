import { db } from "../db";

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
