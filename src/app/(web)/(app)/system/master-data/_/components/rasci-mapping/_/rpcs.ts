import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../../../apis/urls";
import { systemClient } from "../../../apis/client";

type RasciMapping = {
  filter: string;
  page: string;
  page_size: string;
  q: string;
  sort: string;
  sort_by: string;
};

export const useRasciMapping = (params: Partial<RasciMapping>) => {
  return useQuery<
    AxiosResponse<ApiResponse<{ records: any }, PaginationResponseMeta>>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: any[] }, PaginationResponseMeta>,
    [string, Partial<RasciMapping>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["rasci-mapping", params],
    queryFn: () => {
      return systemClient.get(URLs.RASCI_MAPPING, {
        params,
      });
    },
    select: (data) => data.data,
  });
};

export const useCreateRasciMapping = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:rasci-mapping"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.RASCI_MAPPING}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rasci-mapping"] });
    },
  });
};

export const useImportRasciMapping = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:rasci-mapping"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.IMPORT_RASCI_MAPPING}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rasci-mapping"] });
    },
  });
};

export const useUpdateRasciMapping = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string; name: string }
  >({
    mutationKey: ["update:rasci-mapping"],
    mutationFn: (payload) => {
      return systemClient.put(`${URLs.RASCI_MAPPING}/${payload.id}`, {
        ...payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rasci-mapping"] });
    },
  });
};

export const useDeleteRasciMapping = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string }
  >({
    mutationKey: ["delete:rasci-mapping"],
    mutationFn: (payload: { id: string }) => {
      return systemClient.delete(`${URLs.RASCI_MAPPING}/${payload.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rasci-mapping"] });
    },
  });
};
