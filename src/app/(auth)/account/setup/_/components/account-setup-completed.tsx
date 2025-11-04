import Link from "next/link";

import { Button } from "@altha/core/components/ui/button";

import { CompleteIllustration } from "./illustrations/complete-illustration";

export const AccountSetupCompleted = () => {
  return (
    <div className="max-w-[300px] mx-auto flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <CompleteIllustration />
        <p className="text-heading-medium-semibold">
          Account Successfully Created!
        </p>
        <p>
          Congratulations, your account is set up and ready to use. Start
          exploring opportunities, manage your profile, and make the most of our
          platform.
        </p>
        <Button asChild className="w-full">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};
