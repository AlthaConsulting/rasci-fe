import { useQuery } from "@tanstack/react-query";
import { appliedVacancy } from "../api/use-get-applied-vancacy";
import { useGetAuthenticationStatus } from "@altha/app/(auth)/_/hooks/use-get-authentication-status";

export const useAppliedVacancy = (id: string | null) => {
  const auth = useGetAuthenticationStatus();
  return useQuery({
    queryKey: ["applied-vacancy", id, auth.data?.success], 
    queryFn: () => appliedVacancy(id),
    enabled: !!auth.data?.success && !!id, 
  });
};
