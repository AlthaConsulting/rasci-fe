"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

type Payload = {
  code: string;
};

type SuccessResponse = ApiResponse<TOTPAuthenticator, AuthenticationMeta>;

export async function activateTOTP(payload: Payload) {
  return fetchRequest<Payload, SuccessResponse>(
    "POST",
    "/account/authenticators/totp",
    payload
  );
}
