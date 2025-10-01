import { queryOptions, useQuery } from "@tanstack/react-query";

import { getQueryClient } from "@altha/core/lib/query-client";

import { getAuthenticationStatus } from "../api/get-authentication-status";

const getAuthenticationStatusOptions = queryOptions({
  queryKey: ["authentication-status"],
  queryFn: getAuthenticationStatus,
});

export const useGetAuthenticationStatus = () => {
  return useQuery(getAuthenticationStatusOptions);
};

export const prefetchAuthenticationStatus = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAuthenticationStatusOptions);
  return { queryClient };
};
