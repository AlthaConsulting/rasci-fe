import axios, { InternalAxiosRequestConfig } from "axios";

export enum Client {
  Rasci = "RASCI",
}

export const getClientUrl = (client: Client) => {
  const API_RASCI_URL =
    process.env.NEXT_PUBLIC_API_RASCI_URL || "http://localhost:8000";

  return API_RASCI_URL;
};

export const makeApiClient = (
  client: Client = Client.Rasci,
  options?: {
    baseUrl?: string;
  }
) => {
  const apiClient = axios.create({
    baseURL: options?.baseUrl
      ? `${getClientUrl(client)}/${options.baseUrl}`
      : getClientUrl(client),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 60000,
    withCredentials: true,
  });

  return apiClient;
};

export const interceptors = {
  request: {
    onSuccess: (config: InternalAxiosRequestConfig) => {
      if (config.method?.toLowerCase() !== "GET") {
        config.headers["X-CSRFToken"] = getCSRFToken();
      }

      return config;
    },
    onFailure: (error: unknown) => {
      return Promise.reject(error);
    },
  },
};

const getCSRFToken = () => {
  let csrf;
  document.cookie.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    if (key.trim() === "csrftoken") {
      csrf = value;
    }
  });

  return csrf;
};
