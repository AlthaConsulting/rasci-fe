import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@altha/core/components/ui/form";
import { InputPassword } from "@altha/core/components/ui/input-password";
import { PasswordStrengthBar } from "@altha/core/components/ui/password-strength-bar";
import { cn } from "@altha/core/lib/utils";

export const PasswordField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    isCreatePassword?: boolean;
  }
> = ({ isCreatePassword = true, ...props }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormControl>
            <InputPassword
              {...field}
              className="text-sm"
              placeholder="Enter your password here"
              {...props}
            />
          </FormControl>
          {isCreatePassword ? (
            <Fragment>
              <FormDescription
                className={cn("text-xs italic", !!error && "text-destructive")}
              >
                *Password must be at least 8 characters and a combination of
                numbers, uppercase, lowercase letters, or at least a special
                character of: #$^+=!*()@%&)
              </FormDescription>
              <PasswordStrengthBar password={form.watch().password} />
            </Fragment>
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
};
