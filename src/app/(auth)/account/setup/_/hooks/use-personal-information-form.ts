import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const usePersonalInformationForm = ({
  onSubmitted,
}: {
  onSubmitted?: () => void;
}) => {
  const formSchema = z.object({
    personal_information: z.object({
      full_name: z.string().min(1, { message: "Full name cannot be empty" }),
      date_of_birth: z.date({
        required_error: "Date of birth cannot be empty",
      }),
      gender: z.string({ required_error: "Gender cannot be empty" }),
    }),
    contact_details: z.object({
      email: z.string().email().min(1, { message: "Email cannot be empty" }),
      phone_number: z
        .string()
        .min(1, { message: "Phone number cannot be empty" }),
      current_address: z.object({
        street_address: z
          .string()
          .min(1, { message: "Street address cannot be empty" }),
        city: z.string({ required_error: "City cannot be empty" }),
        province: z.string({ required_error: "Province cannot be empty" }),
      }),
    }),
    application_details: z.object({
      cv: z
        .custom<File[]>()
        .refine((val) => val.length > 0, "CV cannot be empty"),
      expected_salary: z
        .number()
        .min(1, { message: "Expected salary cannot be empty " }),
      interest_status: z.string({
        required_error: "Interest in opportunities cannot be empty",
      }),
      application_source: z.string({
        required_error: "Applicant source cannot be empty",
      }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personal_information: {
        full_name: "",
        date_of_birth: undefined,
        gender: undefined,
      },
      contact_details: {
        email: "",
        phone_number: "",
        current_address: {
          street_address: "",
          city: undefined,
          province: undefined,
        },
      },
      application_details: {
        cv: [],
        expected_salary: 0,
        interest_status: undefined,
        application_source: undefined,
      },
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
