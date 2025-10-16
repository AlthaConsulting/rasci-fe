"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@altha/core/libs/utils";

interface RasciFilterBarProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: { rasci: string[]; levels: string[] }) => void;
}

const rasciKeys = ["R", "A", "S", "C", "I"];
const levelKeys = ["L1", "L2", "L3", "L4", "L5"];

export function RasciFilterBar({ onSearchChange, onFilterChange }: RasciFilterBarProps) {
  const [search, setSearch] = useState("");
  const [selectedRasci, setSelectedRasci] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const toggleFilter = (key: string, type: "rasci" | "level") => {
    if (type === "rasci") {
      const newRasci = selectedRasci.includes(key)
        ? selectedRasci.filter((r) => r !== key)
        : [...selectedRasci, key];
      setSelectedRasci(newRasci);
      onFilterChange({ rasci: newRasci, levels: selectedLevels });
    } else {
      const newLevels = selectedLevels.includes(key)
        ? selectedLevels.filter((l) => l !== key)
        : [...selectedLevels, key];
      setSelectedLevels(newLevels);
      onFilterChange({ rasci: selectedRasci, levels: newLevels });
    }
  };

  return (
    <div className="flex items-center gap-4 justify-between border rounded-lg px-4 py-3 mb-5">
      <div className="flex items-center gap-2 flex-1">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search business process"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            onSearchChange(value);
          }}
          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
        />
      </div>
      <div className="h-5 w-px bg-gray-200" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Filter</span>
        {rasciKeys.map((key) => (
          <button
            key={key}
            onClick={() => toggleFilter(key, "rasci")}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-md text-white text-sm font-semibold",
              selectedRasci.includes(key)
                ? "bg-blue-900"
                : "border border-gray-200 text-gray-500 hover:bg-blue-900/70 hover:text-gray-100"
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="h-5 w-px bg-gray-200" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Levels</span>
        {levelKeys.map((key) => (
          <button
            key={key}
            onClick={() => toggleFilter(key, "level")}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-md text-white text-sm font-semibold",
              selectedLevels.includes(key)
                ? "bg-blue-900"
                : "border border-gray-200 text-gray-500 hover:bg-blue-900/70 hover:text-gray-100"
            )}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
