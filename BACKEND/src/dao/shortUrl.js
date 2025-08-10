import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (longUrl, shortUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      originalUrl: longUrl,
      shortUrl: shortUrl,
    });
    if (userId) {
      newUrl.user_id = userId;
    }
    await newUrl.save();
  } catch (error) {
    throw new ConflictError();
  }
};

export const getShortUrl = async (shortUrl) => {
  return await urlSchema.findOneAndUpdate(
    { shortUrl: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
