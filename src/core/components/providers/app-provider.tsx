import { IconProvider } from "./icon-provider";
import { LoadingProvider } from "./loading-provider";
import { QueryProvider } from "./query-provider";
import { Toaster } from "../ui/sonner";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <IconProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </IconProvider>
      <Toaster />
    </QueryProvider>
  );
};
