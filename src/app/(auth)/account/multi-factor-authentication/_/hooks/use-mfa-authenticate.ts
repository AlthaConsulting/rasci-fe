import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mfaAuthenticate } from "../api/mfa-authenticate";

export const useMfaAuthenticate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mfaAuthenticate,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authentication-status"],
      });
    },
  });
};
