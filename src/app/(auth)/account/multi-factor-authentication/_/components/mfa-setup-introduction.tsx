import Link from "next/link";

import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { Button } from "@altha/core/components/ui/button";

export const MfaSetupIntroduction = ({ nextFn }: { nextFn: () => void }) => {
  return (
    <section className="w-full max-w-[300px] flex-1 flex flex-col gap-12 mx-auto">
      <AuthNotice
        message="Adding Two-factor authentication (2FA) helps secure your account from unauthorized access.  Add an extra layer of security by using a time-based one-time password (TOTP) app. "
        title="Enhance Your Account Security"
      >
        <div className="flex flex-col gap-3">
          <Button onClick={nextFn}>Activate Now</Button>
          <Button asChild variant="outline">
            <Link href="/account/setup">Activate Later</Link>
          </Button>
        </div>
      </AuthNotice>
    </section>
  );
};
