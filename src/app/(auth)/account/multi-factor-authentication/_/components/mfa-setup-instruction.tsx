"use client";

import { Fragment, useMemo } from "react";

import { Button } from "@altha/core/components/ui/button";

import { MfaInstruction } from "./mfa-instruction";
import { MfaQrCode } from "./mfa-qr-code";
import { MfaSetupVerifier } from "./mfa-setup-verifier";
import { useGetTOTPAuthenticatorStatus } from "../hooks/use-get-totp-authenticator-status";

export const MfaSetupInstruction = ({ nextFn }: { nextFn: () => void }) => {
  const { data, isLoading } = useGetTOTPAuthenticatorStatus();

  const totp = useMemo(() => {
    if (data) {
      const { result, success } = data;
      if (!success) {
        const { meta } = result;
        return meta;
      }
    }
  }, [data]);

  if (!isLoading && !totp) return null;
  return (
    <Fragment>
      <h1 className="font-semibold text-lg">Instruction</h1>
      <section className="flex flex-col gap-10">
        <section className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-6 lg:w-[480px] lg:order-2">
            {/* <MfaQrCode url={totp?.totp_url} />
            <p className="font-semibold text-xs text-center">
              Can&apos;t scan? Use this secret key instead: {totp?.secret}
            </p> */}
            <div className="flex flex-col gap-4">
              <MfaSetupVerifier onActivated={nextFn}>
                <Button className="hidden lg:flex w-full">Continue</Button>
              </MfaSetupVerifier>
            </div>
          </div>
          <MfaInstruction />
        </section>
        <div className="flex flex-col gap-4">
          <MfaSetupVerifier onActivated={nextFn}>
            <Button className="lg:hidden">Continue</Button>
          </MfaSetupVerifier>
        </div>
      </section>
    </Fragment>
  );
};
