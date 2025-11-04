import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@altha/core/hooks/use-is-mobile";
import { useGroupedRasciMapping } from "../../../api/rcps";

export const useTable = () => {
  const searchParams = useSearchParams();

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

  const isMobile = useIsMobile();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        meta: { fixed: "left", label: "No" },
        size: 60,
        id: "rowNumber",
        header: "No",
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        meta: { label: "level_activities" },
        accessorKey: "level_activities",
        header: "Level Activity",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.level_activities.index} - {row.original.level_activities.level}
            </div>
          );
        },
      },
      {
        meta: { label: "position" },
        accessorKey: "position",
        header: "Position Name",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.position.name}
            </div>
          );
        },
      },
      {
        meta: { label: "rasci" },
        accessorKey: "rasci",
        header: "RASCI Activity",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.rasci}
            </div>
          );
        },
      },
    ],
    [isMobile]
  );

  const rasciMapping = useMemo(() => {
    if (!data) return [];

    const { records } = data.data;
    return records;
  }, [data]);
  
  return {
    columns,
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
  };
};
