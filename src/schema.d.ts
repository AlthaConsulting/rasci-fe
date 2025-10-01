interface BaseApiResponse {
  status: number;
}

interface ApiResponse<T, M = AuthResponseMeta> extends BaseApiResponse {
  data: T;
  errors: ApiResponseError[];
  meta: M;
}

interface ApiError extends BaseApiResponse {
  errors: ApiResponseError[];
}

interface ApiResponseError {
  code: string;
  message: string;
  param?: string;
}

interface AuthResponseMeta {
  access_token?: string;
  is_authenticated: boolean;
  session_token?: string;
}

interface PaginationResponseMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  next_page: string | null;
  previous_page: string | null;
  page_size: number;
}

type NonNullableProps<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
