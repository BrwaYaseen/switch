import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <p>UserName: {user.username}</p>
      <p>UserID: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
