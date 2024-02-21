"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PostCard from "./Postcard";
import Navbar from "../Navbar";
import { Oval } from "react-loader-spinner";
import jwt from "jsonwebtoken";

function Body() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => {
        const JWT = document.cookie.split("=")[1];
        const decodedJWT = jwt.decode(JWT)! as {
          username: string;
          id: string;
          iat: number;
        };
        setUserId(decodedJWT.id);
        setPosts(data.posts);
      });
  }, []);

  return (
    <>
      <main className="flex-1 p-2 flex flex-col gap-4">
        <Navbar page="home" />
        {posts.length > 0 ? (
          posts.map(
            (post: {
              name: string;
              author: any;
              image: string;
              content: string;
              likes: any[];
              publishedAt: Date;
              comments: any[];
              _id: string;
              id: string;
            }) => <PostCard post={post} key={post._id} userId={userId} />
          )
        ) : (
          <div className="self-center my-auto">
            <Oval
              height="80"
              width="80"
              color="#53bfc5"
              secondaryColor="53bfc5"
              ariaLabel="oval-loading"
            />
          </div>
        )}
      </main>
      <Link
        href="/post/create"
        className="font-bold text-2xl bg-[#53bfc5] px-5 py-3 sticky bottom-16 self-end rounded-full mr-3 sm:hidden"
      >
        +
      </Link>
    </>
  );
}

export default Body;
