import { NextRequest, NextResponse } from "next/server";
import Comment from "@/models/Comment";
import { connect } from "@/dbConfig";
import { cookies } from "next/headers";
import { z } from "zod";
import Post from "@/models/Post";
import { getFormData } from "@/helper/formHelpers";
import jwt from "jsonwebtoken";

interface CommentData {
  text: string;
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  connect();
  let page = 0;
  let sort: 1 | -1 = 1;
  const COMMENTS_PER_PAGE = +process.env.COMMENTS_PER_PAGE!;
  if (req.nextUrl.searchParams.get("page")) {
    page = +req.nextUrl.searchParams.get("page")! - 1;
  }
  if (req.nextUrl.searchParams.get("sort")) {
    const temp = +req.nextUrl.searchParams.get("sort")!;
    sort = temp > 0 ? 1 : -1;
  }
  const comments = await Comment.find({ post: context.params.id })
    .sort({ createdAt: sort })
    .skip(page * COMMENTS_PER_PAGE)
    .limit(COMMENTS_PER_PAGE)
    .populate("author", ["username", "name"])
    .exec();
  return NextResponse.json({ comments });
}

export async function POST(req: Request, context: { params: { id: string } }) {
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
    const post = await Post.findById(context.params.id);
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
