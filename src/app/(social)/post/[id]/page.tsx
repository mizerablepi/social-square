"use client";

import GrayCard from "@/components/GrayCard";
import Navbar from "@/components/Navbar";
import CommentForm from "@/app/(social)/post/[id]/CommentForm";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CommentSection from "./CommentSection";
import { Oval } from "react-loader-spinner";

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
        commentsDiv.current!.scrollIntoView({ behavior: "smooth" });
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
        </>
      ) : (
        <div className="flex justify-center my-2">
          <Oval
            height="80"
            width="80"
            color="#53bfc5"
            secondaryColor="53bfc5"
            ariaLabel="oval-loading"
          />
        </div>
      )}
      <div id="comments" ref={commentsDiv} className="h-[79vh]">
        <CommentSection postId={params.id} />
      </div>
      <CommentForm postId={params.id} />
    </main>
  );
}

export default Post;
