import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MainContent from "./content/_/components/main-content";

export default async function Page() {
  return (
    <HydrationBoundary state={null}>
      <MainContent />
    </HydrationBoundary>
  );
}
