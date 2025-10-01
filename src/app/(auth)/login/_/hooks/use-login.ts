import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../api/login";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authentication-status"],
      });
    },
  });
};

