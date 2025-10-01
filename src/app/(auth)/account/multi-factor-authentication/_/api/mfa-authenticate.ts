"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

export interface Payload {
  code: string;
}

export async function mfaAuthenticate(payload: Payload) {
  return fetchRequest<Payload, ApiAuthenticatedResponse>(
    "POST",
    "/auth/2fa/authenticate",
    payload
  );
}
