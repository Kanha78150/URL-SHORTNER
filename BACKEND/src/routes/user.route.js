import express from "express";
import { getUserUrls } from "../controllers/getUserUrls.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/urls", authMiddleware, getUserUrls);

export default router;
