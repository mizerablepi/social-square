"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PostCard from "./Postcard";

function Body() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);
  // console.log(posts[0]._id);
  return (
    <>
      <main className="flex-1 p-2 flex flex-col gap-4">
        <nav className="hidden sm:flex ">Navbar for laptops</nav>
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
            }) => <PostCard post={post} key={post._id} />
          )
        ) : (
          <div className="text-white font-bold text-3xl">Loading...</div>
        )}
      </main>
      <Link
        href="/createPost"
        className="font-bold text-2xl bg-[#53bfc5] px-5 py-3 sticky bottom-16 self-end rounded-full mr-3 sm:hidden"
      >
        +
      </Link>
    </>
  );
}

export default Body;
