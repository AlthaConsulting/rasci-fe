import { useEffect } from "react";

import {
  AlertDrawer,
  AlertDrawerClose,
  AlertDrawerContent,
  AlertDrawerDescription,
  AlertDrawerFooter,
  AlertDrawerHeader,
  AlertDrawerTitle,
  AlertDrawerTrigger,
} from "@altha/core/components/ui/alert-drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@altha/core/components/ui/form";
import { Input } from "@altha/core/components/ui/input";

import { useMfaAuthenticateForm } from "../hooks/use-mfa-authenticate-form";

const DIGIT_COUNT = 8;

export const MfaRecoveryDialog = () => {
  const { form, loading, submitHandler } = useMfaAuthenticateForm({
    codeDigit: 8,
  });

  const code = form.watch("code");
  useEffect(() => {
    if (code.length === DIGIT_COUNT) submitHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code.length]);

  return (
    <AlertDrawer>
      <AlertDrawerTrigger className="font-semibold text-[#2B6EB2]">
        Use recovery code
      </AlertDrawerTrigger>
      <AlertDrawerContent className="md:max-w-[360px]">
        <AlertDrawerHeader>
          <AlertDrawerTitle>Back Up Code</AlertDrawerTitle>
          <AlertDrawerDescription>
            Use one of your available backup codes
          </AlertDrawerDescription>
        </AlertDrawerHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-6 p-4 lg:p-0"
            onSubmit={submitHandler}
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      placeholder="Enter your backup code"
                      maxLength={DIGIT_COUNT}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDrawerFooter>
          <AlertDrawerClose className="flex-1" disabled={loading}>
            {loading ? "Verifying" : "Close"}
          </AlertDrawerClose>
        </AlertDrawerFooter>
      </AlertDrawerContent>
    </AlertDrawer>
  );
};
