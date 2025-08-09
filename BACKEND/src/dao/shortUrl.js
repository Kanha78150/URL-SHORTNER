import urlSchema from "../models/shortUrl.model.js";

export const saveShortUrl = async (longUrl, shortUrl, userId) => {
  const newUrl = new urlSchema({
    originalUrl: longUrl,
    shortUrl: shortUrl,
  });

  if (userId) {
    newUrl.user_id = userId;
  }
  await newUrl.save();
};

export const getShortUrl = async (shortUrl) => {
  return await urlSchema.findOne({ shortUrl: shortUrl });
};
