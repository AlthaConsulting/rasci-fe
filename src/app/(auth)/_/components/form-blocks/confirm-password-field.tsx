import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@altha/core/components/ui/form";
import { InputPassword } from "@altha/core/components/ui/input-password";

export const ConfirmPasswordField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="passwordConfirmation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <InputPassword
              {...field}
              className="text-sm"
              placeholder="Enter your password here"
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
