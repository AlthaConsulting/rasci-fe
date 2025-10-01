/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { cookies, headers } from "next/headers";
import { set } from "./session";

function isAuthenticationMeta(meta: unknown): meta is AuthenticationMeta {
  return (
    typeof meta === "object" && meta !== null && "is_authenticated" in meta
  );
}

export const apiCareerClient = axios.create({
  baseURL: process.env.API_CAREER_URL || "http://localhost:8080",
  timeout: +(process.env.API_TIMEOUT || 10000),
  withCredentials: true,
});

export const apiHcClient = axios.create({
  baseURL: process.env.API_HC_URL || "http://localhost:8000",
  timeout: +(process.env.API_TIMEOUT || 10000),
  withCredentials: true,
});

export const apiRasciClient = axios.create({
  baseURL: process.env.API_RASCI_URL || "http://localhost:8000",
  timeout: +(process.env.API_TIMEOUT || 10000),
  withCredentials: true,
});

type RequestInterceptorOnFulfilled =
  | ((
      value: InternalAxiosRequestConfig<any>
    ) =>
      | InternalAxiosRequestConfig<any>
      | Promise<InternalAxiosRequestConfig<any>>)
  | null
  | undefined;

type RequestInterceptorOnRejected = ((error: any) => any) | null;

type ResponseInterceptorOnFulfilled =
  | ((
      value: AxiosResponse<any, any>
    ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
  | null
  | undefined;

type ResponseInterceptorOnRejected = ((error: any) => any) | null;

type Interceptors = {
  request: {
    onFulfilled: RequestInterceptorOnFulfilled;
    onRejected: RequestInterceptorOnRejected;
  };
  response: {
    onFulfilled: ResponseInterceptorOnFulfilled;
    onRejected: ResponseInterceptorOnRejected;
  };
};

const interceptors: Interceptors = {
  request: {
    onFulfilled: async (config) => {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get(process.env.AUTH_JWT_COOKIE!);
      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken.value}`);
      }

      const sessionToken = cookieStore.get(process.env.AUTH_SESSION_COOKIE!);
      if (sessionToken) {
        config.headers.set("X-Session-Token", sessionToken.value);
      }
      const csrfToken = cookieStore.get("csrftoken")?.value;
      if (
        csrfToken &&
        ["post", "put", "patch", "delete"].includes(config.method?.toLowerCase()!)
      ) {
        config.headers.set("X-CSRFToken", csrfToken);
      }
      
      return config;
    },
    onRejected: (error) => Promise.reject(error),
  },
  response: {
    onFulfilled: async (response) => {
      const data = response.data;
      if (data.meta && isAuthenticationMeta(data.meta)) {
        const { access_token, session_token } = data.meta;
        void (await set(process.env.AUTH_JWT_COOKIE!)).if(access_token);
        void (await set(process.env.AUTH_SESSION_COOKIE!)).if(session_token);
      }

      return response;
    },
    onRejected: async (exception) => {
      if (exception instanceof AxiosError) {
        const { method, url } = exception.config!;
        if (method === "delete" && url === "/auth/session") {
          void (await set(process.env.AUTH_JWT_COOKIE!)).delete();
          void (await set(process.env.AUTH_SESSION_COOKIE!)).delete();
        }

        if (exception.response) {
          const data = exception.response.data;

          if (data.meta && isAuthenticationMeta(data.meta)) {
            const { access_token, session_token } = data.meta;
            void (await set(process.env.AUTH_JWT_COOKIE!)).if(access_token);
            void (await set(process.env.AUTH_SESSION_COOKIE!)).if(
              session_token
            );
          }

          if (data.status === 410) {
            void (await set(process.env.AUTH_JWT_COOKIE!)).delete();
            void (await set(process.env.AUTH_SESSION_COOKIE!)).delete();
            void (await set("flash")).to(
              JSON.stringify({
                message: "Your session has expired.",
                details: "Please log in again.",
              })
            );
          }
        }
      }

      return Promise.reject(exception);
    },
  },
};

apiCareerClient.interceptors.request.use(
  interceptors.request.onFulfilled,
  interceptors.request.onRejected
);

apiHcClient.interceptors.request.use(
  interceptors.request.onFulfilled,
  interceptors.request.onRejected
);

apiCareerClient.interceptors.response.use(
  interceptors.response.onFulfilled,
  interceptors.response.onRejected
);

apiHcClient.interceptors.response.use(
  interceptors.response.onFulfilled,
  interceptors.response.onRejected
);
