import { connect } from "@/dbConfig";
import { getFormData } from "@/helper/formHelpers";
import User from "@/models/User";
import { NextResponse } from "next/server";
connect();

export async function POST(req: Request) {
  // console.log(await getFormData(req));
  const user = await User.find({}).exec();
  console.log(user[0].password);
  return NextResponse.json({ msg: "OK" });
}
