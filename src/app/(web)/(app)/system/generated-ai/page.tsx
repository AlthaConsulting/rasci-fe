import { Suspense } from "react";
import PageAiGenerated from "./page-client";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageAiGenerated />
    </Suspense>
  );
}
