import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@altha/core/components/ui/form";
import { Input } from "@altha/core/components/ui/input";

export const FullNameField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="text-sm"
              placeholder="Enter your full name here"
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
