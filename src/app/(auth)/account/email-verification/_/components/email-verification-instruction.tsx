import { ResendEmailVerificationCounter } from "./resend-email-verification-counter";

export const EmailVerificationInstruction = ({ email }: { email: string }) => {
  return (
    <div className="prose text-sm">
      <p className="font-semibold">
        Please check your email to activate your account. Click the link
        we&apos;ve sent to <span className="text-primary">{email}</span>.
      </p>
      <ul>
        <li>The activation link is valid for 24 hours.</li>
        <li>
          Didn&apos;t receive the email?{" "}
          <ResendEmailVerificationCounter email={email} />
        </li>
        <li>
          Check your spam or junk folder if you don&apos;t see it in your inbox.
        </li>
      </ul>
    </div>
  );
};
