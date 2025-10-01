import { AxiosError, AxiosResponse } from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { URLs } from "../system/urls";
import { systemClient } from "../system/client";

export const useDepartments = (params: { page: string; page_size: string }) => {
  return useQuery<
    AxiosResponse<
      ApiResponse<{ records: Department[] }, PaginationResponseMeta>
    >,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: Department[] }, PaginationResponseMeta>,
    [string, { page: string; page_size: string }]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["departments", params],
    queryFn: () => {
      return systemClient.get(URLs.DEPARTMENTS, {
        params,
      });
    },
    select: (data) => data.data,
  });
};

export const useOfficeLocations = (params: {
  page: string;
  page_size: string;
}) => {
  return useQuery<
    AxiosResponse<
      ApiResponse<{ records: OfficeLocation[] }, PaginationResponseMeta>
    >,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: OfficeLocation[] }, PaginationResponseMeta>,
    [string, { page: string; page_size: string }]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["office_locations", params],
    queryFn: () => {
      return systemClient.get(URLs.OFFICE_LOCATIONS, {
        params,
      });
    },
    select: (data) => data.data,
  });
};

export const useYearExperience = (params: {
  page: string;
  page_size: string;
}) => {
  return useQuery<
    AxiosResponse<
      ApiResponse<{ records: YearsOfExperience[] }, PaginationResponseMeta>
    >,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: YearsOfExperience[] }, PaginationResponseMeta>,
    [string, { page: string; page_size: string }]
  >({
    placeholderData: keepPreviousData,
    queryKey: ["years_of_experience", params],
    queryFn: () => {
      return systemClient.get(URLs.YEARS_OF_EXPERIENCES, {
        params,
      });
    },
    select: (data) => data.data,
  });
};
