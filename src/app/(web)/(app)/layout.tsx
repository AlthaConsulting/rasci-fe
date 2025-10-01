import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { AppFooter } from "@altha/core/components/app-footer";
import { AppHeader } from "@altha/core/components/app-header";

import { prefetchAuthenticationStatus } from "../../(auth)/_/hooks/use-get-authentication-status";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { queryClient } = await prefetchAuthenticationStatus();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 flex items-center justify-center p-4 py-5 md:p-8 md:pt-6 lg:p-16 lg:pt-8">
          {children}
        </main>
        <AppFooter />
      </div>
    </HydrationBoundary>
  );
}
