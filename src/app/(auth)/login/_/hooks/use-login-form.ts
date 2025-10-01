import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { highlightApiError } from "@altha/core/lib/utils";
import {
  requiresMFA,
  requiresVerifyEmail,
} from "@altha/app/(auth)/_/utils/auth-flow";

import { useLogin } from "./use-login";
import { toast } from "sonner";

interface UseLoginFormOption {
  onMfaAuthenticateRequired?: () => void;
  onEmailVerificationRequired?: () => void;
}

export const useLoginForm = (option: UseLoginFormOption) => {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email().min(1, { message: "Email can not be empty" }),
    password: z.string().min(1, { message: "Password can not be empty" }),
    captcha: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      captcha: false,
      email: "",
      password: "",
    },
  });

  const login = useLogin();
  const submitHandler = form.handleSubmit(async (values) => {
    const { email, password } = values;
    login.mutate(
      { email, password },
      {
        onSettled: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        onSuccess: async ({ result, success }) => {
          if (!success) {
            const { status, flows, errors } = result;
            
            if (status === 400 && errors) {
              return highlightApiError(errors).from(form);
            }

            if (status === 401) {
              if (result.data?.flows) {
                if (requiresVerifyEmail(result.data?.flows)) {
                  return option.onEmailVerificationRequired?.();
                }

                if (requiresMFA(result.data?.flows)) {
                  return option.onMfaAuthenticateRequired?.();
                }
              }

              if (result.meta?.is_authenticated === false) {
                toast.info("Account has been deactivated. Please contact support.");
                return;
              }
            }

            return;
          }

          router.replace("/");
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
      login.isPending,
    [
      captcha,
      form.formState.isDirty,
      form.formState.isSubmitting,
      form.formState.isValidating,
      login.isPending,
    ]
  );

  return {
    form,
    disabled: shouldDisableForm,
    loading: login.isPending,
    submitHandler,
  };
};
