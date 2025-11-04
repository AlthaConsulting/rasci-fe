"use client";
import Cookies from "js-cookie";

export async function logout() {
  const csrfToken = Cookies.get("csrftoken") || "";

  await fetch(`${process.env.NEXT_PUBLIC_API_RASCI_URL}/auth/session`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    }
  });
}


