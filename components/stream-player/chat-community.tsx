"use client";

import { useParticipants } from "@livekit/components-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type ChatCommunityProps = {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
};

export const ChatCommunity = ({
  hostName,
  viewerName,
  isHidden,
}: ChatCommunityProps) => {
  function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const partcipants = useParticipants();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = partcipants.reduce((acc, partcipant) => {
      const hostAsViewer = `host-${partcipant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(partcipant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((partcipant) => {
      return partcipant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [partcipants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-base text-muted-foreground">Community is disabled</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="search Community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No Results
        </p>
        {filteredParticipants.map((partcipant) => (
          <CommunityItem
            key={partcipant.identity}
            hostName={hostName}
            viewerName={viewerName}
            partcipantName={partcipant.name}
            partcipantIdentity={partcipant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
