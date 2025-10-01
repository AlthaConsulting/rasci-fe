"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

export interface Payload {
  email: string;
}

export async function requestEmailVerification(payload: Payload) {
  return fetchRequest<Payload, BaseApiResponse>(
    "POST",
    "/auth/email/request",
    payload
  );
}
