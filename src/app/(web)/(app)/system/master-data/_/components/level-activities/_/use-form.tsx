import { toast } from "sonner";
import { useForm as ReactHookForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLevelActivities, useCreateActivity, useUpdateActivity, useImportActivity } from "./rpcs";

// Schema for manual entry
const manualSchema = z.object({
  entry: z.literal("manual"),
  index: z.string().min(1, { message: "Index cannot be empty" }),
  level: z.string({ required_error: "Level is required" }),
  parent: z.string().optional(),
  description: z.string().min(1, { message: "Description activity cannot be empty" }),
  file: z.any().optional(),
});

// Schema for import file
const importSchema = z.object({
  entry: z.literal("import"),
  file: z
    .custom<File[]>()
    .refine((val) => val.length > 0, "File cannot be empty"),
});

const schema = z.discriminatedUnion("entry", [manualSchema, importSchema]);

export const useForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: any;
  onSubmit?: () => void;
}) => {
  const isEditing = useMemo(() => !!initialData, [initialData]);

  const form = ReactHookForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      entry: "manual",
      index: initialData?.index || "",
      level: initialData?.level || undefined,
      parent: initialData?.parent || undefined,
      description: initialData?.description || "",
      file: []
    },
  });

  const entry = form.watch("entry");
  const levelActivities = useLevelActivities({ page: "1", page_size: "100" });

  const createActivity = useCreateActivity();
  const updateActivity = useUpdateActivity();
  const importActivity = useImportActivity(); 
  const mutation =
    entry === "import"
      ? importActivity
      : isEditing
      ? updateActivity
      : createActivity;

  const submitHandler = useCallback(
    (data: z.infer<typeof schema>) => {
      let payload: any;

      if (data.entry === "manual") {
        payload = isEditing
          ? {
              id: initialData!.id,
              level: data.level,
              index: data.index,
              parent: data.parent,
              description: data.description,
            }
          : {
              level: data.level,
              index: data.index,
              parent: data.parent,
              description: data.description,
            };
      } else {
        // import mode
        payload = new FormData();
        payload.append("file", data.file[0]);
      }
      
      mutation.mutate(payload, {
        onError(error: any) {
          toast.error(
            `Failed to ${isEditing ? "update" : "create"} level activity`,
            {
              description: error.response?.data.errors?.[0]?.message,
            }
          );
        },
        onSuccess() {
          onSubmit?.();
          toast.success(
            `Level Activity ${
              isEditing ? "updated" : "created/imported"
            } successfully`
          );
        },
      });
    },
    [entry, isEditing, mutation, onSubmit, initialData]
  );

  return {
    levelActivities,
    isEditing,
    form,
    mutation,
    submitHandler,
  };
};
