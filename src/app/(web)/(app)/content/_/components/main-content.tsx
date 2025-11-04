"use client";

import { useGetAuthenticationStatus } from "@altha/app/(auth)/_/hooks/use-get-authentication-status";
import DashboardPage from "./dashboard-page";
import LoginPage from "./login-page";

export default function MainContent() {
  const authenticationStatus = useGetAuthenticationStatus();
  const isLoggedIn = authenticationStatus.data?.success;

  return isLoggedIn ? (
    <DashboardPage />
  ) : (   
    <LoginPage />
  );
}
