// import { toast } from "sonner";
// import { useForm as ReactHookForm } from "react-hook-form";
// import { useCallback, useMemo } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useRasciMapping, useCreateRasciMapping, useUpdateRasciMapping, useImportRasciMapping } from "./rpcs";
// import { usePosition } from "../../position/_/rpcs";
// import { useLevelActivities } from "../../level-activities/_/rpcs";

// // Schema for manual entry
// const manualSchema = z.object({
//   entry: z.literal("manual"),
//   level_activities: z.string({ required_error: "Level activity is required" }),
//   position: z.string({ required_error: "Position is required" }),
//   rasci: z.string({ required_error: "RASCI mapping is required" }),
//   file: z.any().optional(),
// });

// // Schema for import file
// const importSchema = z.object({
//   entry: z.literal("import"),
//   file: z
//     .custom<File[]>()
//     .refine((val) => val.length > 0, "File cannot be empty"),
// });

// const schema = z.discriminatedUnion("entry", [manualSchema, importSchema]);

// export const useForm = ({
//   initialData,
//   onSubmit,
// }: {
//   initialData?: any;
//   onSubmit?: () => void;
// }) => {
//   const isEditing = useMemo(() => !!initialData, [initialData]);

//   const form = ReactHookForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       entry: "manual",
//       level_activities: initialData?.level_activities.id || undefined,
//       position: initialData?.position.id || undefined,
//       rasci: initialData?.rasci || undefined,
//       file: []
//     },
//   });

//   const entry = form.watch("entry");
//   const levelActivities = useLevelActivities({ page: "1", page_size: "100" });
//   const position = usePosition({ page: "1", page_size: "100" });

//   const createRasci = useCreateRasciMapping();
//   const updateRasci = useUpdateRasciMapping();
//   const importRasci = useImportRasciMapping(); 
//   const mutation =
//     entry === "import"
//       ? importRasci
//       : isEditing
//       ? updateRasci
//       : createRasci;

//   const submitHandler = useCallback(
//     (data: z.infer<typeof schema>) => {
//       let payload: any;

//       if (data.entry === "manual") {
//         payload = isEditing
//           ? {
//               id: initialData!.id,
//               level_activities: data.level_activities,
//               position: data.position,
//               rasci: data.rasci,
//             }
//           : {
//               level_activities: data.level_activities,
//               position: data.position,
//               rasci: data.rasci,
//             };
//       } else {
//         // import mode
//         payload = new FormData();
//         payload.append("file", data.file[0]);
//       }
      
//       mutation.mutate(payload, {
//         onError(error: any) {
//           toast.error(
//             `Failed to ${isEditing ? "update" : "create"} rasci mapping`,
//             {
//               description: error.response?.data.errors?.[0]?.message,
//             }
//           );
//         },
//         onSuccess() {
//           onSubmit?.();
//           toast.success(
//             `RASCI Mapping ${
//               isEditing ? "updated" : "created/imported"
//             } successfully`
//           );
//         },
//       });
//     },
//     [entry, isEditing, mutation, onSubmit, initialData]
//   );

//   return {
//     levelActivities,
//     position,
//     isEditing,
//     form,
//     mutation,
//     submitHandler,
//   };
// };
