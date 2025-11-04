"use client";

import { useEffect, useState } from "react";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_RASCI_URL}/csrf`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCsrfToken(data.csrfToken); 
        } else {
          console.error("Failed to fetch CSRF token");
        }
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }

    fetchCsrfToken();
  }, []);

  return csrfToken;
};
