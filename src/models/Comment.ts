import mongoose from "mongoose";

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  text: { type: String, required: [true, "Comment text required"] },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, required: true, default: Date.now() },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
