"use client";

import { Button } from "../ui/button";
import { signOut } from "@/lib/auth";

const Logout = () => {
  async function handleLogout() {
    await signOut({});
  }

  return (
    <Button variant={"destructive"} size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
