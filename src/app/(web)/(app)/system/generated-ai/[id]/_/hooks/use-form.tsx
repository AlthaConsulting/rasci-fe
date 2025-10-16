import { toast } from "sonner";
import { useForm as ReactHookForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateDetailGenerate } from "@altha/app/(web)/(app)/content/_/api/rcps";

const schema = z.object({
  generated_ai_id: z.string().optional(),
  job_purpose: z.string().min(1, "Job purpose cannot be empty"),
  job_description: z.string().min(1, "Job description cannot be empty"),
  kpi: z.string().min(1, "KPIs cannot be empty"),
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
      job_description: initialData?.job_description ?? "",
      kpi: initialData?.kpi ?? "",
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
          job_description: data.job_description, 
          kpi: data.kpi, 
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
