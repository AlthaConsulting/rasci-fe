"use client";
import Cookies from "js-cookie";

interface Payload {
  vacancy_id: string;
  vacancy_name: string;
  applicant_information_id: string | null;
  formal_education_id: string | null;
  working_experience_id: string | null;
}

export async function applyJob(payload: Payload) {
  const csrfToken = Cookies.get("csrftoken") || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CAREER_URL}/recruitment/applicant-jobs/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(payload),
  });

  return {
    success: res.ok,   
    status: res.status
  }
}