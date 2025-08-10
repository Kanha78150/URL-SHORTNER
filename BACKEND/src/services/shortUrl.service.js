import { saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/generateNanoId.js";

export const createShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = await generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL is not generated.");
  await saveShortUrl(url, "3oPMBWC");
  return shortUrl;
};

export const createShortUrlServiceWithUser = async (url, userId) => {
  const shortUrl = await generateNanoId(7);
  await saveShortUrl(url, shortUrl, userId);
  return shortUrl;
};
