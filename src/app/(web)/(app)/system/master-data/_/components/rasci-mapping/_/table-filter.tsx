import { Funnel as FunnelIcon } from "@phosphor-icons/react/dist/ssr";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@altha/core/components/ui/button";
import { Checkbox } from "@altha/core/components/ui/checkbox";
import { Label } from "@altha/core/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@altha/core/components/ui/popover";
import { useFilterParams } from "@altha/core/hooks/use-filter-params";
import { useLevel } from "../../level/_/rpcs";

export const TableFilter = () => {
  const updateSearchParams = useFilterParams();

  const searchParams = useSearchParams();
  const queryParams = useMemo<Record<string, string[]>>(() => {
    const parsed: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      if (key === "filter") {
        value.split(";").forEach((item) => {
          const [filterKey, filterValue] = item.split(":");
          if (filterKey && filterValue) {
            parsed[filterKey] = [
              ...(parsed[filterKey] || []),
              ...filterValue.split(","), 
            ];
          }
        });
      } else {
        parsed[key] = value.split(",");
      }
    });

    return parsed;
  }, [searchParams]);
  
  const jobLevel = useLevel({ page: "1", page_size: "100" });

  const filters = useMemo(() => {
    return [
      ...(jobLevel.data
        ? [
            {
              key: "job_level",
              label: "By Job Level",
              options: jobLevel.data.data.records.map((value) => ({
                label: value.name,
                value: value.id,
              })),
            },
          ]
        : []),
      {
        key: "level",
        label: "By Level Activity",
        options: [
          { label: "Level 1", value: "L1" },
          { label: "Level 2", value: "L2" },
          { label: "Level 3", value: "L3" },
          { label: "Level 4", value: "L4" },
          { label: "Level 5", value: "L5" },
        ],
      }
    ];
  }, []);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FunnelIcon />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-w-[240px] max-h-[400px] flex flex-col gap-2 overflow-hidden"
        side="bottom"
      >
        <div className="flex-1 overflow-y-auto">
          {filters.map((filter) => (
            <div key={filter.label}>
              <p className="py-1.5 text-sm font-semibold">{filter.label}</p>
              <ul>
                {filter.options.map((option) => (
                  <li
                    key={option.label}
                    className="flex items-center gap-2 py-1.5"
                  >
                    <Checkbox
                      id={option.value}
                      defaultChecked={
                        queryParams[filter.key]?.includes(option.value) ?? false
                      }
                      onCheckedChange={(checked) =>
                        updateSearchParams(
                          filter.key,
                          option.value,
                          Boolean(checked)
                        )
                      }
                    />
                    <Label className="font-normal" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
