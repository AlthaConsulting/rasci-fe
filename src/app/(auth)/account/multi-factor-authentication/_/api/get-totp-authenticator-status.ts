"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

type ErrorResponse = ApiResponse<
  void,
  { secret: string; totp_url: string },
  404
>;

type SuccessResponse = ApiResponse<TOTPAuthenticator>;

export async function getTOTPAuthenticatorStatus() {
  return fetchRequest<void, SuccessResponse, ErrorResponse>(
    "GET",
    "/account/authenticators/totp"
  );
}
