"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

type CommunityItemProps = {
  hostName: string;
  viewerName: string;
  partcipantName?: string;
  partcipantIdentity: string;
};

export const CommunityItem = ({
  hostName,
  viewerName,
  partcipantName,
  partcipantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(partcipantName || "");
  const isSelf = partcipantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!partcipantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(partcipantIdentity)
        .then(() => toast.success(`Blocked ${partcipantName}`))
        .catch(() => toast.error("Something went Wrong"));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{partcipantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            onClick={handleBlock}
            disabled={isPending}
            variant="ghost"
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
