import { NavigationGuardProvider } from "next-navigation-guard";

// import { AccountSetup } from "./_/components/account-setup";

export default function Page() {
  return (
    <NavigationGuardProvider>
      <main className="w-full flex-1 flex flex-col gap-12">
        {/* <AccountSetup /> */}
      </main>
    </NavigationGuardProvider>
  );
}
