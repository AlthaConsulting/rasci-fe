import { toast } from "sonner";
import { useForm as ReactHookForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateDetailGenerate } from "@altha/app/(web)/(app)/content/_/api/rcps";

const schema = z.object({
  generated_ai_id: z.string().optional(),
  job_purpose: z.string().min(1, "Job purpose cannot be empty"),
  key_responsibility: z.string().min(1, "Key responsibility cannot be empty"),
  job_description: z.string().min(1, "Job description cannot be empty"),
  kpi: z.string().min(1, "KPIs cannot be empty"),
  job_output: z.string().min(1, "Job output cannot be empty"),
  is_edited_purpose: z.boolean().optional(),
  is_edited_responsibility: z.boolean().optional(),
  is_edited_description: z.boolean().optional(),
  is_edited_kpi: z.boolean().optional(),
  is_edited_output: z.boolean().optional(),
})

export const useForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: any;
  onSubmit?: () => void;
}) => {
  const form = ReactHookForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      generated_ai_id: initialData?.id,
      job_purpose: initialData?.job_purpose ?? "",
      key_responsibility: initialData?.key_responsibility ?? "",
      job_description: initialData?.job_description ?? "",
      kpi: initialData?.kpi ?? "",
      job_output: initialData?.job_output ?? "",
      is_edited_purpose: initialData?.is_edited_purpose,
      is_edited_responsibility: initialData?.is_edited_responsibility,
      is_edited_description: initialData?.is_edited_description,
      is_edited_kpi: initialData?.is_edited_kpi,
      is_edited_output: initialData?.is_edited_output,
    },
  });

  const updateDetailGenerate = useUpdateDetailGenerate();
    const mutation = updateDetailGenerate;

    const submitHandler = useCallback(
    (data: z.infer<typeof schema>) => {
      mutation.mutate(
        {
          id: initialData?.id!, 
          job_purpose: data.job_purpose, 
          key_responsibility: data.key_responsibility, 
          job_description: data.job_description, 
          kpi: data.kpi, 
          job_output: data.job_output, 
          is_edited_purpose: data.is_edited_purpose, 
          is_edited_responsibility: data.is_edited_responsibility, 
          is_edited_description: data.is_edited_description, 
          is_edited_kpi: data.is_edited_kpi, 
          is_edited_output: data.is_edited_output, 
        },
        {
          onError(error) {
            toast.error("Failed to update data", {
              description: error.response?.data.errors?.[0]?.message || error.message,
              descriptionClassName: "!text-destructive",
            });
          },
          onSuccess() {
            onSubmit?.();
            toast.success("Data updated successfully");
          },
        }
      );
    },
    [mutation, onSubmit, initialData?.id]
  );

  return {
    form,
    mutation,
    submitHandler,
  };
};
