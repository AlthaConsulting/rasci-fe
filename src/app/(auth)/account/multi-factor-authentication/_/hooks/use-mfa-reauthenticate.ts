import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mfaReauthenticate } from "../api/mfa-reauthenticate";

export const useMfaReauthenticate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mfaReauthenticate,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authentication-status"],
      });
    },
  });
};
