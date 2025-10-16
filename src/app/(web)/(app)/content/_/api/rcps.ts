import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../api/urls";
import { systemClient } from "../api/client";

type Params = {
  filter: string;
  q: string;
  sort: string;
  sort_by: string;
};

type GroupedRasciMapping = {
  filter: string;
  page: string;
  page_size: string;
  q: string;
  sort: string;
  sort_by: string;
};

export const useMainPage = (params: Partial<Params>) => {
  return useQuery<
    AxiosResponse<any[]>,
    AxiosError<{ errors: ApiResponseError[] }>,
    any[],
    [string, Partial<Params>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["main_page", params],
    queryFn: () => {
      return systemClient.get(URLs.MAIN_PAGE, { params });
    },
    select: (response) => response.data, 
  });
};

export const useGroupedRasciMapping = (params: Partial<GroupedRasciMapping>) => {
  return useQuery<
    AxiosResponse<ApiResponse<{ records: any }, PaginationResponseMeta>>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: any[] }, PaginationResponseMeta>,
    [string, Partial<GroupedRasciMapping>]
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

export const useGeneratedAi = (params: Partial<Params>) => {
  return useQuery<
    AxiosResponse<any[]>,
    AxiosError<{ errors: ApiResponseError[] }>,
    any[],
    [string, Partial<Params>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["generated_ai", params],
    queryFn: () => {
      return systemClient.get(URLs.GENERATED_AI, { params });
    },
    select: (response) => response.data, 
  });
};

export const useDetailGeneratedAi = (id: string) => {
  return useQuery<
    AxiosResponse<any>,
    AxiosError<{ errors: ApiResponseError[] }>,
    any,
    [string, string] 
  >({
    queryKey: ["detail_generated_ai", id],
    queryFn: () => systemClient.get(`${URLs.DETAIL_GENERATED_AI}/${id}`),
    select: (data) => data.data,
  });
};


export const useUpdateDetailGenerate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<any>,
    AxiosError<{ errors: ApiResponseError[] }>,
    Partial<any> & { id: string }
  >({
    mutationKey: ["put:update_detail_generate"],
    mutationFn: ({ id, ...payload }) =>
      systemClient.put(`${URLs.DETAIL_GENERATED_AI}/${id}`, payload),
    onSuccess: (response, variables) => {
      const newData = response.data;

      queryClient.setQueryData(["detail_generated_ai", variables.id], newData);
      queryClient.invalidateQueries({
        queryKey: ["detail_generated_ai", variables.id],
      });
      console.log("✅ <<<<< cache updated:", newData);
    },
  });
};

