"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

export async function getVacancy(id: string) {
  return fetchRequest<void, Vacancy>("GET", `recruitment/vacancies/${id}`, undefined, {
    client: "hc",
  });
}
