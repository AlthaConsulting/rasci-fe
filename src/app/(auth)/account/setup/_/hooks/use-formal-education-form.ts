import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useFormalEducationForm = ({
  onSubmitted,
}: {
  onSubmitted?: () => void;
}) => {
  const formSchema = z.object({
    educations: z.array(
      z
        .object({
          institution_name: z
            .string()
            .min(1, "Institution name cannot be empty"),
          field_of_study: z.string().min(1, "Field of study cannot be empty"),
          degree: z.string().min(1, "Degree cannot be empty"),
          gpa: z.string().min(1, "GPA cannot be empty"),
          start_date: z.date({ required_error: "Start date cannot be empty" }),
          end_date: z.optional(z.date().nullable()),
          still_studying: z.boolean(),
          academic_transcripts: z
            .custom<File[]>()
            .refine(
              (val) => val.length > 0,
              "Academic transcripts cannot be empty"
            ),
          ijazah: z.custom<File[]>(),
        })
        .refine(
          ({ end_date, still_studying }) => {
            if (!still_studying) return Boolean(end_date);
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
      educations: [
        {
          academic_transcripts: [],
          degree: "",
          gpa: "",
          end_date: undefined,
          field_of_study: "",
          ijazah: [],
          institution_name: "",
          start_date: undefined,
          still_studying: false,
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
