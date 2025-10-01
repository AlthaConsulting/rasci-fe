"use server";

import { apiCareerClient } from "@altha/core/lib/api-client";

export interface CaptchaAPIPayload {
  token: string;
}

export async function captcha(
  payload: CaptchaAPIPayload
): Promise<ApiResponse> {
  const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;
  if (!payload.token) throw new Error("Please provide the token");

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${payload.token}`;
  const response = await apiCareerClient.post(url);

  if (!response.data.success) throw new Error("Failed to verify");

  return { status: 200, data: undefined, meta: undefined };
}
