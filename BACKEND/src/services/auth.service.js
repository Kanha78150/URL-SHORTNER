import {
  createUser,
  findUserByEmail,
  findUserByEmailAndPassword,
} from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserService = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new ConflictError("User already exists.");

  const newUser = await createUser(name, email, password);
  const token = await signToken({ id: newUser._id });
  return { token, user };
};

export const loginUserServices = async (email, password) => {
  const user = await findUserByEmailAndPassword(email);

  if (!user) throw new Error("Invalid credentials");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = await signToken({ id: user._id });
  return { token, user };
};
