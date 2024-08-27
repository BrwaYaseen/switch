"use client";

import { onUnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export const UnblockButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((result) =>
          toast.success(`User ${result.blocked.username} UnBlocked`)
        )
        .catch(() => toast.error("Something Went Wrong"));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-yellow-500 w-full"
    >
      UnBlock
    </Button>
  );
};
