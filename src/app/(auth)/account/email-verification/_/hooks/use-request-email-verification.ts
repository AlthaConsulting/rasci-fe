import { useMutation } from "@tanstack/react-query";

import { requestEmailVerification } from "../api/request-email-verification";

export const useRequestEmailVerification = () => {
  return useMutation({
    mutationFn: requestEmailVerification,
  });
};
