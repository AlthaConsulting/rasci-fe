interface BaseApiError {
  code: string;
  message: string;
  param?: string;
}

interface BaseApiResponse<N = 200> {
  status: N;
}

interface ApiResponse<T = void, M = void, N = 200> extends BaseApiResponse<N> {
  data: T;
  meta: M;
}

interface ApiErrorResponse<N = 400> extends BaseApiResponse<N> {
  errors: ApiError[];
}

interface ApiAuthenticatedResponse<T = Authenticated, N = 200>
  extends BaseApiResponse<N> {
  data: T;
  meta: AuthenticationMeta;
}

type DefaultFetchData = ApiResponse;

type DefaultFetchError =
  | BaseApiResponse<403 | 409 | 410>
  | ApiErrorResponse<400 | 500>
  | ApiAuthenticatedResponse<{ flows: AuthenticationFlow[] }, 401>;

type FetchResult<TData = DefaultFetchData, TError = DefaultFetchError> =
  | {
      success: true;
      result: TData;
    }
  | {
      success: false;
      result: TError;
    };

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  data: [];
}
