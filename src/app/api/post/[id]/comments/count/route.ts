import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import { connect } from "@/dbConfig";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  connect();
  const COMMENTS_PER_PAGE = +process.env.COMMENTS_PER_PAGE!;

  const post = await Post.findById(context.params.id).exec();
  const count = Math.ceil(post.comments.length / COMMENTS_PER_PAGE);
  // console.log(post.comments);
  return NextResponse.json({ count });
}
