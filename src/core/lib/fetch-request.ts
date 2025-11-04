import { type AxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";
import { redirect } from "next/navigation";

import { apiCareerClient, apiHcClient, apiRasciClient } from "./api-client";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function fetchRequest<
  TRequestPayload = void,
  TResponse = DefaultFetchData,
  TError = DefaultFetchError
>(
  method: HttpMethod,
  url: string,
  payload?: TRequestPayload,
  config?: AxiosRequestConfig & {
    client?: "career" | "hc";
  }
): Promise<FetchResult<TResponse, TError>> {
  const apiClient = apiRasciClient;

  try {
    const response = await apiClient<
      TResponse,
      AxiosResponse<TResponse>,
      TRequestPayload
    >({
      ...config,
      data: payload,
      method,
      url,
    });

    return {
      success: true,
      result: response.data,
    };
  } catch (exception) {
    const error: BaseApiError = {
      code: "server_error",
      message: "Unknown error occurred",
    };

    if (exception instanceof AxiosError) {
      if (exception.response) {
        const response = exception.response;
        const data = response.data;

        if (response.status === 410) return redirect("/login");

        return { success: false, result: data };
      } else if (exception.request) {
        error.code = "network_error";
        error.message = "The request was made but no response was received.";
      }
    }

    return {
      success: false,
      result: {
        status: 500,
        errors: [error],
      },
    } as FetchResult<TResponse, TError>;
  }
}
