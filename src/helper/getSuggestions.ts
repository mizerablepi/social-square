"use server";

import User from "@/models/User";
import { connect } from "@/dbConfig";

export default async function getSuggestions(userId: string) {
  connect();
  const countOfUsers = await User.estimatedDocumentCount();
  const numberOfUsersToSend = 3;
  if (countOfUsers < numberOfUsersToSend) {
    const users = await User.find({ _id: { $ne: userId } }).exec();
    return users;
  } else {
    const randomNumber = Math.random() * (countOfUsers - numberOfUsersToSend);
    const users = await User.find({})
      .skip(randomNumber)
      .limit(numberOfUsersToSend)
      .exec();
    return users;
  }
}
