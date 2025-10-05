import { toast } from "sonner";
import { useForm as ReactHookForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePosition, useCreatePosition, useUpdatePosition, useImportPosition } from "./rpcs";

// Schema for manual entry
const manualSchema = z.object({
  entry: z.literal("manual"),
  name: z.string().min(1, { message: "Position name cannot be empty" }),
  file: z.custom<File[]>()
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
      name: initialData?.name || "",
      file: []
    },
  });

  const entry = form.watch("entry");
  const position = usePosition({ page: "1", page_size: "100" });

  const createPosition = useCreatePosition();
  const updatePosition = useUpdatePosition();
  const importPosition = useImportPosition(); 
  const mutation =
    entry === "import"
      ? importPosition
      : isEditing
      ? updatePosition
      : createPosition;

  const submitHandler = useCallback(
    (data: z.infer<typeof schema>) => {
      let payload: any;

      if (data.entry === "manual") {
        payload = isEditing
          ? {
              id: initialData!.id,
              name: data.name
            }
          : {
              name: data.name,
            };
      } else {
        // import mode
        payload = new FormData();
        payload.append("file", data.file[0]);
      }
      
      mutation.mutate(payload, {
        onError(error: any) {
          toast.error(
            `Failed to ${isEditing ? "update" : "create"} position`,
            {
              description: error.response?.data.errors?.[0]?.message,
            }
          );
        },
        onSuccess() {
          onSubmit?.();
          toast.success(
            `Position ${
              isEditing ? "updated" : "created/imported"
            } successfully`
          );
        },
      });
    },
    [entry, isEditing, mutation, onSubmit, initialData]
  );

  return {
    position,
    isEditing,
    form,
    mutation,
    submitHandler,
  };
};
