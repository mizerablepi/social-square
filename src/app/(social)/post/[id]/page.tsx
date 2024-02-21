"use client";

import GrayCard from "@/components/GrayCard";
import Navbar from "@/components/Navbar";
import CommentForm from "@/components/home/CommentForm";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Post({ params }: { params: { id: string } }) {
  const [post, setPost]: [any, any] = useState();
  const commentsDiv = useRef(null) as any;
  useEffect(() => {
    fetch(`/api/post/${params.id}`)
      .then((res) => res.json())
      .then((data) => setPost(data.post));
  }, [params.id]);
  useEffect(() => {
    if (post) {
      if (window.location.hash.substring(1) == "comments") {
        commentsDiv.current!.scrollIntoView();
      }
    }
  }, [post]);

  return (
    <main className="flex-1 p-2 flex flex-col gap-4">
      <Navbar page="home" />
      {post ? (
        <>
          <GrayCard classname="p-2">
            <div className="flex gap-4 items-center">
              <Image
                src={post.author.profilePicture}
                alt=""
                width={42}
                height={42}
                className="w-[42px] h-[42px] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-5">
                  {post.author.name}
                </span>
                <span className="text-sm text-gray-400">
                  @{post.author.username}
                </span>
              </div>
            </div>
            <hr className="mt-4 mb-2 border-slate-600 mx-2" />
            <div className="mb-2">
              <div className="px-2 mb-2">{post.content}</div>
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  width={400}
                  height={300}
                  className="w-full h-[auto]"
                />
              ) : (
                ""
              )}
            </div>
          </GrayCard>
          <div id="comments" ref={commentsDiv} className="h-[79vh]">
            <h2 className="font-semibold text-xl">Comments: </h2>
            <hr className="mt-4 mb-2 border-slate-600" />

            {post.comments.map((comment: any) => {
              return <div key={comment._id}>{comment.text}</div>;
            })}
          </div>
        </>
      ) : (
        "LOADING"
      )}
      <CommentForm postId={params.id} />
    </main>
  );
}

export default Post;
