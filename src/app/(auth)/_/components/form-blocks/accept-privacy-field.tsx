import { type CheckboxProps } from "@radix-ui/react-checkbox";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "@altha/core/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@altha/core/components/ui/form";
import { PrivacyPolicyLetter } from "@altha/app/(auth)/register/_/components/privacy-policy-letter";

export const AcceptPrivacyField: React.FC<CheckboxProps> = ({ ...props }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="privacyPolicy"
      render={({ field }) => (
        <FormItem>
          <div className="items-top flex space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <div className="grid gap-1.5 leading-none">
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <FormLabel className="text-foreground">Accept our</FormLabel>{" "}
                  <PrivacyPolicyLetter>
                    <button className="inline font-semibold text-primary">
                      privacy and policy
                    </button>
                  </PrivacyPolicyLetter>
                </p>
                <FormLabel className="text-sm text-muted-foreground">
                  By registering, you accept our privacy and policy
                </FormLabel>
              </div>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
