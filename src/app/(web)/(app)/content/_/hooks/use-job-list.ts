import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { useVacancies } from "../api/use-get-vacancies";

export const useJobList = () => {
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter");
  const page = searchParams.get("page") || "1";
  const q = searchParams.get("keyword");
  const sort = searchParams.get("sort");
  const sort_by = searchParams.get("sort_by");

  const { data, isLoading, isPlaceholderData } = useVacancies({
    filter: filter ? `status:Active;${filter}` : "status:Active",
    page,
    page_size: "5",
    q,
    sort,
    sort_by,
  });
  
  const vacancies = useMemo<Vacancy[]>(() => {
    if (data && data.success) return data.result.data;
    return [];
  }, [data]);

  const totalCount = useMemo<number>(() => {
    if (data && data.success) return data?.result.data.records.length;
    return 0;
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filter, searchParams]);

  return {
    data,
    isLoading,
    isPlaceholderData,
    searchParams: { page, page_size: "5", q, sort, sort_by },
    totalCount,
    vacancies,
  };
};
