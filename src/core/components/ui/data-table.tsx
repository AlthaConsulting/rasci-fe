/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { AxiosError } from "axios";
import {
  AlertDrawer,
  AlertDrawerAction,
  AlertDrawerClose,
  AlertDrawerContent,
  AlertDrawerDescription,
  AlertDrawerFooter,
  AlertDrawerHeader,
  AlertDrawerTitle,
  AlertDrawerTrigger,
} from "@altha/core/components/ui/alert-drawer";
import {
  DotsThreeVertical as DotsThreeVerticalIcon,
  Plus as PlusIcon,
} from "@phosphor-icons/react";
import {
  type HTMLAttributes,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowDown as ArrowDownIcon,
  ArrowsDownUp as ArrowsDownUpIcon,
  ArrowUp as ArrowUpIcon,
  SlidersHorizontal as SlidersHorizontalIcon,
  SpinnerGap as SpinnerGapIcon,
} from "@phosphor-icons/react";
import {
  Cell,
  Column,
  ColumnDef,
  ExpandedState,
  Header,
  SortingState,
  TableOptions,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DotsThree as DotsThreeIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import { Button } from "@altha/core/components/ui/button";
import { Checkbox } from "@altha/core/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@altha/core/components/ui/dropdown-menu";
import { PaginationWithLinks } from "@altha/core/components/ui/pagination-with-links";
import { SearchInput } from "@altha/core/components/ui/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "@altha/core/components/ui/table";
import { cn } from "@altha/core/libs/utils";

import { Dialog, DialogTrigger } from "./dialog";

export const rowSelectionColumnDef = <TData,>(): ColumnDef<TData> => ({
  enableHiding: false,
  enableSorting: false,
  meta: { fixed: "left" },
  size: 50,
  id: "select",
  header: ({ table }) => (
    <Checkbox
      aria-label="Select all"
      // checked={
      //   table.getIsAllPageRowsSelected() ||
      //   (table.getIsSomePageRowsSelected() && "indeterminate")
      // }
      checked={
        table.getIsAllPageRowsSelected()
          ? true
          : table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : false
      }
      className="translate-y-0.5"
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      aria-label="Select row"
      checked={row.getIsSelected()}
      className="translate-y-0.5"
      onCheckedChange={(value) => row.toggleSelected(!!value)}
    />
  ),
});

interface ActionControl {
  children: React.ReactNode;
}

interface FilterControl {
  keyword: string;
  placeholder?: string;
}

interface PaginationControl {
  page: string;
  pageSize: string;
  totalCount: number;
}

interface RowSelectionControl<TData> {
  children: (table: TanstackTable<TData>) => React.ReactNode;
}

export interface DataTableProps<TData, TValue = unknown>
  extends HTMLAttributes<HTMLDivElement> {
  form: any;
  api?: Partial<TableOptions<TData>>;
  columns: ColumnDef<TData, TValue>[];
  controls?: {
    action?:
      | ({ enabled: false } & Partial<ActionControl>)
      | ({ enabled: true } & ActionControl);
    column?: { enabled: false } | { enabled: true };
    pagination?:
      | ({ enabled: false } & Partial<PaginationControl>)
      | ({ enabled: true } & PaginationControl);
    filter?:
      | ({ enabled: false } & Partial<FilterControl>)
      | ({ enabled: true } & FilterControl);
    rowSelection?:
      | ({ enabled: false } & Partial<RowSelectionControl<TData>>)
      | ({ enabled: true } & RowSelectionControl<TData>);
    addData?: { enabled: boolean }
  };
  data: TData[];
  error?: Error | null;
  loading?: boolean;
  scroll?: { x?: string | number };
}

export function DataTable<TData, TValue>({
  form,
  api,
  columns,
  controls = {
    action: { enabled: false },
    pagination: { enabled: false },
    filter: { enabled: false },
    column: { enabled: false },
    rowSelection: { enabled: false },
    addData: { enabled: false },
  },
  data,
  error,
  loading = false,
  scroll = { x: "max-content" },
  ...props
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [open, setOpen] = useState<boolean>(false);

  const Form = form ?? null;
  const table = useReactTable({
    data,
    columns,
    filterFromLeafRows: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    maxLeafRowFilterDepth: 1,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      expanded,
      rowSelection,
      sorting,
    },
    ...api,
  });

  const [showShadow, setShowShadow] = useState<boolean>(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback(() => {
    if (tableRef.current) setShowShadow(tableRef.current.scrollLeft > 10);
  }, []);

  const calculateOffsetLeft = useCallback(
    (
      column: Header<TData, unknown>[] | Cell<TData, unknown>[],
      currentIndex: number
    ): number => {
      const currentHeader = column[currentIndex - 1];
      const meta = currentHeader?.column.columnDef.meta;
      // const fixed = meta?.fixed;

      // if (fixed === "left") {
      //   const size = currentHeader.column.columnDef.size || 0;
      //   return size + calculateOffsetLeft(column, currentIndex - 1);
      // }

      return 0;
    },
    []
  );

  const calculateOffsetRight = useCallback(
    (
      column: Header<TData, unknown>[] | Cell<TData, unknown>[],
      currentIndex: number
    ): number => {
      const currentHeader = column[currentIndex + 1];
      const meta = currentHeader?.column.columnDef.meta;
      // const fixed = meta?.fixed;

      // if (fixed === "right") {
      //   const size = currentHeader.column.columnDef.size || 64;
      //   return size + calculateOffsetRight(column, currentIndex + 1);
      // }

      return 0;
    },
    []
  );

  useEffect(() => {
    const initialExpanded: ExpandedState = {};
    data?.forEach((_, index) => {
      initialExpanded[index.toString()] = true;
    });
    setExpanded(initialExpanded);
  }, [data]);

  return (
    <div {...props} className={cn("-m-4 p-4 overflow-hidden", props.className)}>
      {(controls.filter?.enabled ||
        controls.rowSelection?.enabled ||
        controls.column?.enabled ||
        controls.action?.enabled) && (
        <div className="flex items-center justify-between gap-2 mb-4 md:mb-6 lg:mb-8"> 

          {/* Filter/Search */}
          {controls.filter?.enabled && (
            <SearchInput
              defaultValue={controls.filter.keyword}
              placeholder={controls.filter.placeholder || "Search something"}
            />
          )}
          
          {controls.addData?.enabled && Form && (
            <div className="flex items-center gap-3">
              {/* Tombol New Entry */}
              <AlertDrawer open={open} onOpenChange={setOpen}>
                <AlertDrawerTrigger asChild>
                  <Button>
                    <PlusIcon />
                    New Entry
                  </Button>
                </AlertDrawerTrigger>
                <AlertDrawerContent>
                  <Form onSubmit={() => setOpen(false)} />
                </AlertDrawerContent>
              </AlertDrawer>

              {controls.rowSelection?.enabled &&
                table.getSelectedRowModel().rows.length > 0 &&
                controls.rowSelection.children(table)}
              {controls.column?.enabled && <DataTableViewOptions table={table} />}
              {controls.action?.enabled && controls.action.children}
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          "relative transition-opacity border-b",
          loading && "opacity-50 pointer-events-none"
        )}
      >
        {Boolean(data.length && loading) && (
          <div className="absolute inset-0 flex items-center justify-center pt-12">
            <SpinnerGapIcon className="text-primary size-8 animate-spin" />
          </div>
        )}
        <TableWrapper
          ref={tableRef}
          onScroll={handleScroll}
          onWheel={handleScroll}
        >
          <Table style={{ width: scroll.x }}>
            <colgroup className="table-column-group">
              {table.options.columns.map((column, key) => (
                <col key={key} style={{ width: column.size }} />
              ))}
            </colgroup>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index, items) => {
                    const meta = header.column.columnDef.meta;
                    // const fixed = meta?.fixed;

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "after:absolute after:top-0 after:bottom-px after:w-[30px] after:transition-shadow after:pointer-events-none",
                          // fixed === "left" &&
                          //   "after:right-0 after:translate-x-full",
                          // fixed === "right" &&
                          //   "after:left-0 after:-translate-x-full",
                          // fixed === "left" &&
                          //   showShadow &&
                          //   "after:shadow-[inset_10px_0_8px_-8px_rgba(5,5,5,0.06)]",
                          // fixed === "right" &&
                          //   "after:shadow-[inset_-10px_0_8px_-8px_rgba(5,5,5,0.06)]",
                          // fixed && "sticky"
                        )}
                        scope="col"
                        style={
                          {
                            // ...(fixed === "left" && {
                            //   left: calculateOffsetLeft(items, index),
                            //   zIndex: index,
                            // }),
                            // ...(fixed === "right" && {
                            //   right: calculateOffsetRight(items, index),
                            //   zIndex: items.length - index,
                            // }),
                            overflowWrap: "break-word",
                          } as any
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow className="border-b">
                  <TableCell
                    className="h-40 text-center pointer-events-none"
                    colSpan={columns.length}
                  >
                    <ErrorShowingRecords error={error} />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, key) => {
                  const isParentRow = !row.getParentRow();
                  return (
                    <TableRow className="group" key={row.id}>
                      {row.getVisibleCells().map((cell, index, items) => {
                        const meta = cell.column.columnDef.meta;
                        // const action = meta?.action;
                        // const fixed = meta?.fixed;

                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              "after:absolute after:top-0 after:bottom-px after:w-[30px] after:transition-shadow after:pointer-events-none",
                              // fixed === "left" &&
                              //   "after:right-0 after:translate-x-full",
                              // fixed === "right" &&
                              //   "after:left-0 after:-translate-x-full",
                              // fixed === "left" &&
                              //   showShadow &&
                              //   "after:shadow-[inset_10px_0_8px_-8px_rgba(5,5,5,0.06)]",
                              // fixed === "right" &&
                              //   "after:shadow-[inset_-10px_0_8px_-8px_rgba(5,5,5,0.06)]",
                              // fixed && "sticky transition-colors duration-0",
                              // action && "text-center",
                              isParentRow
                                ? "bg-background group-hover:bg-[#f8fafc]"
                                : "bg-accent group-hover:bg-accent"
                            )}
                            data-state={row.getIsSelected() && "selected"}
                            style={
                              {
                                // ...(fixed === "left" && {
                                //   left: calculateOffsetLeft(items, index),
                                //   zIndex: index,
                                // }),
                                // ...(fixed === "right" && {
                                //   right: calculateOffsetRight(items, index),
                                //   zIndex: items.length - index,
                                // }),
                                overflowWrap: "break-word",
                              } as any
                            }
                          >
                            {cell.column.columnDef.id === "number"
                              ? key + 1
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : !data.length && loading ? (
                <TableRow className="border-b">
                  <TableCell
                    className="h-40 text-center pointer-events-none"
                    colSpan={columns.length}
                  >
                    <LoadingRecords />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow className="border-b">
                  <TableCell
                    className="h-40 text-center pointer-events-none"
                    colSpan={columns.length}
                  >
                    <EmptyRecords keyword={controls.filter?.keyword} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
      {data.length > 0 && controls.pagination?.enabled && (
        <DataTablePagination
          page={controls.pagination.page}
          pageSize={controls.pagination.pageSize}
          totalCount={controls.pagination.totalCount}
        />
      )}
    </div>
  );
}

const ErrorShowingRecords = ({ error }: { error: Error }) => {
  return (
    <span className="absolute inset-x-0 h-40 top-12 inline-flex flex-col items-center justify-center gap-4">
      <svg
        width="64"
        height="41"
        viewBox="0 0 64 41"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Error</title>
        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
          <g fillRule="nonzero" stroke="#d9d9d9">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="#fafafa"
            ></path>
          </g>
        </g>
      </svg>
      <span>
        {"response" in error ? (
          <>
            <strong>{error.message}</strong>:{" "}
            {
              (error.response as unknown as AxiosError<{
                errors: ApiResponseError[];
              }>["response"])!.data.errors
            }
          </>
        ) : (
          JSON.stringify(error, null, 2)
        )}
      </span>
    </span>
  );
};

const EmptyRecords = ({ keyword }: { keyword?: string }) => {
  return (
    <span className="absolute inset-x-0 h-40 top-12 inline-flex flex-col items-center justify-center gap-4">
      <svg
        width="64"
        height="41"
        viewBox="0 0 64 41"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>No Data</title>
        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
          <g fillRule="nonzero" stroke="#d9d9d9">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="#fafafa"
            ></path>
          </g>
        </g>
      </svg>
      {keyword ? (
        <span>
          <strong>Not Found</strong>: Try using another keyword
        </span>
      ) : (
        <span className="text-muted-foreground">No data</span>
      )}
    </span>
  );
};

const LoadingRecords = () => {
  return (
    <span className="absolute inset-x-0 h-40 top-12 inline-flex flex-col items-center justify-center gap-4">
      <svg
        width="64"
        height="41"
        viewBox="0 0 64 41"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Loading</title>
        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
          <g fillRule="nonzero" stroke="#d9d9d9">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="#fafafa"
            ></path>
          </g>
        </g>
      </svg>
      Fetching data...
    </span>
  );
};

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <button
        className="w-full inline-flex items-center justify-between gap-2 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md transition-[color,box-shadow] h-8 px-3 -mx-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getIsSorted() ? (
          column.getIsSorted() === "desc" ? (
            <ArrowUpIcon className="size-4" />
          ) : (
            <ArrowDownIcon className="size-4" />
          )
        ) : (
          <ArrowsDownUpIcon className="size-4" />
        )}
      </button>
    </div>
  );
}

interface DataTableViewOptionsProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hidden lg:flex" variant="outline">
          <SlidersHorizontalIcon />
          View Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {/* {column.columnDef.meta?.label || column.id} */}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DataTablePaginationProps {
  page: string;
  pageSize: string;
  totalCount: number;
}

export function DataTablePagination({
  page,
  pageSize,
  totalCount,
}: DataTablePaginationProps) {
  return (
    <div className="mt-4 md:mt-6 lg:mt-8">
      <PaginationWithLinks
        page={+page}
        pageSearchParam="page"
        pageSize={+pageSize}
        pageSizeSelectOptions={{
          pageSizeOptions: [10, 20, 30, 40, 50],
          pageSizeSearchParam: "page_size",
        }}
        totalCount={totalCount}
      />
    </div>
  );
}

export function DataTableAction({
  blocks,
  children,
}: {
  blocks: { label: string; href?: string; onClick?: () => void }[];
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="!h-8 !w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsThreeIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {blocks.map((block, index) => (
            <Fragment key={index}>
              {index === blocks.length - 1}
              {block.onClick && (
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/5"
                    onClick={block.onClick}
                  >
                    {block.label}
                  </DropdownMenuItem>
                </DialogTrigger>
              )}
              {block.href && (
                <DropdownMenuItem onSelect={() => router.push(block.href!)}>
                  {block.label}
                </DropdownMenuItem>
              )}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </Dialog>
  );
}
