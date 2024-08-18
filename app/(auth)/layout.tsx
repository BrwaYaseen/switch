import React from "react";
import { Logo } from "./_components/logo";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Logo />
      {children}
    </div>
  );
};

export default ClerkLayout;
