"use client";

import { type JSX, Fragment } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@altha/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@altha/core/components/ui/dropdown-menu";
import { Separator } from "@altha/core/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@altha/core/components/ui/tabs";
import { cn } from "@altha/core/lib/utils";
import { useMediaQuery } from "@altha/core/hooks/use-media-query";

interface AppTabsProps {
  defaultTab: string;
  tabs: {
    value: string;
    label: string;
    component: JSX.Element;
  }[];
  vertical?: boolean;
}

export const AppTabs: React.FC<AppTabsProps> = ({
  defaultTab,
  tabs,
  vertical = false,
}) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || defaultTab;
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (vertical) {
    return (
      <Tabs
        className="w-full grid lg:grid-cols-[250px_1fr] gap-4 lg:gap-8"
        orientation="vertical"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full" variant="outline">
                <strong>Current Tab:</strong>
                {tabs.find((tab) => tab.value === activeTab)?.label ||
                  "Select Tabs"}
                <CaretDown className="ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {tabs.map((tab) => (
                <DropdownMenuItem
                  key={tab.value}
                  onSelect={() => handleTabChange(tab.value)}
                >
                  {tab.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TabsList className="sticky top-5 md:top-8 self-start flex-col h-auto items-start justify-start bg-transparent p-4 text-primary border gap-2">
            {tabs.map((tab, index) => (
              <Fragment key={tab.value}>
                <TabsTrigger
                  className={cn(
                    "text-foreground hover:text-secondary-foreground hover:bg-secondary/80 h-10",
                    "w-full inline-flex items-center justify-start whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  )}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
                {index !== tabs.length - 1 && <Separator />}
              </Fragment>
            ))}
          </TabsList>
        )}
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            className="w-full mt-0"
            value={tab.value}
          >
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" variant="outline">
              <strong>Current Tab:</strong>
              {tabs.find((tab) => tab.value === activeTab)?.label ||
                "Select Tabs"}
              <CaretDown className="ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onSelect={() => handleTabChange(tab.value)}
              >
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <TabsList className="justify-start overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="whitespace-normal shrink-0 snap-start"
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          className="mt-4 md:mt-6 lg:mt-8"
          value={tab.value}
        >
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
