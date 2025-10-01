"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

type SuccessResponse = ApiResponse<
  (TOTPAuthenticator | RecoveryCodesAuthenticator)[]
>;

export async function getListAuthenticators() {
  return fetchRequest<void, SuccessResponse>("GET", "/account/authenticators");
}
