import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@altha/core/components/ui/form";
import { Input } from "@altha/core/components/ui/input";

export const EmailField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className="text-sm"
              placeholder="Enter your email here"
              type="email"
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
