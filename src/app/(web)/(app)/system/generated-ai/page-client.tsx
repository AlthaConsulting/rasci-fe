"use client";

import { cn } from "@altha/core/libs/utils";
import { useAiGenerated } from "./_/use-generated-ai";
import { CircleArrowRight, Search, Sparkles } from "lucide-react";
import { EmptyState } from "@altha/core/components/ui/empty-state";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageAiGenerated() {
  const { data, error, loading, params } = useAiGenerated();
  const [search, setSearch] = useState("");
  const router = useRouter();
  
  const handleViewMore = (id: any) => {
    router.push(`/system/generated-ai/${id}`); 
  };

  const filteredData = data?.filter((item) =>
    item.position.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!data || data.length === 0) {
    return (
      <div className="mt-10 md:mt-20 lg:mt-28">
        <EmptyState />
      </div>
    );
  }
 
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-5 py-3 pl-12 text-sm focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData?.map((item, index) => {
            return (
              <div
                key={item.position.id}
                className="rounded-xl border shadow-sm p-6 bg-white flex flex-col justify-between"
              >
                <div className="flex flex-col items-center mb-4 text-center">
                  <button
                    disabled
                    className={cn(
                      "flex items-center rounded-full text-blue-900 border-blue-900 border mb-4 px-3 py-1 gap-2 text-sm font-medium"
                    )}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Generated
                  </button>
                  <h3 className="text-lg font-bold text-blue-900">
                    {item.position.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-auto">
                  <button 
                    onClick={() => handleViewMore(item.id)}
                    className="text-sm text-blue-900 font-medium flex items-center gap-1"
                  >
                    <span>View more</span>
                  </button>

                  <button 
                    onClick={() => handleViewMore(item.id)}
                    className="text-sm text-blue-900 font-medium flex items-center gap-1"
                  >
                    <CircleArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
