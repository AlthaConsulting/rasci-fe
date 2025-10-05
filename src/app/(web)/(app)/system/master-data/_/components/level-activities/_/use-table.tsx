import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MasterDataActionColumn } from "@altha/core/components/templates/master-data";
import { useIsMobile } from "@altha/core/hooks/use-is-mobile";
import { Form } from "./form";
import { useDeleteActivity, useLevelActivities } from "./rpcs";

export const useTable = () => {
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter") || undefined;
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("page_size") || "10";
  const q = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const sortBy = searchParams.get("sort_by") || undefined;

  const deleteActivity = useDeleteActivity();
  const { data, error, isLoading, isPlaceholderData } = useLevelActivities({
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
        meta: { label: "index" },
        accessorKey: "index",
        header: "Index",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.index}
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
              {row.original.level}
            </div>
          );
        },
      },
      {
        meta: { label: "description" },
        accessorKey: "description",
        header: "Activity",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.description}
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
                deleteActivity.mutate(
                  { id: row.original.id },
                  {
                    onError(error) {
                      toast.error("Failed to delete level activity", {
                        description: error.message,
                        descriptionClassName: "!text-destructive",
                      });
                    },
                    onSuccess() {
                      toast.success("Level activity deleted successfully");
                    },
                  }
                );
              }}
            />
          );
        },
      },
    ],
    [deleteActivity, isMobile]
  );

  const levelActivity = useMemo(() => {
    if (!data) return [];

    const { records } = data.data;
    return records;
  }, [data]);
  
  return {
    columns,
    data: levelActivity || [],
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
