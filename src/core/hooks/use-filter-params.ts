"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = (
    category: string,
    value: string,
    isChecked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const filterParam = params.get("filter") || ""; // Ambil filter yang ada

    // Ubah string "filter" menjadi object
    const filterMap = filterParam
      ? Object.fromEntries(
          filterParam.split(";").map((entry) => {
            const [key, values] = entry.split(":");
            return [key, values ? values.split(",") : []];
          })
        )
      : {};

    if (isChecked) {
      // Tambahkan value baru ke kategori yang dipilih
      filterMap[category] = [...(filterMap[category] || []), value];
    } else {
      // Hapus value dari kategori
      filterMap[category] = (filterMap[category] || []).filter(
        (v) => v !== value
      );
      if (filterMap[category].length === 0) delete filterMap[category]; // Hapus kategori jika kosong
    }

    // Convert kembali ke format string
    const newFilterString = Object.entries(filterMap)
      .map(([key, values]) => `${key}:${values.join(",")}`)
      .join(";");

    if (newFilterString) {
      params.set("filter", newFilterString);
    } else {
      params.delete("filter");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return updateSearchParams;
};
