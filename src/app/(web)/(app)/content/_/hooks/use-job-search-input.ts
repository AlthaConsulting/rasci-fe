import { useDebouncedCallback } from "@altha/core/hooks/use-debounced-callback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export const useJobSearchInput = () => {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") ?? ""
  );

  const pathname = usePathname();
  const router = useRouter();
  const debouncedSearch = useDebouncedCallback((keyword: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (keyword) searchParams.set("keyword", keyword);
    else searchParams.delete("keyword");

    const url = `${pathname}?${searchParams.toString()}`;
    router.push(url);
  }, 500);

  const searchKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return {
    keyword,
    searchKeyword,
  };
};
