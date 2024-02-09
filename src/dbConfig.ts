import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      // console.log("Connected to DB");
    });

    connection.on("error", (err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
}
