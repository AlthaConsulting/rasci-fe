import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { highlightApiError } from "@altha/core/lib/utils";

import { useResetPassword } from "./use-reset-password";

interface UsePasswordResetFormOption {
  onPasswordReset?: () => void;
}

export const usePasswordResetForm = (option: UsePasswordResetFormOption) => {
  const searchParams = useSearchParams();

  const formSchema = z
    .object({
      password: z
        .string()
        .min(1)
        .min(8, { message: "Password must be at least 8 characters" }),
      passwordConfirmation: z.string().min(1),
    })
    .refine(
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      {
        message: "Password does not match",
        path: ["passwordConfirmation"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const resetPassword = useResetPassword();
  const submitHandler = form.handleSubmit(async (values) => {
    const { password } = values;
    resetPassword.mutate(
      { key: searchParams.get("key")!, password },
      {
        onSettled: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        onSuccess: ({ result, success }) => {
          if (!success) {
            const { status } = result;
            if (status === 400) {
              const { errors } = result;
              // return highlightApiError(errors).from(form);
            }
          }

          return option.onPasswordReset?.();
        },
      }
    );
  });

  const shouldDisableForm = useMemo(
    () =>
      !form.formState.isDirty ||
      form.formState.isSubmitting ||
      form.formState.isValidating ||
      resetPassword.isPending,
    [
      form.formState.isDirty,
      form.formState.isSubmitting,
      form.formState.isValidating,
      resetPassword.isPending,
    ]
  );

  return {
    form,
    disabled: shouldDisableForm,
    loading: resetPassword.isPending,
    submitHandler,
  };
};
