import express from "express";
import dotenv from "dotenv";
import dbConfig from "./src/config/db.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

dotenv.config("./.env");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConfig();

app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT || 5000}`);
});
