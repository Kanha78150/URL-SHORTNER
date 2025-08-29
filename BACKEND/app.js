import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConfig from "./src/config/db.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import authRoute from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173", // dev
      "https://urlshrotnerapp.netlify.app/", // production
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConfig();

app.use(cookieParser());
app.use(attachUser);
app.use("/api/auth", authRoute);
app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectFromShortUrl);
app.use("/api/user", userRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT || 5000}`);
});
