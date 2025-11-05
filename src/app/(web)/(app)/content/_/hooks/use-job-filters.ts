// import { useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useDepartments, useOfficeLocations, useYearExperience } from "../api/rcps";

// const useUpdateSearchParams = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const updateSearchParams = (
//     category: string,
//     value: string,
//     isChecked: boolean
//   ) => {
//     const params = new URLSearchParams(searchParams.toString());
//     const filterParam = params.get("filter") || ""; // Ambil filter yang ada

//     // Ubah string "filter" menjadi object
//     const filterMap = filterParam
//       ? Object.fromEntries(
//           filterParam.split(";").map((entry) => {
//             const [key, values] = entry.split(":");
//             return [key, values ? values.split(",") : []];
//           })
//         )
//       : {};

//     if (isChecked) {
//       // Tambahkan value baru ke kategori yang dipilih
//       filterMap[category] = [...(filterMap[category] || []), value];
//     } else {
//       // Hapus value dari kategori
//       filterMap[category] = (filterMap[category] || []).filter(
//         (v) => v !== value
//       );
//       if (filterMap[category].length === 0) delete filterMap[category]; // Hapus kategori jika kosong
//     }

//     // Convert kembali ke format string
//     const newFilterString = Object.entries(filterMap)
//       .map(([key, values]) => `${key}:${values.join(",")}`)
//       .join(";");

//     if (newFilterString) {
//       params.set("filter", newFilterString);
//     } else {
//       params.delete("filter");
//     }

//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   return updateSearchParams;
// };

// export const useJobFilters = () => {
//   const updateSearchParams = useUpdateSearchParams();
//   const searchParams = useSearchParams();

//   // HC System Data
//   const departments = useDepartments({ page: "1", page_size: "100" });
//   const officeLocations = useOfficeLocations({ page: "1", page_size: "100" });
//   const YearsExperience = useYearExperience({ page: "1", page_size: "100" });

//   const filters = [
//     ...(departments.data
//     ? [
//         {
//           key: "department",
//           label: "Department",
//           options: departments.data.data.records.map((department) => ({
//             label: department.name,
//             value: department.id,
//           })),
//         },
//       ]
//     : []),
//     ...(YearsExperience.data
//     ? [
//         {
//           key: "years_of_experience",
//           label: "Years of Experience",
//           options: YearsExperience.data.data.records.map((yearsExperience) => ({
//             label: yearsExperience.name,
//             value: yearsExperience.id,
//           })),
//         },
//       ]
//     : []),
//     ...(officeLocations.data
//     ? [
//         {
//           key: "office_location",
//           label: "Office Location",
//           options: officeLocations.data.data.records.map((officeLocation) => ({
//             label: officeLocation.name,
//             value: officeLocation.id,
//           })),
//         },
//       ]
//     : []),
//     {
//       key: "employment_type",
//       label: "Employment Type",
//       options: [
//         {
//           label: "Permanent",
//           value: "Permanent",
//         },
//         {
//           label: "Project Based",
//           value: "Project Based",
//         },
//         {
//           label: "Internship",
//           value: "Internship",
//         },
//       ],
//     },
//   ];

//   const queryParams = useMemo<Record<string, string[]>>(() => {
//     const parsed: Record<string, string[]> = {};

//     searchParams.forEach((value, key) => {
//       if (key === "filter") {
//         value.split(";").forEach((item) => {
//           const [filterKey, filterValue] = item.split(":");
//           if (filterKey && filterValue) {
//             parsed[filterKey] = [
//               ...(parsed[filterKey] || []),
//               ...filterValue.split(","), 
//             ];
//           }
//         });
//       } else {
//         parsed[key] = value.split(",");
//       }
//     });

//     return parsed;
//   }, [searchParams]);

//   return {
//     filters,
//     searchParams: queryParams,
//     updateSearchParams,
//   };
// };
