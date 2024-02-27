import GrayCard from "@/components/GrayCard";

function CommentCard({
  comment,
}: {
  comment: {
    text: string;
    author: { name: string; username: string };
    _id: string;
    createdAt: string;
  };
}) {
  let time;
  const commentDate: any = new Date(comment.createdAt);
  if (Date.now() - commentDate > 3600000) {
    time = commentDate.toLocaleDateString();
  } else {
    time = "Just Now";
  }
  return (
    <GrayCard classname="p-2 mx-4 pl-3 mb-2">
      <div>
        {/* TODO: Add link to users profile for each comment*/}
        <span className="font-bold">{comment.author.name}</span>
        <span className="text-sm text-gray-400 pl-2">
          @{comment.author.username}
        </span>
      </div>
      <div className="text-xs text-gray-400">on: {time}</div>
      <hr className="my-2 border-slate-600" />

      <div className="text-sm pl-2">{comment.text}</div>
    </GrayCard>
  );
}

export default CommentCard;
