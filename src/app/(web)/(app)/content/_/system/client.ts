import { Client, interceptors, makeApiClient } from "@altha/core/libs/client";

export const systemClient = makeApiClient(Client.Career, {
  baseUrl: "recruitment",
});

systemClient.interceptors.request.use(
  interceptors.request.onSuccess,
  interceptors.request.onFailure
);
