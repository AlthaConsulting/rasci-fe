"use client";

import { CaretUpDown, Check } from "@phosphor-icons/react";
import { createContext, useContext, useState } from "react";

import { Button } from "@altha/core/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@altha/core/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@altha/core/components/ui/popover";
import { cn } from "@altha/core/libs/utils";

interface ComboboxState {
  open: () => void;
  close: () => void;
}

interface ComboboxProps {
  list: { label: string; value: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const ComboboxContext = createContext<ComboboxProps & ComboboxState>(
  {} as ComboboxProps & ComboboxState
);

function Combobox({
  ...props
}: React.ComponentProps<typeof Popover> & ComboboxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ComboboxContext.Provider
      value={{
        ...props,
        open,
        close,
        onValueChange: (value) => {
          props.onValueChange?.(value);
          close();
        },
      }}
    >
      <Popover
        data-slot="combobox"
        open={isOpen}
        onOpenChange={setIsOpen}
        {...props}
      />
    </ComboboxContext.Provider>
  );
}

function ComboboxTrigger({
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  return (
    <PopoverTrigger asChild data-slot="combobox-trigger" {...props}>
      <Button
        className={cn(
          "w-full justify-between text-left font-normal hover:bg-transparent text-base md:text-sm h-9",
          props.className
        )}
        role="combobox"
        variant="outline"
      >
        {props.children}
        <CaretUpDown className="opacity-50" />
      </Button>
    </PopoverTrigger>
  );
}

function ComboboxValue({
  placeholder = "Select",
  ...props
}: React.ComponentProps<"span"> & { placeholder?: string }) {
  const { list, defaultValue: value } = useContext(ComboboxContext);
  return (
    <span
      data-slot="combobox-value"
      className={cn(!value && "!text-muted-foreground")}
      {...props}
    >
      {value ? list.find((item) => item.value === value)?.label : placeholder}
    </span>
  );
}

function ComboboxContent({
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      data-slot="combobox-content"
      className={cn(
        "w-[var(--radix-popover-trigger-width)] p-0",
        props.className
      )}
      {...props}
    >
      <Command>{props.children}</Command>
    </PopoverContent>
  );
}

function ComboboxInput({
  ...props
}: React.ComponentProps<typeof CommandInput>) {
  return (
    <CommandInput
      data-slot="combobox-input"
      className={cn("h-9", props.className)}
      {...props}
    />
  );
}

function ComboboxList({ ...props }: React.ComponentProps<typeof CommandList>) {
  return (
    <CommandList data-slot="combobox-list" {...props}>
      <CommandEmpty>No data found.</CommandEmpty>
      {props.children}
    </CommandList>
  );
}

function ComboboxGroup({
  ...props
}: React.ComponentProps<typeof CommandGroup>) {
  return <CommandGroup data-slot="combobox-group" {...props} />;
}

function ComboboxItem({
  value,
  ...props
}: React.ComponentProps<typeof CommandItem> & { value: string }) {
  const { defaultValue, onValueChange } = useContext(ComboboxContext);
  return (
    <CommandItem
      data-slot="combobox-item"
      keywords={[String(props.children), value]}
      onSelect={() => onValueChange?.(value)}
      value={value}
      {...props}
    >
      {props.children}
      <Check
        className={cn(
          "ml-auto",
          value === defaultValue ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}

export {
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
};
