import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { getQueryClient } from "@altha/core/lib/query-client";

import { getVacancy } from "./get-vacancy";

const getVacancyOptions = (id: string) =>
  queryOptions({
    queryKey: ["vacancy", id],
    queryFn: () => getVacancy(id),
    placeholderData: keepPreviousData,
  });

export const useVacancy = (id: string) => {
  return useQuery(getVacancyOptions(id));
};

export const prefetchVacancy = async (id: string) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getVacancyOptions(id));
  return { queryClient };
};
