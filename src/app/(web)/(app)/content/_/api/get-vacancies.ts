"use server";

import { fetchRequest } from "@altha/core/lib/fetch-request";

export interface QueryParams {
  filter: string | null;
  page: string | null;
  page_size: string | null;
  q: string | null;
  sort: string | null;
  sort_by: string | null;
}

export async function getVacancies(params?: QueryParams) {
  return fetchRequest<void, PaginatedResponse<Vacancy>>(
    "GET",
    "recruitment/vacancies",
    undefined,
    { client: "hc", params }
  );
}
