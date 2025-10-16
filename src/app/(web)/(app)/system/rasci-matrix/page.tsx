"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@altha/core/components/ui/card";
import { useRasciMatrix } from "./_/use-rasci-matrix";
import { buttonVariants } from "@altha/core/components/ui/button";
import { cn } from "@altha/core/libs/utils";
import Link from "next/link";
import { Sparkles, Loader2 } from "lucide-react";
import { EmptyState } from "@altha/core/components/ui/empty-state";
import { useMemo, useState } from "react";
import { RasciFilterBar } from "./rasci-filter";
import { toast } from "sonner";

function TreeItem({ item, level = 0 }: { item: any; level?: number }) {
  const outlineColorMap: Record<string, string> = {
    L1: "border-blue-700 text-blue-700",
    L2: "border-orange-600 text-orange-600",
    L3: "border-green-700 text-green-700",
    L4: "border-yellow-500 text-yellow-500",
    L5: "border-gray-500 text-gray-500",
  };

  const levelColor =
    outlineColorMap[item.level_activities.level_name] ||
    "border-gray-400 text-gray-400";

  return (
    <div className="py-1" style={{ paddingLeft: `${level * 16}px` }}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          {item.level_activities.description}
          <span
            className={`text-xs rounded-full border px-2 py-0.5 font-medium ${levelColor}`}
          >
            {item.level_activities.level_name}
          </span>
        </span>
      </div>
      {item.children?.length > 0 && (
        <div className="mt-1">
          {item.children.map((child: any) => (
            <TreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PageRasciMatrix() {
  const { data, handleGenerateJobDesc, isGenerating, generatedResult } = useRasciMatrix();
  const rasciData = data[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{ rasci: string[]; levels: string[] }>({
    rasci: [],
    levels: [],
  });
 
  const filteredData = useMemo(() => {
    if (!rasciData?.detail) return {}; 

    const q = (searchQuery || "").trim().toLowerCase();

    function nodeMatches(node: any) {
      const desc = node?.level_activities?.description ?? "";
      const levelName = node?.level_activities?.level_name ?? "";

      const matchesSearch =
        !q ||
        desc.toLowerCase().includes(q) ||
        levelName.toLowerCase().includes(q);

      const matchesLevel =
        !filters.levels || filters.levels.length === 0 ||
        filters.levels.includes(levelName);

      return matchesSearch && matchesLevel;
    }

    function filterNode(node: any): any | null {
      // process children first
      const children = node?.children ?? [];
      const filteredChildren = children
        .map((c: any) => filterNode(c))
        .filter(Boolean);

      const selfMatches = nodeMatches(node);

      if (selfMatches || filteredChildren.length > 0) {
        // return shallow copy with filtered children
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return null;
    }

    const result: Record<string, any[]> = {};

    for (const key of ["R", "A", "S", "C", "I"]) {
      if (filters.rasci && filters.rasci.length > 0 && !filters.rasci.includes(key)) {
        result[key] = [];
        continue;
      }

      const group = rasciData.detail[key] ?? [];
      result[key] = group
        .map((item: any) => filterNode(item))
        .filter(Boolean) as any[];
    }

    return result;
  }, [rasciData, searchQuery, filters]);

  const hasAnyData = ["R", "A", "S", "C", "I"].some(
    (key) => (filteredData?.[key]?.length ?? 0) > 0
  );
  
  const rasciButtons = [
    { key: "R", color: "text-blue-900 border-blue-900 " },
    { key: "A", color: "text-orange-700 border-orange-700 " },
    { key: "S", color: "text-green-700 border-green-700 " },
    { key: "C", color: "text-yellow-600 border-yellow-600 " },
    { key: "I", color: "text-gray-600 border-gray-600 " },
  ];

  const handleGenerateAi = async () => {
    if (!rasciData) return;
    try {
      await handleGenerateJobDesc(rasciData.position, rasciData);  
    } catch (err: any) {
      toast.error("Job Description Failed Generated");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{rasciData?.position.name ?? "No Data Available"}</CardTitle>
            <Link
              href="#"
              onClick={handleGenerateAi}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex items-center gap-2",
                !hasAnyData || isGenerating && "opacity-50 pointer-events-none cursor-not-allowed"
              )}
              aria-disabled={!hasAnyData || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin " />
                  Generating AI Description...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Job Description
                </>
              )}
            </Link>
          </div>
          <CardDescription>
            <div className="flex flex-wrap gap-2">
              {rasciButtons.map(({ key, color }) => (
                <button
                  key={key}
                  disabled
                  className={`${color} border bg-transparent mr-2 px-4 py-2 rounded-md text-sm font-medium transition`}
                >
                  {key}: {rasciData?.total?.[key] ?? 0}
                </button>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RasciFilterBar
            onSearchChange={setSearchQuery}
            onFilterChange={setFilters}
          />

          {hasAnyData ? (
            <>
              <div className="flex flex-col gap-6">
                {["R", "A", "S", "C", "I"].map((key) => {
                  const group = filteredData?.[key];
                  if (!group || group.length === 0) return null;

                  const labelMap: Record<string, string> = {
                    R: "Responsible",
                    A: "Accountable",
                    S: "Support",
                    C: "Consulted",
                    I: "Informed",
                  };

                  return (
                    <Card key={key}>
                      <CardHeader className="bg-gray-100 rounded-md !p-0 !px-3 !py-3">
                        <CardTitle className="flex items-center justify-between text-sm font-semibold">
                          <span className="text-gray-600">{labelMap[key]}</span>
                          <span className="text-xs text-gray-500">
                            {rasciData?.total?.[key] ?? 0}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="!p-0 !-mt-0">
                        <div className="divide-y divide-gray-200">
                          {group.map((item: any) => (
                            <div key={item.id} className="px-4 py-3">
                              <TreeItem item={item} level={0} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-10">
              <EmptyState />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
