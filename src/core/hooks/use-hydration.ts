import { useEffect, useState } from "react";

export const useHydration = () => {
  const [isInBrowser, setIsInBrowser] = useState<boolean>(false);
  useEffect(() => {
    setIsInBrowser(true);
  }, []);

  return { isInBrowser };
};
