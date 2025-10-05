"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@altha/core/components/ui/card";
import { Form } from "./_/form";
import { useTable } from "./_/use-table";
import { DataTable } from "@altha/core/components/ui/data-table";
import { TableFilter } from "./_/table-filter";

export default function PageRasciMapping() {
  const { columns, data, error, loading, pagination, params } = useTable();

  return (
    <Card>
      <CardHeader>
        <CardTitle>RASCI Mapping</CardTitle>
        <CardDescription>
          Master data for rasci mapping, try to upload csv file or manual add.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          form={Form}
          data={data}
          columns={columns}
          controls={{
            action: {
              enabled: true,
              children: (
                <div className="flex items-center gap-4">
                  <TableFilter />
                </div>
              ),
            },
            filter: {
              enabled: true,
              keyword: params.q || "",
              placeholder: "Search data...",
            },
            pagination,
          }}
          error={error}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
