import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default function verifyjwt() {
  const token = cookies().get("token")!.value;
  try {
    jwt.verify(token, process.env.SECRET!);
  } catch {
    redirect("/login");
  }
  return;
}
