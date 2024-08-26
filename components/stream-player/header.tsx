"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { VerifiedMark } from "../verified-mark";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

type HeaderProps = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
};

export const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex items-center justify-between px-4">
      {/* Left side: Avatar, name, stream name, and isLive status */}
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}
                {participantCount === 1 ? " Viewer" : " Viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>

      {/* Right side: Unfollow button */}
      <div>
        <Actions
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div>
        <ActionsSkeleton />
      </div>
    </div>
  );
};
