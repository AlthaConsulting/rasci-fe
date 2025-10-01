"use client";

import { useState } from "react";

import { AuthHeader } from "@altha/app/(auth)/_/components/auth-header";
import { Button } from "@altha/core/components/ui/button";
import { ConfirmPasswordField } from "@altha/app/(auth)/_/components/form-blocks/confirm-password-field";
import { Form } from "@altha/core/components/ui/form";
import { PasswordField } from "@altha/app/(auth)/_/components/form-blocks/password-field";

import { PasswordResetMessage } from "./password-reset-message";
import { usePasswordResetForm } from "../hooks/use-password-reset-form";

export const PasswordResetForm = () => {
  const { disabled, form, loading, submitHandler } = usePasswordResetForm({
    onPasswordReset: () => showPasswordResetMessage(true),
  });

  const [passwordReset, showPasswordResetMessage] = useState<boolean>(false);
  if (passwordReset) return <PasswordResetMessage />;

  return (
    <Form {...form}>
      <AuthHeader
        message="Choose a strong password to keep your account secure."
        title="Create a New Password"
      />
      <form className="flex flex-col gap-6" onSubmit={submitHandler}>
        <PasswordField autoFocus />
        <ConfirmPasswordField />
        <Button className="w-full" disabled={disabled} loading={loading}>
          Change Password
        </Button>
      </form>
    </Form>
  );
};
