"use server";

import { cookies, headers } from "next/headers";
import { fetchRequest } from "@altha/core/lib/fetch-request";

interface Payload {
  key: string;
}

export async function verifyEmail(payload: Payload) {
  const reqHeaders = await headers(); 
  const reqCookies = await cookies(); 

  const cookieHeader = reqHeaders.get("cookie") || "";
  const csrfToken = reqCookies.get("csrftoken")?.value || "";

  return fetchRequest<Payload, ApiAuthenticatedResponse>(
    "POST",
    "/auth/email/verify",
    payload,
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
