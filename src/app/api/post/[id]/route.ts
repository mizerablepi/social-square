import Post from "@/models/Post";
import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  connect();
  const post = await Post.findById(context.params.id)
    .populate("author", ["name", "username", "profilePicture"])
    .exec();
  return NextResponse.json({ post });
}
