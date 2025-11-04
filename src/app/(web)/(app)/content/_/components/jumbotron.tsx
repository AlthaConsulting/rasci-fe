"use client";

import { useEffect, useState } from "react";
import { Button } from "@altha/core/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
} from "@altha/core/components/ui/combobox";
import { usePosition } from "../../../system/master-data/_/components/position/_/rpcs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Jumbotron() {
  const [selectedJob, setSelectedJob] = useState("");
  const [recentlySearched, setRecentlySearched] = useState<string[]>([]);
  const position = usePosition({ page: "1", page_size: "100" });
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("recentlySearchedJobs");
    if (saved) setRecentlySearched(JSON.parse(saved));
  }, []);

  const handleSelectJob = (value: string) => {
    setSelectedJob(value);

    const jobName =
      position.data?.data?.records?.find((v: any) => String(v.id) === value)
        ?.name ?? "";

    if (!jobName) return;

    setRecentlySearched((prev) => {
      const updated = [jobName, ...prev.filter((j) => j !== jobName)].slice(0, 3);
      localStorage.setItem("recentlySearchedJobs", JSON.stringify(updated));
      return updated;
    });
  };

  const handleGenerate = () => {
    if (!selectedJob) {
      toast.info(`Please choose a job position first!`)
      return;
    }
    router.push(`/system/rasci-matrix?filter=job_position:${selectedJob}`)
  };

  const comboItems =
    position.data?.data?.records?.map((v: any) => ({
      label: v.name,
      value: String(v.id),
    })) ?? [];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-blue-100 via-blue-200 to-blue-400 p-10 text-center">
      <h1 className="text-3xl font-semibold mb-2 text-gray-900">
        Ready to build a new Job Description?
      </h1>
      <p className="text-gray-700 mb-8">
        Pick a job position and preview the RASCI matrix
      </p>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
        <div className="relative w-full sm:w-[380px]">
          <Combobox
            list={comboItems}
            defaultValue={selectedJob}
            onValueChange={handleSelectJob}
          >
            <ComboboxTrigger>
              <ComboboxValue placeholder="Choose job position" />
            </ComboboxTrigger>

            <ComboboxContent>
              <ComboboxInput placeholder="Search position by name" />
              <ComboboxList>
                <ComboboxGroup>
                  {comboItems.length > 0 ? (
                    comboItems.map((value) => (
                      <ComboboxItem key={value.value} value={value.value}>
                        {value.label}
                      </ComboboxItem>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No job positions found
                    </div>
                  )}
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <Button
          onClick={handleGenerate}
          className="bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-md w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4" />
          Generate Job Description
        </Button>
      </div>

      {/* Recently searched */}
      {recentlySearched.length > 0 && (
        <div>
          <p className="text-gray-600 mb-3 font-medium">Recently searched</p>
          <div className="flex justify-center flex-wrap gap-3">
            {recentlySearched.map((job) => (
              <button
                key={job}
                onClick={() => {
                  const jobObj = comboItems.find((i) => i.label === job);
                  if (jobObj) {
                    setSelectedJob(jobObj.value);
                    router.push(
                      `/system/rasci-matrix?filter=job_position:${jobObj.value}`
                    );
                  }
                }}
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
