import express from "express";
import {
  register_user,
  login_user,
  logout_user,
  getToken,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register_user);
router.post("/login", login_user);
router.get("/logout", logout_user);
router.get("/me", authMiddleware, getToken);

export default router;
