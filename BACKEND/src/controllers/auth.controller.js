import { cookiesOption } from "../config/config.js";
import {
  loginUserServices,
  registerUserService,
} from "../services/auth.service.js";

export const register_user = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await registerUserService(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookiesOption);
    res.status(201).json({
      message: "User registered successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const login_user = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserServices(email, password);
    req.user = user;
    res.cookie("accessToken", token, cookiesOption);
    res.status(200).json({
      message: "User login successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout_user = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", cookiesOption);
    res.status(200).json({
      message: "User logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getToken = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
