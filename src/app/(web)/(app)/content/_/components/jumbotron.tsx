"use client";

import { useState } from "react";
import { Button } from "@altha/core/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@altha/core/components/ui/select";
import { usePosition } from "../../../system/master-data/_/components/position/_/rpcs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Jumbotron() {
  const [selectedJob, setSelectedJob] = useState("");
  const position = usePosition({ page: "1", page_size: "100" });
  const router = useRouter();

  const recentlySearched = [
    "Internal Audit Division Head",
    "Corporate Secretary & Protocol Division Head",
    "Secretarial Unit Head",
  ];

  const handleGenerate = () => {
    if (!selectedJob) {
      toast.info(`Please choose a job position first!`)
      return;
    }
    router.push(`/system/rasci-matrix?filter=job_position:${selectedJob}`)
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-blue-100 via-blue-200 to-blue-400 p-10 text-center">
      <h1 className="text-3xl font-semibold mb-2 text-gray-900">
        Ready to build a new Job Description?
      </h1>
      <p className="text-gray-700 mb-8">
        Pick a job position and preview the RASCI matrix
      </p>

      {/* Search Input */}
      <div className="flex justify-center items-center gap-3 mb-8">
        <div className="relative w-[380px]">
          <Select
            value={selectedJob}
            onValueChange={setSelectedJob}
            disabled={position.isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose job position" />
            </SelectTrigger>
            {position.data && (
              <SelectContent>
                {position.data.data.records.length > 0 ? (
                  position.data.data.records.map((value: any) => (
                    <SelectItem key={value.id} value={String(value.id)}>
                      {value.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectEmpty />
                )}
              </SelectContent>
            )}
          </Select>
        </div>

        <Button
          onClick={handleGenerate}
          className="bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-2 px-5 py-3 rounded-md"
        >
          <Sparkles className="w-4 h-4" />
          Generate Job Description
        </Button>
      </div>

      {/* Recently searched */}
      {position.data && position.data.data.records.length > 0 && (
        <div>
          <p className="text-gray-600 mb-3 font-medium">Recently searched</p>
          <div className="flex justify-center flex-wrap gap-3">
            {recentlySearched.map((job) => (
              <button
                key={job}
                disabled
                className="bg-blue-950 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
              >
                {job}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
