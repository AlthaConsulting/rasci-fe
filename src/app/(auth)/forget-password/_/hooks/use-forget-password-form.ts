import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { highlightApiError } from "@altha/core/lib/utils";
import { useRequestPasswordReset } from "@altha/app/(auth)/account/password-reset/_/hooks/use-request-password-reset";

interface UseForgetPasswordFormOption {
  onLinkSent?: () => void;
}

export const useForgetPasswordForm = (options: UseForgetPasswordFormOption) => {
  const formSchema = z.object({
    email: z.string().email().min(1, { message: "Email can not be empty" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const requestPasswordReset = useRequestPasswordReset();
  const submitHandler = form.handleSubmit(async (values) => {
    const { email } = values;
    requestPasswordReset.mutate(
      { email },
      {
        onSettled: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        onSuccess: ({ result, success }) => {
          if (!success) {
            const { status } = result;
           
            if (status === 400) {
              const { errors } = result;
              return highlightApiError(errors).from(form);
            }
          }

          return options.onLinkSent?.();
        },
      }
    );
  });

  const shouldDisableForm = useMemo(
    () =>
      !form.formState.isDirty ||
      form.formState.isSubmitting ||
      form.formState.isValidating ||
      requestPasswordReset.isPending,
    [
      form.formState.isDirty,
      form.formState.isSubmitting,
      form.formState.isValidating,
      requestPasswordReset.isPending,
    ]
  );

  return {
    form,
    disabled: shouldDisableForm,
    loading: requestPasswordReset.isPending,
    submitHandler,
  };
};
