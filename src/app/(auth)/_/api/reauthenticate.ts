"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

interface Payload {
  password: string;
}

export async function reauthenticate(payload: Payload) {
  return fetchRequest<Payload, ApiAuthenticatedResponse>(
    "POST",
    "/auth/reauthenticate",
    payload
  );
}
