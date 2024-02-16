import { connect } from "@/dbConfig";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function POST(req: Request) {
  connect();

  const token = cookies().get("token");
  if (!token) {
    cookies().set("errors", "Not signed in");
    return NextResponse.json({
      msg: "wtf dude?!",
      success: false,
      url: "/signup",
    });
  }
  const decodedToken: any = jwt.decode(token.value);

  let data = await req.formData();

  if (data.get("suggestedUserId") == "undefined") {
    cookies().set("errors", "ID field is required");
    return NextResponse.json({
      msg: "ID field is required",
      success: false,
      url: "/createPost",
    });
  }

  const user = await User.findOne({ username: decodedToken.username }).exec();
  const alreadyFollowingIndex = user.following.indexOf(
    data.get("suggestedUserId")
  );
  if (alreadyFollowingIndex > -1) {
    user.following.splice(alreadyFollowingIndex, 1);
  } else {
    user.following.push(data.get("suggestedUserId"));
  }
  await user.save();

  return NextResponse.json({ success: true });
}
