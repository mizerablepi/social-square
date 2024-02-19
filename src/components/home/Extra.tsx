import GrayCard from "../GrayCard";
import { getPostSuggestion } from "@/helper/getSuggestions";

async function Extra({ userId }: { userId: string }) {
  const suggestedPosts = await getPostSuggestion(userId);
  return (
    <div className="flex-1 hidden lg:block pt-20">
      <GrayCard classname="p-2">
        <h4 className="font-bold mb-2">Trending Posts:</h4>
      </GrayCard>
    </div>
  );
}

export default Extra;
