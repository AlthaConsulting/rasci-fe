import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useWorkingExperienceForm = ({
  onSubmitted,
}: {
  onSubmitted?: () => void;
}) => {
  const formSchema = z.object({
    experiences: z.array(
      z
        .object({
          company_name: z.string().min(1, "Company name cannot be empty"),
          position: z.string().min(1, "Position cannot be empty"),
          start_date: z.date({ required_error: "Start date cannot be empty" }),
          end_date: z.optional(z.date().nullable()),
          still_working: z.boolean(),
        })
        .refine(
          ({ end_date, still_working }) => {
            if (!still_working) return Boolean(end_date);
            return true;
          },
          {
            message: "End date cannot be empty",
            path: ["end_date"],
          }
        )
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: [
        {
          company_name: "",
          position: "",
          start_date: undefined,
          end_date: undefined,
          still_working: false,
        },
      ],
    },
  });

  const submitHandler = form.handleSubmit(() => {
    if (onSubmitted) onSubmitted();
  });

  const shouldDisableForm = useMemo(
    () =>
      !form.formState.isDirty ||
      form.formState.isSubmitting ||
      form.formState.isValidating,
    [
      form.formState.isDirty,
      form.formState.isSubmitting,
      form.formState.isValidating,
    ]
  );

  return {
    form,
    disabled: shouldDisableForm,
    loading: false,
    submitHandler,
  };
};
