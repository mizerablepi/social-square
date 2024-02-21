import mongoose from "mongoose";
import User from "@/models/User";
import Comment from "./Comment";
const Schema = mongoose.Schema;
const postSchema = new Schema({
  image: { type: String },
  author: { type: Schema.Types.ObjectId, required: true, ref: User },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: User }],
  publishedAt: { type: Date, required: true, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: Comment }],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
