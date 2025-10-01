"use client";

import { IconContext } from "@phosphor-icons/react";

export const IconProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <IconContext.Provider
      value={{
        size: 16,
      }}
    >
      {children}
    </IconContext.Provider>
  );
};
