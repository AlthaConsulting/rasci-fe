"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

type Payload = {
  code: string;
};

export async function mfaReauthenticate(payload: Payload) {
  return fetchRequest<Payload, ApiAuthenticatedResponse>(
    "POST",
    "/auth/2fa/reauthenticate",
    payload
  );
}
