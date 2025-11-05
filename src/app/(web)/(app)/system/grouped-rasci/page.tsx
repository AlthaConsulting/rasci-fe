import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PageGroupedRasci from "./page-client";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-blue-900 animate-spin" />
        </div>
      }
    >
      <PageGroupedRasci />
    </Suspense>
  );
}
