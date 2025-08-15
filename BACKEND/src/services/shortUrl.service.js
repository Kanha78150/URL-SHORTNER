import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";

export const createShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL is not generated.");
  await saveShortUrl(url, shortUrl);
  return shortUrl;
};

export const createShortUrlServiceWithUser = async (
  url,
  userId,
  slug = null
) => {
  const existingUrl = await urlSchema.findOne({
    originalUrl: url,
    user: userId,
  });

  if (existingUrl) {
    return existingUrl.shortUrl;
  }

  const shortUrl = slug || generateNanoId(7);
  const exist = await getCustomShortUrl(slug);
  if (exist) throw new Error("Short URL already exists.");
  await saveShortUrl(url, shortUrl, userId);
  return shortUrl;
};
