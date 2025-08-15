import User from "../models/user.model.js";
import urlSchema from "../models/shortUrl.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

export const findUserByEmailAndPassword = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (name, email, password) => {
  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });
  await newUser.save();
  return newUser;
};

export const getUserAllUrls = async (id) => {
  return await urlSchema.find({ user: id });
};
