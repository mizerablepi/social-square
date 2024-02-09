import mongoose from "mongoose";
import Post from "@/models/Post";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a valid username"],
    minlength: 3,
    maxlength: 18,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
  },
  password: { type: String, required: true },
  profilePicture: { type: String },
  followers: [{ type: Schema.Types.ObjectId, ref: this }],
  following: [{ type: Schema.Types.ObjectId, ref: this }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
