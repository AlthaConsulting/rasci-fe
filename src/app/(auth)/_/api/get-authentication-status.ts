"use server";

import { cookies, headers } from "next/headers";
import { fetchRequest } from "@altha/core/lib/fetch-request";

export async function getAuthenticationStatus() {
  const reqHeaders = await headers(); 
  const reqCookies = await cookies(); 

  const cookieHeader = reqHeaders.get("cookie") || "";
  const csrfToken = reqCookies.get("csrftoken")?.value || "";

  return fetchRequest<void, ApiAuthenticatedResponse>(
    "GET", 
    "/auth/session",
    undefined,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        "X-CSRFToken": csrfToken,
        "X-HEADLESS-CLIENT": "browser",
      },
      withCredentials: true,
    }
  );
}
