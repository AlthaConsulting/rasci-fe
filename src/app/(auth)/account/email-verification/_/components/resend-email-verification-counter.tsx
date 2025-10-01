"use client";

import { toast } from "sonner";
import { useCallback, useState } from "react";

import { useTimer } from "@altha/core/hooks/use-timer";

import { useRequestEmailVerification } from "../hooks/use-request-email-verification";

export const ResendEmailVerificationCounter = ({
  email,
}: {
  email: string;
}) => {
  const [isSending, setIsSending] = useState(false);
  const { getTimeLabel, setTimer, timer } = useTimer();

  const resendEmailVerification = useRequestEmailVerification();
  const handleResend = useCallback(() => {
    setIsSending(true);
    resendEmailVerification.mutate(
      { email },
      {
        onSettled: () => setIsSending(false),
        onSuccess: () => {
          setTimer(60);
          toast.success("Email sent successfully!");
          localStorage.setItem("resendEmailTimestamp", Date.now().toString());
        },
      }
    );
  }, [email, resendEmailVerification, setTimer]);

  return isSending ? (
    <span className="text-muted-foreground">Sending your email...</span>
  ) : timer > 0 ? (
    <span className="font-semibold">Resend email in {getTimeLabel(timer)}</span>
  ) : (
    <button
      className="inline-block font-semibold text-[#2B6EB2] underline not-prose"
      onClick={handleResend}
    >
      Resend Email
    </button>
  );
};
