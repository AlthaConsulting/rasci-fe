import { useMutation } from "@tanstack/react-query";

import { getEmailVerificationInformation } from "../api/get-email-verification-information";

export const useGetEmailVerificationInformation = () => {
  return useMutation({
    mutationFn: getEmailVerificationInformation,
  });
};
