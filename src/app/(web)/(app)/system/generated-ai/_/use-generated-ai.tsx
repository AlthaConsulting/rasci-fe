"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useGeneratedAi } from "../../../content/_/api/rcps";

export const useAiGenerated = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || undefined;

  const { data, error, isLoading, isPlaceholderData } = useGeneratedAi({q});
 
  const generatedAi = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);
  
  return {
    data: generatedAi || [],
    error,
    loading: isLoading || isPlaceholderData,
    params: { q },
  };
};
