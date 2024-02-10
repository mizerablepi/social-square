"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import User from "@/models/User";

export default async function getUser() {
  const token = cookies().get("token");
  if (!token) {
    console.log("token nonexistent");
    redirect("/login");
  }
  try {
    jwt.verify(token.value, process.env.SECRET!);
  } catch {
    redirect("/login");
  }
  const decoded: any = jwt.decode(token.value);
  const usernameInToken = decoded.username;
  const user = await User.findOne({ username: usernameInToken }).exec();
  return user;
}
