"use client";

import { useState } from "react";

function FollowButton({
  suggestedUserId,
  alreadyFollowing,
}: {
  suggestedUserId: string;
  alreadyFollowing: boolean;
}) {
  const [following, setFollowing] = useState(alreadyFollowing);
  const clickHandler = (e: any) => {
    e.target.disabled = true;
    const data = new FormData();
    data.append("suggestedUserId", suggestedUserId);
    fetch("/api/user/follow", { method: "post", body: data }).then(() => {
      setFollowing(!following);
      e.target.disabled = false;
    });
  };
  return (
    <button
      className="ml-auto text-sm font-bold text-slate-900 bg-white rounded-full px-2 py-1 disabled:bg-white/60"
      onClick={clickHandler}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
