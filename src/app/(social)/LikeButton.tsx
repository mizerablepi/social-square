import Image from "next/image";
import likeIcon from "@/assets/heart.svg";
import { useState } from "react";

function LikeButton({ postId, liked }: { postId: string; liked: boolean }) {
  const [postLiked, setLiked] = useState(liked);
  const clickHandler = (e: any) => {
    e.target.disabled = true;

    const data = new FormData();
    data.append("postId", postId);
    fetch("/api/post/like", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLiked(!postLiked);
        }
        e.target.disabled = false;
      });
  };

  return (
    <button
      className="bg-gray-700 rounded p-2 font-bold text-sm flex-[2] flex items-center justify-center gap-1 disabled:bg-gray-500/70"
      onClick={clickHandler}
    >
      <Image src={likeIcon} alt="" width={20} height={20} />{" "}
      {postLiked ? "Liked" : "Like"}
    </button>
  );
}

export default LikeButton;
