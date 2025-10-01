"use client";

import Link from "next/link";

import { Button } from "@altha/core/components/ui/button";

import { LogoutButton } from "./logout-button";
import { useGetAuthenticationStatus } from "../hooks/use-get-authentication-status";

export const AuthUser = () => {
  const { data } = useGetAuthenticationStatus();
  return (
    <div className="p-10">
      {data?.success ? (
        <div>
          <pre>{JSON.stringify(data?.result.data?.user, null, 2)}</pre>
          <LogoutButton />
        </div>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};
