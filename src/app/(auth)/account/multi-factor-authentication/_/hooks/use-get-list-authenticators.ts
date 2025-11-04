import { queryOptions, useQuery } from "@tanstack/react-query";

import { getQueryClient } from "@altha/core/lib/query-client";

import { getListAuthenticators } from "../api/get-list-authenticators";

const getListAuthenticatorsOptions = queryOptions({
  queryKey: ["list-authenticators"],
  queryFn: getListAuthenticators,
});

export const useGetListAuthenticators = () => {
  return useQuery(getListAuthenticatorsOptions);
};

export const prefetchListAuthenticators = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getListAuthenticatorsOptions);
  return { queryClient };
};
