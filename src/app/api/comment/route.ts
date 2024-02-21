import { connect } from "@/dbConfig";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { z } from "zod";
import { getFormData } from "@/helper/formHelpers";

interface CommentData {
  text: string;
  postId: string;
}

export async function POST(req: Request) {
  connect();
  const token = cookies().get("token");
  if (!token) {
    cookies().set("errors", "Not signed in");
    return NextResponse.json({
      msg: "wtf dude?!",
      success: false,
      url: "/login",
    });
  }

  const validationSchema = z.object({
    text: z.string().trim().min(1),
  });

  const decodedToken: any = jwt.decode(token.value);
  const data = await getFormData<CommentData>(req);

  try {
    const validData = validationSchema.parse(data);
    const post = await Post.findById(data.postId);
    const comment = new Comment({
      text: validData.text,
      post: post,
      author: decodedToken.id,
    });
    await comment.save();
    post.comments.push(comment);
    await post.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err });
  }
}
