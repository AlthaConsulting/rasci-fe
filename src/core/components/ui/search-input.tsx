"use client";

import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "@altha/core/hooks/use-debounced-callback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@altha/core/components/ui/input";
import { cn } from "@altha/core/libs/utils";

function SearchInput({
  defaultValue,
  placeholder,
  ...props
}: React.ComponentProps<"input">) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      if (value) params.set(name, value);
      else params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParams = (value: string) => {
    const newSearchParams = createQueryString("q", value);
    router.push(`${pathname}${newSearchParams ? "?" : ""}${newSearchParams}`, {
      scroll: false,
    });
  };

  const debouncedUpdateSearchParam = useDebouncedCallback((value: string) => {
    updateSearchParams(value);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length) {
      debouncedUpdateSearchParam(value);
    } else {
      updateSearchParams(value);
    }
  };

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  return (
    <div className={cn("relative w-full sm:max-w-sm", props.className)}>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
      <Input
        {...props}
        className="w-full pl-9"
        data-slot="search-input"
        onChange={handleSearchChange}
        placeholder={placeholder}
        type="search"
        value={searchTerm}
      />
    </div>
  );
}
SearchInput.displayName = "SearchInput";

export { SearchInput };
