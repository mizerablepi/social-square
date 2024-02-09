import mongoose from "mongoose";
import User from "@/models/User";

const Schema = mongoose.Schema;
const postSchema = new Schema({
  image: { type: String },
  author: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: User }],
  publishedAt: { type: Date, required: true, default: Date.now() },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
