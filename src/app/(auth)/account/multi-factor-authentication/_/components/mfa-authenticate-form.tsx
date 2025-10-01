import { AuthNotice } from "@altha/app/(auth)/_/components/auth-notice";
import { Button } from "@altha/core/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@altha/core/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@altha/core/components/ui/input-otp";

import { useMfaAuthenticateForm } from "../hooks/use-mfa-authenticate-form";
import { MfaRecoveryDialog } from "./mfa-recovery-dialog";

export const MfaAuthenticateForm = () => {
  const { disabled, form, loading, submitHandler } = useMfaAuthenticateForm({});

  return (
    <div className="flex flex-col gap-6">
      <AuthNotice
        message="Enter the 6-digit code from your authenticator app."
        title="Security Verification"
      />
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={submitHandler}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    {...field}
                    autoFocus
                    maxLength={6}
                    onComplete={submitHandler}
                  >
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot className="flex-1" index={0} />
                      <InputOTPSlot className="flex-1" index={1} />
                      <InputOTPSlot className="flex-1" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="flex-1">
                      <InputOTPSlot className="flex-1" index={3} />
                      <InputOTPSlot className="flex-1" index={4} />
                      <InputOTPSlot className="flex-1" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
                <FormDescription className="text-center text-foreground">
                  The code refreshes every 30 seconds.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              disabled={disabled}
              loading={loading}
              type="submit"
            >
              Verify Code
            </Button>
            <p className="text-xs text-center">
              Lost your authenticator app? <MfaRecoveryDialog />.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
