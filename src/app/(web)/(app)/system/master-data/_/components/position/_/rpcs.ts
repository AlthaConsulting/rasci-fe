import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../../../apis/urls";
import { systemClient } from "../../../apis/client";

type Position = {
  filter: string;
  page: string;
  page_size: string;
  q: string;
  sort: string;
  sort_by: string;
};

export const usePosition = (params: Partial<Position>) => {
  return useQuery<
    AxiosResponse<ApiResponse<{ records: any }, PaginationResponseMeta>>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: any[] }, PaginationResponseMeta>,
    [string, Partial<Position>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["position", params],
    queryFn: () => {
      return systemClient.get(URLs.POSITION, {
        params,
      });
    },
    select: (data) => data.data,
  });
};

export const useCreatePosition = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:position"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.POSITION}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
  });
};

export const useImportPosition = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:position"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.IMPORT_POSITION}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
  });
};

export const useUpdatePosition = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string; name: string }
  >({
    mutationKey: ["update:position"],
    mutationFn: (payload) => {
      return systemClient.put(`${URLs.POSITION}/${payload.id}`, {
        ...payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
  });
};

export const useDeletePosition = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string }
  >({
    mutationKey: ["delete:position"],
    mutationFn: (payload: { id: string }) => {
      return systemClient.delete(`${URLs.POSITION}/${payload.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["position"] });
    },
  });
};
