import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import getSignedData from "@/helper/getSignedData";
import Post from "@/models/Post";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  connect();

  const token = cookies().get("token");
  if (!token) {
    cookies().set("errors", "Not signed in");
    return NextResponse.json({
      msg: "wtf dude?!",
      success: false,
      url: "/createPost",
    });
  }
  const decodedToken: any = jwt.decode(token.value);

  let data = await req.formData();

  if (data.get("text") == "undefined") {
    cookies().set("errors", "Text field is required");
    return NextResponse.json({
      msg: "Text field is required",
      success: false,
      url: "/createPost",
    });
  }

  const user = await User.findOne({ username: decodedToken!.username }).exec();

  let imageUrl = "";
  if (data.get("file") != "undefined") {
    const signData = getSignedData();
    const url = "https://api.cloudinary.com/v1_1/db5sjzgsb/image/upload";
    // data.append("upload_preset", "kkfhejnz"); // for unsigned requests
    data.append("api_key", signData.apikey!);
    data.append("timestamp", signData.timestamp.toString());
    data.append("signature", signData.signature);
    data.append("eager", "c_pad,h_300,w_400");
    data.append("folder", "profiles");

    const res = await fetch(url, {
      method: "POST",
      body: data,
    });
    const uploadjson = await res.json();
    imageUrl = uploadjson.eager[0].secure_url;
  }

  const newPost = new Post({
    image: imageUrl,
    author: user,
    content: data.get("text"),
  });
  try {
    await newPost.save();
    return NextResponse.json({
      msg: "Post published",
      success: true,
      url: "/",
    });
  } catch (err) {
    cookies().set("errors", "Server Error try again later");
    return NextResponse.json({
      msg: "Server Error try again later",
      success: false,
      url: "/createPost",
    });
  }
}
export async function GET(req: Request) {
  connect();

  const token = cookies().get("token");
  if (!token) {
    cookies().set("errors", "Not signed in");
    return NextResponse.json({
      msg: "wtf dude?! just use the damn website",
      success: false,
      url: "/createPost",
    });
  }

  const countOfPosts = await Post.estimatedDocumentCount();
  if (countOfPosts < 10) {
    const posts = await Post.find({})
      .populate("author")
      .sort({ publishedAt: -1 })
      .exec();
    return NextResponse.json({ posts, success: true });
  } else {
    const numberOfPostsToSend = 10;
    const randomNumber = Math.random() * (countOfPosts - numberOfPostsToSend);
    const posts = await Post.find({})
      .skip(randomNumber)
      .limit(numberOfPostsToSend)
      .sort({ publisheAt: -1 })
      .exec();
    return NextResponse.json({ posts, success: true });
  }

  // const decodedToken: any = jwt.decode(token.value);
}
