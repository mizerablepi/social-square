const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  text: { type: String, required: [true, "Comment text required"] },
  author: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  post: { type: String, required: true },
});
module.exports = mongoose.model("Comment", commentSchema);
