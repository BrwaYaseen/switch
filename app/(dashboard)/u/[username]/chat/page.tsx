import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-services";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();

  if (!self) {
    throw new Error("Unauthorized");
  }

  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream Not Found");
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold ">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay Chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Follower Only Chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
