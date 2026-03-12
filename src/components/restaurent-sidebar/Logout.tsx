"use client";

import { Button } from "../ui/button";
import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

const Logout = () => {
  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: (ctx) => {
          redirect("/");
        },
      },
    });
  }

  return (
    <Button variant={"destructive"} size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
