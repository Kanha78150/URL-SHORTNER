import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlServiceWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlServiceWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    next(error);
  }
};

// This function handles the redirection from the short URL to the original URL
// It retrieves the original URL from the database using the short URL identifier
// and then redirects the user to that original URL.
export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);
    if (!url) throw new Error("Short URL not found");
    res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};
