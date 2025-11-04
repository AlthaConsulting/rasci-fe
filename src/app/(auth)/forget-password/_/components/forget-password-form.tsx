"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";

import { AuthHeader } from "@altha/app/(auth)/_/components/auth-header";
import { Button } from "@altha/core/components/ui/button";
import { EmailField } from "@altha/app/(auth)/_/components/form-blocks/email-field";
import { Form } from "@altha/core/components/ui/form";

import { PasswordResetLinkSentMessage } from "./password-reset-link-sent-message";
import { useForgetPasswordForm } from "../hooks/use-forget-password-form";

export const ForgetPasswordForm = () => {
  const { disabled, form, loading, submitHandler } = useForgetPasswordForm({
    onLinkSent: () => showLinkSentMessage(true),
  });

  const [linkSent, showLinkSentMessage] = useState<boolean>(false);
  if (linkSent) return <PasswordResetLinkSentMessage />;

  return (
    <Form {...form}>
      <AuthHeader
        message={{
          textCenter: false,
          content: (
            <div>
              <p>
                Enter your registered email address, and we&apos;ll send you a
                link to reset your password.
              </p>
              <br />
              <p>
                Make sure to check your spam or promotions folder if you
                don&apos;t see it in your inbox.
              </p>
            </div>
          ),
        }}
        title="Forget Password"
      />
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <EmailField autoFocus />
        <Button className="w-full" disabled={disabled} loading={loading}>
          Send
        </Button>
      </form>
      <Link
        className="self-center inline-flex items-center justify-center py-2 px-6 text-muted-foreground hover:text-primary font-semibold text-sm transition ease-out duration-200"
        href={"/"}
      >
        <ArrowLeft className="mr-2" />
        Back to Login
      </Link>
    </Form>
  );
};
