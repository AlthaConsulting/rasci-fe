import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useFlashMessage = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/login") {
      const flashData = Cookies.get("flash");
      if (flashData) {
        const { message, details } = JSON.parse(flashData);
        toast.error(message, {
          description: details,
          descriptionClassName: "!text-destructive",
        });
        Cookies.remove("flash");
      }
    }
  }, [pathname]);
};
