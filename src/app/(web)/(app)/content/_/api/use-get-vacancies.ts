import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { getQueryClient } from "@altha/core/lib/query-client";

import { type QueryParams, getVacancies } from "./get-vacancies";

const getVacanciesOptions = (params?: QueryParams) =>
  queryOptions({
    queryKey: ["vacancies", params],
    queryFn: () => getVacancies(params),
    placeholderData: keepPreviousData,
  });

export const useVacancies = (params?: QueryParams) => {
  return useQuery(getVacanciesOptions(params));
};

export const prefetchVacancies = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getVacanciesOptions());
  return { queryClient };
};
