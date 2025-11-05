import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { highlightApiError } from "@altha/core/lib/utils";
import { requiresVerifyEmail } from "@altha/app/(auth)/_/utils/auth-flow";

import { useRegister } from "./use-register";

interface UseRegisterFormOption {
  onEmailVerificationRequired?: () => void;
}

export const useRegisterForm = (option: UseRegisterFormOption) => {
  const formSchema = z
    .object({
      name: z.string().min(1, { message: "Name can not be empty" }),
      email: z.string().email().min(1, { message: "Email can not be empty" }),
      password: z
        .string()
        .min(1)
        .min(8, { message: "Password must be at least 8 characters" }),
      passwordConfirmation: z.string().min(1),
      captcha: z.boolean(),
      privacyPolicy: z.boolean(),
    })
    .refine(
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      {
        message: "Password does not match",
        path: ["passwordConfirmation"],
      }
    )
    .refine(({ privacyPolicy }) => !!privacyPolicy, {
      message: "Please accept our privacy and policy first",
      path: ["privacyPolicy"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      captcha: false,
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const register = useRegister();
  const submitHandler = form.handleSubmit(async (values) => {
    const { name, email, password } = values;

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    register.mutate(
      { first_name: firstName, last_name: lastName, email, password },
      {
        onSettled: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        onSuccess: ({ result, success }) => {
          if (!success) {
            const { status } = result;
            if (status === 400) {
              const { errors } = result;
              // return highlightApiError(errors).from(form);
            }

            if (status === 401) {
              const { data } = result;
              if (requiresVerifyEmail(data.flows)) {
                return option.onEmailVerificationRequired?.();
              }
            }
          }
        },
      }
    );
  });

  const captcha = form.watch().captcha;
  const shouldDisableForm = useMemo(
    () =>
      !captcha ||
      !form.formState.isDirty ||
      form.formState.isSubmitting ||
      form.formState.isValidating ||
      register.isPending,
    [
      captcha,
      form.formState.isDirty,
      form.formState.isSubmitting,
      form.formState.isValidating,
      register.isPending,
    ]
  );

  return {
    form,
    disabled: shouldDisableForm,
    loading: register.isPending,
    submitHandler,
  };
};
