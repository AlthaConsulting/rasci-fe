"use client";

import { Download } from "@phosphor-icons/react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { saveAs } from "file-saver";

import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { Button } from "@altha/core/components/ui/button";
import { cn } from "@altha/core/lib/utils";

import { useGetListRecoveryCodes } from "../hooks/use-get-list-recovery-codes";

export const MfaBackupCodes = ({ nextFn }: { nextFn: () => void }) => {
  const { data } = useGetListRecoveryCodes();
  const recoveryCodes = useMemo(() => {
    if (data) {
      const { result, success } = data;
      if (success) {
        const { data } = result;
        return data.unused_codes || [];
      }
    }

    return [];
  }, [data]);

  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);
  const handleDownload = useCallback(() => {
    if (!recoveryCodes.length) return;
    const text = recoveryCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "backup_codes.txt");
    setHasDownloaded(true);
  }, [recoveryCodes]);

  return (
    <Fragment>
      <AuthNotice title="Save Your Backup Codes">
        <div className="prose text-sm">
          <p className="my-2">
            Backup codes are your last resort to access your account if you lose
            your authenticator app or device.
          </p>
          <p className="my-2">
            ⚠️ If you don&apos;t save them now, you might permanently lose
            access to your account.
          </p>
          <div>
            Save these codes securely by:
            <ul className="my-2">
              <li className="my-2">Downloading them to your device.</li>
              <li className="my-2">
                Printing and storing them in a safe place.
              </li>
            </ul>
          </div>
          <p className="my-2">
            Once saved, you can always use a code from this list to log in.
          </p>
        </div>
      </AuthNotice>
      <div className="flex flex-col gap-6">
        <ul className="grid grid-cols-2 gap-x-10 gap-y-4 p-3 border rounded">
          {recoveryCodes.map((code, key) => (
            <li
              key={key}
              className={cn("text-sm", key % 2 !== 0 && "text-right")}
            >
              {code}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Button
            className="w-full"
            disabled={hasDownloaded || !recoveryCodes.length}
            variant="secondary"
            onClick={handleDownload}
          >
            <Download className="mr-4" />
            Download
          </Button>
          <Button className="w-full" disabled={!hasDownloaded} onClick={nextFn}>
            Continue
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
