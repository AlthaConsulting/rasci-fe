"use client";

import Cookies from "js-cookie";

interface Payload {
  email: string;
}

export async function requestPasswordReset(payload: Payload) {
  const csrfToken = Cookies.get("csrftoken") || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_RASCI_URL}/auth/password/request`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return {
    success: res.ok,
    result: data,
  };
}
