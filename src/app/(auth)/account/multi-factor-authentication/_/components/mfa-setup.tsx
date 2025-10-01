"use client";

import { defineStepper } from "@stepperize/react";

import { getQueryClient } from "@altha/core/lib/query-client";

import { MfaBackupCodes } from "./mfa-backup-codes";
import { MfaSetupCompleted } from "./mfa-setup-completed";
import { MfaSetupInstruction } from "./mfa-setup-instruction";
import { MfaSetupIntroduction } from "./mfa-setup-introduction";

const { useStepper } = defineStepper(
  { id: "introduction" },
  { id: "instruction" },
  { id: "backup_codes" },
  { id: "final_step" }
);

export const MfaSetup = () => {
  const queryClient = getQueryClient();
  function onTOTPActivated() {
    queryClient
      .invalidateQueries({ queryKey: ["list-recovery-codes"] })
      .then(stepper.next);
  }

  const stepper = useStepper({ initialStep: "introduction" });
  return stepper.switch({
    introduction: () => <MfaSetupIntroduction nextFn={stepper.next} />,
    instruction: () => <MfaSetupInstruction nextFn={onTOTPActivated} />,
    backup_codes: () => <MfaBackupCodes nextFn={stepper.next} />,
    final_step: () => <MfaSetupCompleted />,
  });
};
