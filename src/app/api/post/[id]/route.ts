import Post from "@/models/Post";
import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
export async function GET(req: Request, context: { params: { id: string } }) {
  connect();
  const post = await Post.findById(context.params.id)
    .populate("author", ["name", "username", "profilePicture"])
    .populate({
      path: "comments",
      populate: { path: "author", select: ["name", "username"] },
    })
    .exec();
  console.log(post.comments);
  return NextResponse.json({ post });
}
