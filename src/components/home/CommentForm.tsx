import { useState } from "react";
import GrayCard from "../GrayCard";

function CommentForm({ postId }: { postId: string }) {
  const [pending, setPending] = useState(false);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setPending(true);
    const data = new FormData();
    data.append("postId", postId);
    data.append("text", e.target.comment.value);
    fetch("/api/comment", { method: "post", body: data })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPending(false);
        }
      });
  };

  return (
    <GrayCard classname="sticky bottom-2 mt-auto p-2">
      <form action="" className="flex flex-col" onSubmit={submitHandler}>
        <label htmlFor="comment" className="mb-2 font-bold">
          Add Comment:{" "}
        </label>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={3}
          placeholder="Your Comment..."
          className="p-1 rounded text-black text-sm"
        ></textarea>
        <button className="self-start px-2 py-1 rounded bg-[#3cc2c9] mt-1 font-bold ">
          {pending ? "Submitting..." : "Comment"}
        </button>
      </form>
    </GrayCard>
  );
}

export default CommentForm;
