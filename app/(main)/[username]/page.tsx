import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  /*  if (isBlocked) {
    notFound();
  } */
  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <p>UserName: {user.username}</p>
      <p>UserID: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <p>is this user Blocked You: {`${isBlocked}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
