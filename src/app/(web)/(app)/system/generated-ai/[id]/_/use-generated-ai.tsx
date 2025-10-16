import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useDetailGeneratedAi } from "../../../../content/_/api/rcps";

export const useDetailPosition = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isPlaceholderData } = useDetailGeneratedAi(id);
  
  return {
    data,
    error,
    loading: isLoading || isPlaceholderData,
  };
};
