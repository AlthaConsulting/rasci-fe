import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../../../apis/urls";
import { systemClient } from "../../../apis/client";

type Level = {
  filter: string;
  page: string;
  page_size: string;
  q: string;
  sort: string;
  sort_by: string;
};

export const useLevel = (params: Partial<Level>) => {
  return useQuery<
    AxiosResponse<ApiResponse<{ records: any }, PaginationResponseMeta>>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: any[] }, PaginationResponseMeta>,
    [string, Partial<Level>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["level", params],
    queryFn: () => {
      return systemClient.get(URLs.LEVEL, {
        params,
      });
    },
    select: (data) => data.data,
  });
};

export const useCreateLevel = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:level"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.LEVEL}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level"] });
    },
  });
};

export const useImportLevel = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:level"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.IMPORT_LEVEL}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level"] });
    },
  });
};

export const useUpdateLevel = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string; name: string }
  >({
    mutationKey: ["update:level"],
    mutationFn: (payload) => {
      return systemClient.put(`${URLs.LEVEL}/${payload.id}`, {
        ...payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level"] });
    },
  });
};

export const useDeleteLevel = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string }
  >({
    mutationKey: ["delete:level"],
    mutationFn: (payload: { id: string }) => {
      return systemClient.delete(`${URLs.LEVEL}/${payload.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level"] });
    },
  });
};
