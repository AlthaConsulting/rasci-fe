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

export default function PagePosition() {
  const { columns, data, error, loading, pagination, params } = useTable();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Position</CardTitle>
        <CardDescription>
          Master data for job position, try to upload csv file or manual add.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          form={Form}
          data={data}
          columns={columns}
          controls={{
            filter: {
              enabled: true,
              keyword: params.q || "",
              placeholder: "Search job position...",
            },
            pagination,
            addData: { enabled: true },
          } as any }
          error={error}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
