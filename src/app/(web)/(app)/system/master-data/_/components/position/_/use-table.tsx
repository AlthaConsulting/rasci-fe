import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MasterDataActionColumn } from "@altha/core/components/templates/master-data";
import { useIsMobile } from "@altha/core/hooks/use-is-mobile";
import { Form } from "./form";
import { useDeletePosition, usePosition } from "./rpcs";

export const useTable = () => {
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter") || undefined;
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("page_size") || "10";
  const q = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const sortBy = searchParams.get("sort_by") || undefined;

  const deletePosition = useDeletePosition();
  const { data, error, isLoading, isPlaceholderData } = usePosition({
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
      // {
      //   meta: { fixed: "left", label: "No" },
      //   size: 60,
      //   id: "rowNumber",
      //   header: "No",
      //   cell: ({ row }) => <span>{row.index + 1}</span>,
      // },
      {
        meta: { label: "position" },
        size: 600,
        accessorKey: "position",
        header: "Position",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.name}
            </div>
          );
        },
      },
      {
        meta: { label: "level" },
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.level.name}
            </div>
          );
        },
      },
      {
        enableHiding: false,
        enableSorting: false,
        meta: { action: true, fixed: "right" },
        size: 50,
        id: "actions",
        cell: ({ row }) => {
          return (
            <MasterDataActionColumn
              form={Form}
              initialData={row.original}
              onDelete={() => {
                deletePosition.mutate(
                  { id: row.original.id },
                  {
                    onError(error) {
                      toast.error("Failed to delete job position", {
                        description: error.message,
                        descriptionClassName: "!text-destructive",
                      });
                    },
                    onSuccess() {
                      toast.success("Job position deleted successfully");
                    },
                  }
                );
              }}
            />
          );
        },
      },
    ],
    [deletePosition, isMobile]
  );

  const position = useMemo(() => {
    if (!data) return [];

    const { records } = data.data;
    return records;
  }, [data]);
  
  return {
    columns,
    data: position || [],
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
