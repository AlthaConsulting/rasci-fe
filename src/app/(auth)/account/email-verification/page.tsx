import { Suspense } from "react";

import { EmailVerificationProcessor } from "./_/components/email-verification-processor";

export default function Page() {
  return (
    <Suspense>
      <EmailVerificationProcessor />
    </Suspense>
  );
}
