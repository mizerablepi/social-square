"use server";

import User from "@/models/User";
import { connect } from "@/dbConfig";
import Post from "@/models/Post";

export async function getUserSuggestions(userId: string) {
  connect();
  const countOfUsers = await User.estimatedDocumentCount();
  const NUMBER_OF_USER_TO_SEND = 3;
  if (countOfUsers < NUMBER_OF_USER_TO_SEND) {
    const users = await User.find({ _id: { $ne: userId } }).exec();
    return users;
  } else {
    const randomNumber =
      Math.random() * (countOfUsers - NUMBER_OF_USER_TO_SEND);
    const users = await User.find({})
      .skip(randomNumber)
      .limit(NUMBER_OF_USER_TO_SEND)
      .exec();
    return users;
  }
}

export async function getPostSuggestion(userId: string) {
  connect();
  const countOfPosts = await Post.estimatedDocumentCount();
  const NUMBER_OF_POST_TO_SEND = 5;
  if (countOfPosts < NUMBER_OF_POST_TO_SEND) {
    const posts = await Post.find({ author: { $ne: userId } }).exec();
    return posts;
  } else {
    const posts = await Post.find({ author: { $ne: userId } })
      .sort({ publishedAt: -1, likes: -1 })
      .limit(5);
    return posts;
  }
}
