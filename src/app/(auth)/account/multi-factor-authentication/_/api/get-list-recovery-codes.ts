"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

type SuccessResponse = ApiResponse<SensitiveRecoveryCodes>;

export async function getListRecoveryCodes() {
  return fetchRequest<void, SuccessResponse>(
    "GET",
    "/account/authenticators/recovery-codes"
  );
}
