import { queryOptions, useQuery } from "@tanstack/react-query";

import { getQueryClient } from "@altha/core/lib/query-client";

import { getTOTPAuthenticatorStatus } from "../api/get-totp-authenticator-status";

const getTOTPAuthenticatorStatusOptions = queryOptions({
  queryKey: ["totp-authenticator-status"],
  queryFn: getTOTPAuthenticatorStatus,
});

export const useGetTOTPAuthenticatorStatus = () => {
  return useQuery(getTOTPAuthenticatorStatusOptions);
};

export const prefetchTOTPAuthenticatorStatus = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getTOTPAuthenticatorStatusOptions);
  return { queryClient };
};
