"use server";
export default async function handleData(req) {
  console.log(req.get("img"));
}
