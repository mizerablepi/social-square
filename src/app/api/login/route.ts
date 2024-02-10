import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { getFormData } from "@/helper/formHelpers";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
connect();

interface logInData {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const validationSchema = z.object({
    username: z
      .string()
      .trim()
      .min(3, { message: "username must be atleast 3 charachters long" })
      .max(18, { message: "username must be atmost 18 charachters long" }),
    password: z
      .string()
      .min(3, { message: "password must be atleast 3 charachters long" })
      .max(20, { message: "password must be atmost 20 charachters long" }),
  });
  const data = await getFormData<logInData>(req);
  let validData;
  try {
    validData = validationSchema.parse(data);
  } catch (err: any) {
    cookies().set("errors", err.errors[0].message, {
      maxAge: 1,
    });
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = await User.findOne({ username: validData!.username });
    if (!user) {
      cookies().set("errors", "Invalid credentials", { maxAge: 1 });
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (await bcryptjs.compare(validData!.password, user.password)) {
      const jwtToken = jwt.sign(
        { username: user.username },
        process.env.SECRET!
      );
      cookies().set("token", jwtToken);
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      cookies().set("errors", "Invalid credentials", { maxAge: 1 });
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    cookies().set("errors", "Server error please try again later", {
      maxAge: 1,
    });
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
