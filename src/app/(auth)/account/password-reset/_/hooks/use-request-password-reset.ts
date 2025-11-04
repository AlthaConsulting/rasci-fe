import { useMutation } from "@tanstack/react-query";

import { requestPasswordReset } from "../api/request-password-reset";

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
};
