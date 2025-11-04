import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { EmailVerificationInstruction } from "@altha/app/(auth)/account/email-verification/_/components/email-verification-instruction";

export const AccountActivationMessage = ({ email }: { email: string }) => {
  return (
    <AuthNotice
      message="Your account is not yet activated. Please check your email and click the activation link. "
      title="Account Not Activated"
    >
      <EmailVerificationInstruction email={email} />
    </AuthNotice>
  );
};
