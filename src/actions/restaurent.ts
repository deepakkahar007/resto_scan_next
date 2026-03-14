"use server";

import { api } from "@/lib/eden";

export const createRestaurentMutation = async (value, userId: string) => {
  const res = await api.restaurent.create.post({
    userId: userId,
    ...value,
  });

  return res.status ? res.data : res.error;
};
