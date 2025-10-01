import * as React from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";

import { cn } from "@altha/core/lib/utils";

import { buttonVariants } from "./button";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [type, setType] = React.useState<string>("password");

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-[invalid=true]:border-destructive",
          className
        )}
        type={type}
      />
      {type === "password" ? (
        <button
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2",
            buttonVariants({
              className:
                "bg-transparent hover:bg-transparent text-muted-foreground/50 hover:text-muted-foreground focus-within:text-muted-foreground",
              size: "icon",
              variant: "secondary",
            })
          )}
          type="button"
          onClick={() => setType("text")}
        >
          <EyeClosed />
        </button>
      ) : (
        <button
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2",
            buttonVariants({
              className:
                "bg-transparent hover:bg-transparent text-muted-foreground/50 hover:text-muted-foreground focus-within:text-muted-foreground",
              size: "icon",
              variant: "secondary",
            })
          )}
          type="button"
          onClick={() => setType("password")}
        >
          <Eye />
        </button>
      )}
    </div>
  );
});
InputPassword.displayName = "InputPassword";

export { InputPassword };
