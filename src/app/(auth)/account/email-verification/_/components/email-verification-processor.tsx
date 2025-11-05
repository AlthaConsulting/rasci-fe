"use client";

import { CircleNotch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { Button } from "@altha/core/components/ui/button";
import { requiresVerifyEmail } from "@altha/app/(auth)/_/utils/auth-flow";

import { useGetEmailVerificationInformation } from "../hooks/use-get-email-verification-information";
import { useVerifyEmail } from "../hooks/use-verify-email";
import { useCsrfToken } from "@altha/app/(auth)/_/api/csrf";

export const EmailVerificationProcessor = () => {
  const [errors, setErrors] = useState<BaseApiError[]>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const getEmailVerificationInformation = useGetEmailVerificationInformation();
  const verifyEmail = useVerifyEmail();
  useCsrfToken();

  useEffect(() => {
    if (!key) return router.replace("/");
    getEmailVerificationInformation.mutate(
      { key },
      {
        onSuccess: ({ result, success }) => {
          // The key is invalid or expired.
          if (!success) {
            const { status } = result;
            if (status === 400) {
              const { errors } = result;
              const baseErrors: BaseApiError[] = errors.map((err: any) => ({
                code: err.code ?? "UNKNOWN",
                message: err.message ?? err.detail ?? "An unknown error occurred",
              }));
              return setErrors(baseErrors);
            }
          }
        
          if (result.status === 200) {
            const { meta } = result;
            if (!meta.is_authenticating) {
              verifyEmail.mutate(
                { key },
                {
                  onSuccess: ({ result, success }) => {
                    if (!success) {
                      const { status } = result;
                      if (status === 400) {
                        const { errors } = result;
                        const baseErrors: BaseApiError[] = errors.map((err: any) => ({
                          code: err.code ?? "UNKNOWN",
                          message: err.message ?? err.detail ?? "An unknown error occurred",
                        }));
                        return setErrors(baseErrors);
                      }

                      // Somebody grabbed someone else's key and is trying to verify it.
                      if (status === 401) {
                        const { data, meta } = result;
                        if (
                          !requiresVerifyEmail(data.flows) &&
                          !meta.is_authenticated
                        ) {
                          return router.replace("/");
                        }
                      }
                    }

                    // Proved that the user is authenticated and verifying their email.
                    const redirectUrl = "/account/multi-factor-authentication";
                    return router.replace(redirectUrl);
                  },
                }
              );
            }
          }
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, router]);

  if (errors) {
    return (
      <div className="w-full max-w-[300px] flex-1 flex flex-col gap-12">
        <AuthNotice
          message="Please restart the verification process again by logging in to your account."
          title={errors[0].message}
        >
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/">Login</Link>
            </Button>
          </div>
        </AuthNotice>
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
