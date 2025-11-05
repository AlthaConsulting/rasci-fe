"use client";

import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PasswordResetForm } from "./password-reset-form";
import { useGetPasswordResetInformation } from "../hooks/use-get-password-reset-information";

export const PasswordResetProcessor = () => {
  const [noErrors, setNoErrors] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const getPasswordResetInformation = useGetPasswordResetInformation();
  useEffect(() => {
    if (!key) return router.replace("/");
    getPasswordResetInformation.mutate(
      { key },
      {
        onSuccess: ({ result, success }) => {
          if (!success) {
            const { status } = result;
            if (status === 400) {
              const INVALID_KEY = "invalid_password_reset";

              const { errors } = result;
              if ((errors as any[]).some((error) => error.code === INVALID_KEY)) {
                return router.replace("/login");
              }
            }
          }

          if (result.status === 200) setNoErrors(true);
        },
      }
    );
  }, [key, router]);

  if (noErrors) {
    return (
      <div className="w-full max-w-[300px] flex-1 flex flex-col gap-12">
        <PasswordResetForm />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <CircleNotch
        className="animate-spin text-primary"
        size={40}
        weight="bold"
      />
    </div>
  );
};
