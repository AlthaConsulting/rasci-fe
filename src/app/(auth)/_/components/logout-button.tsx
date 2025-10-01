"use client";

import { Button } from "@altha/core/components/ui/button";

import { useLogout } from "../hooks/use-logout";

export const LogoutButton = () => {
  const logout = useLogout();
  return <Button onClick={() => logout.mutate()}>Logout</Button>;
};
