import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { EmailVerificationInstruction } from "@altha/app/(auth)/account/email-verification/_/components/email-verification-instruction";

export const EmailVerificationMessage = ({ email }: { email: string }) => {
  return (
    <AuthNotice
      headerIcon={
        <CheckCircle className="text-primary" size={32} weight="fill" />
      }
      title="Your Account Has Been Successfully Created!"
    >
      <EmailVerificationInstruction email={email} />
    </AuthNotice>
  );
};
