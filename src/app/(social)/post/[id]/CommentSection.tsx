import GrayCard from "@/components/GrayCard";
import CommentCard from "./CommentCard";

function CommentSection({
  post,
}: {
  post: {
    comments: [
      { text: string; author: { name: string; username: string }; _id: string }
    ];
    author: { username: string; name: string; profilePic: string };
  };
}) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Comments: </h2>
        <select
          name="comment_sort"
          id="comment_sort"
          className="mr-4 bg-gray-700 rounded p-1 font-bold"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <hr className="mt-4 mb-2 border-slate-600" />

      {post.comments.map((comment: any) => {
        return <CommentCard comment={comment} key={comment._id} />;
      })}
    </>
  );
}

export default CommentSection;
