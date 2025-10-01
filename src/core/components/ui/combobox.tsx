"use client";

import { CaretUpDown, Check } from "@phosphor-icons/react";
import { Command as CommandPrimitive } from "cmdk";
import {
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  Fragment,
  useContext,
  useMemo,
} from "react";
import { PopoverProps } from "@radix-ui/react-popover";

import { type ButtonProps, Button } from "@altha/core/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@altha/core/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverContentProps,
  PopoverTrigger,
} from "@altha/core/components/ui/popover";
import { cn } from "@altha/core/lib/utils";

import { Empty } from "./empty";

interface ItemField {
  label: string;
  value: string;
}

export interface ComboboxContextProps {
  items?: ItemField[];
  value?: ItemField["value"];
  onValueChange?: (value: ItemField["value"]) => void;
}

const ComboboxContext = createContext({} as ComboboxContextProps);

const Combobox = ({
  items,
  value,
  onValueChange,
  ...props
}: PopoverProps & ComboboxContextProps) => {
  return (
    <ComboboxContext.Provider
      value={{
        items,
        value,
        onValueChange,
      }}
    >
      <Popover {...props} />
    </ComboboxContext.Provider>
  );
};

const ComboboxTrigger = PopoverTrigger;

const ComboboxValue = forwardRef<
  HTMLButtonElement,
  ButtonProps & { placeholder?: string }
>(({ loading, ...props }, ref) => {
  const { items, value } = useContext(ComboboxContext);

  const isBoxEmpty = useMemo(() => {
    if (!items) return false;
    return items.length === 0;
  }, [items]);

  const isBoxFilled = useMemo(() => {
    if (value && typeof value === "string") {
      return value.trim().length > 0;
    }

    return Boolean(value);
  }, [value]);

  const isEmpty = useMemo(() => {
    return isBoxEmpty || !isBoxFilled;
  }, [isBoxEmpty, isBoxFilled]);

  return (
    <Button
      ref={ref}
      className={cn(
        "px-3 justify-between hover:bg-transparent font-normal",
        "aria-[invalid='true']:border-destructive",
        (loading || isEmpty) &&
          "text-muted-foreground hover:text-muted-foreground"
      )}
      role="combobox"
      variant="outline"
      {...props}
    >
      {loading
        ? "Loading..."
        : isEmpty
        ? props.placeholder
        : items!.find((item) => item.value === value)?.label ||
          props.placeholder ||
          "Select something"}
      <CaretUpDown className="size-4" />
    </Button>
  );
});
ComboboxValue.displayName = "ComboboxValue";

interface CoreComboboxContentProps {
  loading?: boolean;
}

interface ComboboxContentProps
  extends CoreComboboxContentProps,
    PopoverContentProps {
  command?: ComponentPropsWithoutRef<typeof CommandPrimitive>;
  commandEmpty?: ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;
  commandGroup?: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;
  commandInput?: ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;
  commandLoading?: ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>;
}

const ComboboxContent = forwardRef<
  React.ComponentRef<typeof PopoverContent>,
  ComboboxContentProps
>(
  (
    {
      children,
      command,
      commandEmpty,
      commandGroup,
      commandInput,
      commandLoading,
      loading,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverContent
        ref={ref}
        className="w-[var(--radix-popover-trigger-width)] p-0"
        {...props}
      >
        <Command {...command}>
          <CommandInput {...commandInput} />
          <CommandList>
            {loading ? (
              <CommandLoading {...commandLoading} />
            ) : (
              <Fragment>
                <CommandEmpty
                  {...commandEmpty}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <Empty />
                  <span className="text-sm text-muted-foreground mt-1">
                    No data found
                  </span>
                </CommandEmpty>
                <CommandGroup {...commandGroup}>{children}</CommandGroup>
              </Fragment>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    );
  }
);
ComboboxContent.displayName = "ComboboxContent";

const ComboboxItem = forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "value"
  > & {
    value: ItemField["value"];
  }
>((props, ref) => {
  const { value, onValueChange } = useContext(ComboboxContext);
  return (
    <CommandItem
      ref={ref}
      {...props}
      onSelect={() => onValueChange?.(props.value)}
    >
      <Check
        className={cn(
          "size-4",
          props.value === value ? "opacity-100" : "opacity-0"
        )}
      />
      {props.children}
    </CommandItem>
  );
});
ComboboxItem.displayName = "ComboboxItem";

export {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxItem,
};
