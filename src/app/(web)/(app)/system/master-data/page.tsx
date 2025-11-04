import type { JSX } from "react";

import { AppTabs } from "@altha/core/components/app-tabs";
import PageLevelActivities from "./_/components/level-activities/page";
import PagePosition from "./_/components/position/page";
import PageRasciMapping from "./_/components/rasci-mapping/page";
import PageLevel from "./_/components/level/page";

type PageProps = {
  searchParams: Promise<{
    tab: "level-activities" | "job-position" | "rasci-mapping" | "job-level";
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { tab = "level-activities" } = await searchParams;
  const tabs: { value: string; label: string; component: JSX.Element }[] = [
    {
      value: "level-activities",
      label: "Level Activities",
      component: <PageLevelActivities />, 
    },
    {
      value: "job-level",
      label: "Job Level",
      component: <PageLevel />,
    },
    {
      value: "job-position",
      label: "Job Position",
      component: <PagePosition />,
    },
    {
      value: "rasci-mapping",
      label: "RASCI Mapping",
      component: <PageRasciMapping />,
    },
  ];

  return (
    <div className="container mx-auto">
      <section className="flex flex-col lg:flex-row gap-5 lg:gap-8 py-8">
        {/* <AppTabs defaultTab={tab} tabs={tabs} vertical /> */}
        <div className="block lg:hidden">
          {/* Mobile Version */}
          <AppTabs defaultTab={tab} tabs={tabs} />
        </div>
        <div className="hidden lg:block w-full">
          {/* Deskstop Version */}
          <AppTabs defaultTab={tab} tabs={tabs} vertical />
        </div>
      </section>
    </div>
  );
}
