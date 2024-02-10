import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";

cloudinary.config({
  cloud_name: "db5sjzgsb",
  api_key: "879678691151992",
  api_secret: "CrIiSq4RogrGYz96uP9Y8YwhLzE",
});

const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
      folder: "profiles",
    },
    cloudinary.config().api_secret!
  );

  return { timestamp, signature };
};

function getJson() {
  const sig = signuploadform();
  return {
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudinary.config().cloud_name,
    apikey: cloudinary.config().api_key,
  };
}

export async function POST(req: Request) {
  const signData = getJson();
  const url = "https://api.cloudinary.com/v1_1/db5sjzgsb/image/upload";
  let data = await req.formData();
  // data.append("upload_preset", "kkfhejnz"); // for unsigned requests
  data.append("api_key", signData.apikey!);
  data.append("timestamp", signData.timestamp.toString());
  data.append("signature", signData.signature);
  data.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
  data.append("folder", "profiles");

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    });
  return NextResponse.json({ msg: "DONE" });
}
