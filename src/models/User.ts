import mongoose from "mongoose";

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
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/db5sjzgsb/image/upload/v1707502544/profiles/odtcmz1q334bzepirev6.png",
  },
  followers: [{ type: Schema.Types.ObjectId, ref: this }],
  following: [{ type: Schema.Types.ObjectId, ref: this }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
