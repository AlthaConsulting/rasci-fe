import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@altha/core/hooks/use-is-mobile";
import { useGroupedRasciMapping } from "../../../content/_/api/rcps";

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
        meta: { label: "position_name" },
        size: 700,
        accessorKey: "position_name",
        header: "Job Position",
        cell: ({ row }) => {
          return (
            <div>
              <a href={`/system/rasci-matrix?filter=job_position:${row.original.position.id}`} className="font-medium text-blue-900">
                {row.original.position.name}
              </a>
            </div>
          );
        },
      },
      {
        meta: { label: "responsible" },
        accessorKey: "responsible",
        header: "Responsible",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.total.R}
            </div>
          );
        },
      },
      {
        meta: { label: "accountable" },
        accessorKey: "accountable",
        header: "Accountable",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.total.A}
            </div>
          );
        },
      },
      {
        meta: { label: "support" },
        accessorKey: "support",
        header: "Support",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.total.S}
            </div>
          );
        },
      },
      {
        meta: { label: "consult" },
        accessorKey: "consult",
        header: "Consult",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.total.C}
            </div>
          );
        },
      },
      {
        meta: { label: "inform" },
        accessorKey: "inform",
        header: "Inform",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.total.I}
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
