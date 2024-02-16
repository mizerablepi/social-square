import Image from "next/image";
import GrayCard from "../GrayCard";
import likeIcon from "@/assets/heart.svg";
import commentIcon from "@/assets/comment-processing-outline.svg";
import shareIcon from "@/assets/share.svg";

function PostCard({
  post,
}: {
  post: {
    author: any;
    image: string;
    content: string;
    likes: any[];
    publishedAt: Date;
    comments: any[];
    _id: string;
  };
}) {
  let time;
  const postDate: any = new Date(post.publishedAt);
  if (Date.now() - postDate > 3600000) {
    time = postDate.toLocaleDateString();
  } else {
    time = "Just Now";
  }

  return (
    <GrayCard>
      <div className="grid grid-cols-[3rem_1fr] grid-rows-[3.5rem_1fr] px-2 py-3 gap-x-1">
        <div className="sm:row-span-2 self-start rounded-full mx-auto">
          <Image
            src={post.author.profilePicture}
            alt="pp"
            width={42}
            height={42}
            className="w-[42px] h-[42px] rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-bold text-sm">
            {post.author.name}{" "}
            <span className="text-xs font-normal text-gray-400">
              @{post.author.username}
            </span>
          </div>
          <div className="text-xs font-semibold text-gray-400 pt-1">{time}</div>
        </div>
        <div className="col-span-2 sm:col-span-1 text-sm pl-4 sm:pl-0 pr-4 pb-1">
          <div className="mb-4">{post.content}</div>
          {post.image ? (
            <div className="mb-4">
              <Image
                src={post.image}
                alt="post image"
                height={300}
                width={400}
                className="w-full h-auto"
                priority={false}
              />
            </div>
          ) : (
            ""
          )}
          <div className="my-2 text-xs font-light text-gray-400">
            <span>Likes: {post.likes.length}</span>
            <span> | </span>
            <span>Comments: {post.comments.length}</span>{" "}
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-700 rounded p-2 font-bold text-sm flex-[2] flex items-center justify-center gap-1 ">
              <Image src={likeIcon} alt="" width={20} height={20} /> Like
            </button>
            <button className="bg-gray-700 rounded p-2 font-bold text-sm flex-[2] flex items-center justify-center gap-1">
              <Image src={commentIcon} alt="" width={20} height={20} /> Comment
            </button>
            <button className="bg-gray-700 rounded p-2 font-bold text-sm flex-1 flex items-center justify-center gap-1">
              <Image src={shareIcon} alt="" width={20} height={20} />{" "}
              <span className="sm:block hidden">Share</span>
            </button>
          </div>
        </div>
      </div>
    </GrayCard>
  );
}

export default PostCard;
