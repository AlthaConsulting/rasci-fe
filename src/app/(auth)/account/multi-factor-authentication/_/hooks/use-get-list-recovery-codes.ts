import { queryOptions, useQuery } from "@tanstack/react-query";

import { getQueryClient } from "@altha/core/lib/query-client";

import { getListRecoveryCodes } from "../api/get-list-recovery-codes";

const getListRecoveryCodesOptions = queryOptions({
  queryKey: ["list-recovery-codes"],
  queryFn: getListRecoveryCodes,
});

export const useGetListRecoveryCodes = () => {
  return useQuery(getListRecoveryCodesOptions);
};

export const prefetchListRecoveryCodes = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getListRecoveryCodesOptions);
  return { queryClient };
};
