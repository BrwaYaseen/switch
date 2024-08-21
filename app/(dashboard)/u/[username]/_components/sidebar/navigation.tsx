"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessagesSquare, UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { SideItems, SideItemsSkeleton } from "./side-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `u/${user?.username}/chat`,
      icon: MessagesSquare,
    },
    {
      label: "Community",
      href: `u/${user?.username}/community`,
      icon: UsersRound,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <SideItemsSkeleton key={i} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-2 px-2 pt-2 lg:pt-0">
      {routes.map((route) => (
        <SideItems
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
