import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../../../api/urls";
import { systemClient } from "../../../api/client";

type RasciMapping = {
  filter: string;
  page: string;
  page_size: string;
  q: string;
  sort: string;
  sort_by: string;
};

export const useGroupedRasciMapping = (params: Partial<RasciMapping>) => {
  return useQuery<
    AxiosResponse<ApiResponse<{ records: any }, PaginationResponseMeta>>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: any[] }, PaginationResponseMeta>,
    [string, Partial<RasciMapping>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["grouped_rasci_mapping", params],
    queryFn: () => {
      return systemClient.get(URLs.GROUPED_RASCI, {
        params,
      });
    },
    select: (data) => data.data,
  });
};
