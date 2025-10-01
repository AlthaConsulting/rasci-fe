"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

interface Payload {
  key: string;
}

type SuccessResponse = ApiResponse<
  { email: string; user: User },
  { is_authenticating: boolean }
>;

export async function getEmailVerificationInformation(payload: Payload) {
  return fetchRequest<Payload, SuccessResponse>(
    "GET",
    "/auth/email/verify",
    undefined,
    {
      headers: {
        "X-Email-Verification-Key": payload.key,
      },
    }
  );
}
