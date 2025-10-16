"use client";

import Cookies from "js-cookie";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGroupedRasciMapping } from "../../../content/_/api/rcps";
import { toast } from "sonner";

export const useRasciMatrix = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  const filter = searchParams.get("filter") || undefined;
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("page_size") || "10";
  const q = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const sortBy = searchParams.get("sort_by") || undefined;

  const { data, error, isLoading, isPlaceholderData } = useGroupedRasciMapping({
    filter,
    page,
    page_size: pageSize,
    q,
    sort,
    sort_by: sortBy,
  });

  const rasciMapping = useMemo(() => {
    if (!data) return [];

    const { records } = data.data;
    return records;
  }, [data]);
  
  const handleGenerateJobDesc = async (position: any, records: any) => {
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_RASCI_URL}/system/generate_ai_jobdesc`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
        body: JSON.stringify({
          position_id: position?.id,
          records: records.detail,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate job description");

      setGeneratedResult(result);
      router.push(`/system/generated-ai/${result.id}`); 
      toast.success("Job Description Successfully Generated");
    } catch (err: any) {
      console.error("Error generating job description:", err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    data: rasciMapping || [],
    error,
    loading: isLoading || isPlaceholderData,
    pagination: {
      enabled: true,
      page,
      pageSize,
      totalCount: data?.meta?.total_items ?? 0,
    },
    params: { filter, q },
    handleGenerateJobDesc,
    isGenerating,
    generatedResult,
  };
};
