import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { Button } from "@altha/core/components/ui/button";
import Link from "next/link";
import React from "react";

export const MfaSetupCompleted = () => {
  return (
    <section className="w-full max-w-[300px] flex-1 flex flex-col gap-12 mx-auto">
      <div className="flex flex-col gap-8">
        <AuthNotice
          message="Your account is now protected with Multi-Factor Authentication."
          title="MFA Enabled Successfully!"
        />
        <Button asChild>
          <Link href="/account/setup">Finish</Link>
        </Button>
      </div>
    </section>
  );
};
