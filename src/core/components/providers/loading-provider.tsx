"use client";

import { useHydration } from "@altha/core/hooks/use-hydration";

export const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="-translate-x-3 -translate-y-10">
        <div className="boxes">
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isInBrowser } = useHydration();
  if (isInBrowser) return children;

  return <Loader />;
};
