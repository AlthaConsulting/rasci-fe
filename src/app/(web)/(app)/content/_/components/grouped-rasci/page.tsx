"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@altha/core/components/ui/card";
// import { Form } from "./_/form";
import { useTable } from "./_/use-table";
import { DataTable } from "@altha/core/components/ui/data-table";

export default function PageGroupedRasci() {
  const { columns, data, error, loading, pagination, params } = useTable();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Positions</CardTitle>
        <CardDescription>
          Job positions with RASCI total count.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          form={""}
          data={data}
          columns={columns}
          controls={{
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
