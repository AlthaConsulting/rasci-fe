"use client";

import { EmptyState } from "@altha/core/components/ui/empty-state";
import { useMainPage } from "../api/rcps";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CircleArrowRight,
} from "lucide-react";
import Jumbotron from "./jumbotron";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = searchParams.get("filter") || undefined;
  const mainPage = useMainPage({filter});
  
  const handleViewMore = (id: any) => {
    router.push(`/system/grouped-rasci?filter=job_level:${id}`); 
  };

  return (
    <div className="space-y-8">
      <Jumbotron />
      <div>
        {(mainPage.data?.length ?? 0) > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainPage.data?.map((item, index) => {
              const positions = item.positions || [];
              const displayPositions =
                positions.length >= 4
                  ? positions.slice(0, 4)
                  : [
                      ...positions,
                      ...Array.from({ length: Math.max(0, 4 - positions.length) }, (_, i) => ({
                        id: `placeholder-${i}`,
                        name: "-",
                      })),
                    ];

              return (
                <div
                  key={item.level.id}
                  className="rounded-xl border shadow-sm p-6 bg-white flex flex-col"
                >
                  <div className="flex flex-col items-center mb-4 text-center">
                    <h3 className="text-lg font-bold text-blue-900">
                      {item.level.name}
                    </h3>
                  </div>

                  <ul className="flex-1 divide-y divide-gray-200">
                    {displayPositions.map((pos: any) => (
                      <li
                        key={pos.id}
                        className={`text-gray-700 text-sm py-2 ${
                          pos.name === "..." ? "italic text-gray-400" : ""
                        }`}
                      >
                        {pos.name}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <button 
                      onClick={() => handleViewMore(item.level.id)}
                      className="text-sm text-blue-900 font-medium flex items-center gap-1"
                    >
                      <span>View more</span>
                    </button>

                    <button 
                      onClick={() => handleViewMore(item.level.id)}
                      className="text-sm text-blue-900 font-medium flex items-center gap-1"
                    >
                      <CircleArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  )
}
