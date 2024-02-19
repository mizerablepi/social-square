import { connect } from "@/dbConfig";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Post from "@/models/Post";

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
  const decodedToken: any = jwt.decode(token.value);
  const data = await req.formData();

  try {
    const post = await Post.findById(data.get("postId")).exec();
    const index = post.likes.indexOf(decodedToken.id);
    if (index > -1) {
      post.likes.push(decodedToken.id);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, msg: "Server error" });
  }
}
