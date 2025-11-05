import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { highlightApiError } from "@altha/core/lib/utils";

import { useMfaAuthenticate } from "./use-mfa-authenticate";

interface UseMfaAuthenticateFormOption {
  codeDigit?: number;
}

export const useMfaAuthenticateForm = (
  option: UseMfaAuthenticateFormOption
) => {
  const router = useRouter();

  const formSchema = z.object({
    code: z.string().min(option.codeDigit || 6, {
      message: `Your code must be ${option.codeDigit || 6} characters`,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  const mfaAuthenticate = useMfaAuthenticate();
  const submitHandler = form.handleSubmit(async (values) => {
    const { code } = values;
    mfaAuthenticate.mutate(
      { code },
      {
        onSuccess: ({ result, success }) => {
          if (!success) {
            const { status } = result;
            if (status === 400) {
              const { errors } = result;
              // return highlightApiError(errors).from(form);
            }
          }

          return router.replace("/");
        },
      }
    );
  });

  const shouldDisableForm = useMemo(
    () =>
      !form.formState.isDirty ||
      form.formState.isSubmitting ||
      form.formState.isValidating ||
      mfaAuthenticate.isPending,
    [
      form.formState.isDirty,
      form.formState.isSubmitting,
      form.formState.isValidating,
      mfaAuthenticate.isPending,
    ]
  );

  return {
    form,
    disabled: shouldDisableForm,
    loading: mfaAuthenticate.isPending,
    submitHandler,
  };
};
