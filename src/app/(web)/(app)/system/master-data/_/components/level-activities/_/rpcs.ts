import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../../../apis/urls";
import { systemClient } from "../../../apis/client";

type LevelActivity = {
  filter: string;
  page: string;
  page_size: string;
  q: string;
  sort: string;
  sort_by: string;
};

export const useLevelActivities = (params: Partial<LevelActivity>) => {
  return useQuery<
    AxiosResponse<ApiResponse<{ records: any }, PaginationResponseMeta>>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: any[] }, PaginationResponseMeta>,
    [string, Partial<LevelActivity>]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["level-activities", params],
    queryFn: () => {
      return systemClient.get(URLs.LEVEL_ACTIVITIES, {
        params,
      });
    },
    select: (data) => data.data,
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:level-activities"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.LEVEL_ACTIVITIES}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level-activities"] });
    },
  });
};

export const useImportActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { name: string }
  >({
    mutationKey: ["create:level-activities"],
    mutationFn: (payload) => {
      return systemClient.post(`${URLs.IMPORT_LEVEL_ACTIVITIES}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level-activities"] });
    },
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string; name: string }
  >({
    mutationKey: ["update:level-activities"],
    mutationFn: (payload) => {
      return systemClient.put(`${URLs.LEVEL_ACTIVITIES}/${payload.id}`, {
        ...payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level-activities"] });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ errors: ApiResponseError[] }>,
    { id: string }
  >({
    mutationKey: ["delete:level-activities"],
    mutationFn: (payload: { id: string }) => {
      return systemClient.delete(`${URLs.LEVEL_ACTIVITIES}/${payload.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["level-activities"] });
    },
  });
};
