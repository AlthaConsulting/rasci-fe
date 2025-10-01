import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { Button } from "@altha/core/components/ui/button";
import Link from "next/link";
import React from "react";

export const PasswordResetMessage = () => {
  return (
    <AuthNotice title="Password Reset Successful!">
      <div className="prose text-sm">
        <p>
          Your password has been successfully updated. You can now log in with
          your new password.
        </p>
        <p>
          If you didn&apos;t request this change, please contact support
          immediately.
        </p>
      </div>
      <Button asChild>
        <Link href={"/login"}>Login Now</Link>
      </Button>
    </AuthNotice>
  );
};
