"use client";

import { useState } from "react";
import Link from "next/link";

import { AuthHeader } from "@altha/app/(auth)/_/components/auth-header";
import { Button } from "@altha/core/components/ui/button";
import { EmailField } from "@altha/app/(auth)/_/components/form-blocks/email-field";
import { Form } from "@altha/core/components/ui/form";
import { PasswordField } from "@altha/app/(auth)/_/components/form-blocks/password-field";
import { MfaAuthenticateForm } from "@altha/app/(auth)/account/multi-factor-authentication/_/components/mfa-authenticate-form";
import { ReCAPTCHA } from "@altha/app/(auth)/_/components/recaptcha";

import { AccountActivationMessage } from "./account-activation-mesage";
import { useLoginForm } from "../hooks/use-login-form";
import { useCsrfToken } from "@altha/app/(auth)/_/api/csrf";

export const LoginForm = () => {
  const { form, disabled, loading, submitHandler } = useLoginForm({
    onEmailVerificationRequired: () => showEmailVerification(true),
    onMfaAuthenticateRequired: () => showMfaAuthenticate(true),
  });

  const [emailVerification, showEmailVerification] = useState<boolean>(false);
  const [mfaAuthenticate, showMfaAuthenticate] = useState<boolean>(false);

  useCsrfToken();
  if (mfaAuthenticate) return <MfaAuthenticateForm />;
  if (emailVerification) {
    return <AccountActivationMessage email={form.watch("email")} />;
  }

  return (
    <Form {...form}>
      <AuthHeader
        message="Login to access our RASCI system."
        title="Altha Consulting"
      />
      <form className="flex flex-col gap-4" noValidate onSubmit={submitHandler}>
        <EmailField autoFocus />
        <div className="flex flex-col gap-4">
          <PasswordField isCreatePassword={false} />
          <Link
            className="self-end text-xs font-semibold text-primary"
            href="/forget-password"
            type="button"
          >
            Forgot Password
          </Link>
        </div>
        <ReCAPTCHA setVerification={(v) => form.setValue("captcha", v)} />
        <Button className="w-full" disabled={disabled} loading={loading}>
          Login
        </Button>
      </form>
      {/* <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold" href="/register">
          Sign up
        </Link>
      </p> */}
    </Form>
  );
};
