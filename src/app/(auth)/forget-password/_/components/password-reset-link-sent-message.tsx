import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";

export const PasswordResetLinkSentMessage = () => {
  return (
    <AuthNotice title="Reset Password Link Sent">
      <div className="prose text-sm">
        <p>
          We&apos;ve sent a password reset link to your registered email
          address.
        </p>
        <ul>
          <li>
            The link will expire in <strong>24 hours</strong> for your security.
          </li>
          <li>Please check your inbox and spam/junk folder just in case.</li>
        </ul>
        <p>
          If you don&apos;t receive the email or encounter issues, you can
          request a new link
        </p>
      </div>
    </AuthNotice>
  );
};
