import { getUserSuggestions } from "@/helper/getSuggestions";
import SuggestionTile from "./SuggestionTile";

async function SuggestionCard({ user }: { user: any }) {
  const suggestedUsers = await getUserSuggestions(user.id);
  return (
    <div>
      {suggestedUsers.map((suggestedUser) => {
        return (
          <SuggestionTile
            user={suggestedUser}
            alreadyFollowing={user.following.includes(suggestedUser.id)}
            key={suggestedUser.id}
          />
        );
      })}
    </div>
  );
}

export default SuggestionCard;
