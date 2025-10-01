"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

interface Payload {
  key: string;
}

type SuccessResponse = ApiResponse<{ user: User }>;

export async function getPasswordResetInformation(payload: Payload) {
  return fetchRequest<Payload, SuccessResponse>(
    "GET",
    "/auth/password/reset",
    undefined,
    {
      headers: {
        "X-Password-Reset-Key": payload.key,
      },
    }
  );
}
