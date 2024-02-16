"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { connect } from "@/dbConfig";

export default async function getUser() {
  connect();
  const token = cookies().get("token");
  if (!token) {
    redirect("/login");
  }
  try {
    jwt.verify(token.value, process.env.SECRET!);
  } catch {
    redirect("/login");
  }
  const decoded: any = jwt.decode(token.value);
  const idInToken = decoded.id;
  const user = await User.findById(idInToken).exec();
  return user;
}
