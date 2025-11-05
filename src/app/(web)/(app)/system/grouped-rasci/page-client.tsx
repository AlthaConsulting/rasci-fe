"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@altha/core/components/ui/card";
import { useTable } from "./_/use-table";
import { DataTable } from "@altha/core/components/ui/data-table";

export default function PageGroupedRasci() {
  const { columns, data, error, loading, pagination, params } = useTable();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Job Positions</CardTitle>
          <CardDescription>
            Job positions overall view with rasci mapping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            form={null}
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
    </div>
  );
}
