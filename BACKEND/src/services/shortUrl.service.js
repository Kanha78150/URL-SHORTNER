import { generateNanoId } from "../utils/generateNanoId.js";

export const createShortUrlService = (url) => {
  const shortUrl = generateNanoId(7);
  const newUrl = new urlSchema({
    originalUrl: url,
    shortUrl: shortUrl,
  });
  newUrl.save();
  return shortUrl;
};
