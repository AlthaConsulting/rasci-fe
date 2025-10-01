import { useMutation } from "@tanstack/react-query";

import { getPasswordResetInformation } from "../api/get-password-reset-information";

export const useGetPasswordResetInformation = () => {
  return useMutation({
    mutationFn: getPasswordResetInformation,
  });
};
