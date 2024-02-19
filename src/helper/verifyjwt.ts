import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default function verifyjwt(): { username: string; id: string } | null {
  const token = cookies().get("token")!.value;
  try {
    jwt.verify(token, process.env.SECRET!);
  } catch {
    redirect("/login");
  }
  return jwt.decode(token) as { username: string; id: string };
}
