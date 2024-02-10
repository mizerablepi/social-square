import { NextResponse } from "next/server";
import { z } from "zod";
import { getFormData } from "@/helper/formHelpers";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig";
connect();

interface signUpData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export async function POST(req: Request) {
  const validationSchema = z.object({
    username: z
      .string()
      .trim()
      .min(3, { message: "username must be atleast 3 charachters long" })
      .max(18, { message: "username must be atmost 18 charachters long" }),
    email: z.string().trim().email(),
    password: z
      .string()
      .min(3, { message: "password must be atleast 3 charachters long" })
      .max(20, { message: "password must be atmost 20 charachters long" }),
  });
  const data = await getFormData<signUpData>(req);

  try {
    const validData = validationSchema.parse(data);
    const userExists = await User.find({ username: validData.username });
    if (userExists) {
      return NextResponse.json({ msg: "User already exists", success: false });
    } else if (data.password !== data.confirm_password) {
      return NextResponse.json({ msg: "Password don't match", success: false });
    }
    const user = new User({
      username: validData.username,
      email: validData.email,
      password: await bcryptjs.hash(data.password, 2),
    });
    console.log(user[0].password);
    await user.save();
    return NextResponse.redirect(new URL("/login", req.url));
  } catch (err) {
    return NextResponse.json({ msg: err, success: false });
  }
}
