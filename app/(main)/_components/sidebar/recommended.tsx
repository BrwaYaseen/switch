"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import UserItem from "./user-item";
import { UserAvatarSkeleton } from "@/components/user-avatar";

interface RecommendedProps {
  data: User[];
}

const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2 mt-6">
      {[...Array(3)].map((_, i) => (
        <UserAvatarSkeleton key={i} />
      ))}
    </ul>
  );
};

export default Recommended;
