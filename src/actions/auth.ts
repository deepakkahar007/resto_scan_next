"use server";

import { auth } from "@/server/auth/better-auth";

export const signInWithgoogle = async () => {
  const res = await auth.api.signInSocial({
    body: {
      provider: "google",
    },
  });
  return res;
};
