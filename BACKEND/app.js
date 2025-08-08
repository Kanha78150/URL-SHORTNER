import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import dbConfig from "./src/config/db.config.js";
import urlSchema from "./src/models/shortUrl.model.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";

dotenv.config("./.env");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConfig();

app.post("/api/create", shortUrlRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT || 5000}`);
});
