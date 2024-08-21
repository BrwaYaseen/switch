"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-sidebar-creator";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full w-[70px] lg:w-60 bg-[#252731] border-r border-[#2D2E35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
