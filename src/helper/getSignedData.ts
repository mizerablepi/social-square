import { v2 as cloudinary } from "cloudinary";

export default function getSignedData() {
  cloudinary.config({
    cloud_name: "db5sjzgsb",
    api_key: "879678691151992",
    api_secret: "CrIiSq4RogrGYz96uP9Y8YwhLzE",
  });
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "c_pad,h_300,w_400",
      folder: "profiles",
    },
    cloudinary.config().api_secret!
  );
  return {
    signature: signature,
    timestamp: timestamp,
    cloudname: cloudinary.config().cloud_name,
    apikey: cloudinary.config().api_key,
  };
}
