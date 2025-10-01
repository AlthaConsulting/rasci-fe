import { useMutation } from "@tanstack/react-query";

import { activateTOTP } from "../api/activate-totp";

export const useActivateTOTP = () => {
  return useMutation({
    mutationFn: activateTOTP,
  });
};
