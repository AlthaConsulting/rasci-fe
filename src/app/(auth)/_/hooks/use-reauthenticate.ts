import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reauthenticate } from "../api/reauthenticate";

export const useReauthenticate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reauthenticate,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authentication-status"],
      });
    },
  });
};
