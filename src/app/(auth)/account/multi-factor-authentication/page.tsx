import { redirect } from "next/navigation";

import { MfaSetup } from "./_/components/mfa-setup";
import { getListAuthenticators } from "./_/api/get-list-authenticators";

export default async function Page() {
  const { result, success } = await getListAuthenticators();
  if (success && result.data.length > 0) return redirect("/");

  return (
    <main className="w-full max-w-[300px] lg:max-w-[860px] mx-auto flex-1 flex flex-col gap-4">
      <MfaSetup />
    </main>
  );
}
