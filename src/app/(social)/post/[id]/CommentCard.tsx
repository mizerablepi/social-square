import GrayCard from "@/components/GrayCard";

function CommentCard({
  comment,
}: {
  comment: {
    text: string;
    author: { name: string; username: string };
    _id: string;
  };
}) {
  return (
    <GrayCard classname="p-2 mx-4 pl-3">
      <div>
        <span className="font-bold">{comment.author.name}</span>
        <span className="text-sm text-gray-400 pl-2">
          @{comment.author.username}
        </span>
      </div>
      <hr className="my-2 border-slate-600" />

      <div className="text-sm pl-2">{comment.text}</div>
    </GrayCard>
  );
}

export default CommentCard;
