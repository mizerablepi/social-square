import Image from "next/image";
import FollowButton from "./FollowButton";

function SuggestionTile({
  user,
  alreadyFollowing,
}: {
  user: any;
  alreadyFollowing: boolean;
}) {
  return (
    <div className="flex items-center pr-1">
      <Image
        src={user.profilePicture}
        alt="profile pic"
        height={42}
        width={42}
        className="rounded-full"
      />
      <div className="flex flex-col pl-2 self-start">
        <span className="font-semibold text-sm">{user.name}</span>
        <span className="text-xs text-gray-400">@{user.username}</span>
      </div>
      <FollowButton
        suggestedUserId={user.id}
        alreadyFollowing={alreadyFollowing}
      />
    </div>
  );
}

export default SuggestionTile;
