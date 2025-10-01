import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyJob } from "../api/use-job-apply";

export const useJobApply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyJob,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authentication-status"],
      });
    },
  });
};

