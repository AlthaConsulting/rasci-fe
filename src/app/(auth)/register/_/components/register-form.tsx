"use client";

import { useState } from "react";
import Link from "next/link";

import { AcceptPrivacyField } from "@altha/app/(auth)/_/components/form-blocks/accept-privacy-field";
import { AuthHeader } from "@altha/app/(auth)/_/components/auth-header";
import { Button } from "@altha/core/components/ui/button";
import { ConfirmPasswordField } from "@altha/app/(auth)/_/components/form-blocks/confirm-password-field";
import { EmailField } from "@altha/app/(auth)/_/components/form-blocks/email-field";
import { Form } from "@altha/core/components/ui/form";
import { FullNameField } from "@altha/app/(auth)/_/components/form-blocks/full-name-field";
import { PasswordField } from "@altha/app/(auth)/_/components/form-blocks/password-field";
import { ReCAPTCHA } from "@altha/app/(auth)/_/components/recaptcha";

import { EmailVerificationMessage } from "./email-verification-message";
import { useRegisterForm } from "../hooks/use-register-form";
import { useCsrfToken } from "@altha/app/(auth)/_/api/csrf";

export const RegisterForm = () => {
  const { form, disabled, loading, submitHandler } = useRegisterForm({
    onEmailVerificationRequired: () => showEmailVerification(true),
  });

  const [emailVerification, showEmailVerification] = useState<boolean>(false);
  useCsrfToken();
  if (emailVerification) {
    return <EmailVerificationMessage email={form.watch("email")} />;
  }

  return (
    <Form {...form}>
      <AuthHeader
        message="Create an account to explore opportunities and manage your application."
        title="Join Our Talent Network"
      />
      <form className="flex flex-col gap-6" onSubmit={submitHandler}>
        <FullNameField autoFocus />
        <EmailField />
        <PasswordField />
        <ConfirmPasswordField />
        <ReCAPTCHA setVerification={(t) => form.setValue("captcha", t)} />
        <AcceptPrivacyField />
        <Button className="w-full" disabled={disabled} loading={loading}>
          Register
        </Button>
      </form>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link className="font-semibold" href="/login">
          Login
        </Link>
      </p>
    </Form>
  );
};
