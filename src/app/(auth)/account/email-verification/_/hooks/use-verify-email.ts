import { useMutation, useQueryClient } from "@tanstack/react-query";

import { verifyEmail } from "../api/verify-email";

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authentication-status"],
      });
    },
  });
};
