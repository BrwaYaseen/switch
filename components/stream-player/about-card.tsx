"use client";

import { VerifiedMark } from "../verified-mark";
import { BioModel } from "./bio-model";

type AboutCardProps = {
  hostIdentity: string;
  hostName: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
};

export const AboutCard = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "Follower" : "Followers";

  return (
    <div className="px-4">
      <div
        className="group rounded-xl bg-[#252731] p-6 lg:p-10 flex
       flex-col gap-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModel initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary"> {followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">{bio || "No bio Yet"}</p>
      </div>
    </div>
  );
};
