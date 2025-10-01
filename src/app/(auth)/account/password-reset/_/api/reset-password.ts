"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

interface Payload {
  key: string;
  password: string;
}

export async function resetPassword(payload: Payload) {
  return fetchRequest<Payload, ApiAuthenticatedResponse>(
    "POST",
    "/auth/password/reset",
    payload
  );
}
