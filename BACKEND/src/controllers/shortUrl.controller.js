import { getShortUrl } from "../dao/shortUrl.js";
import {
  createShortUrlServiceWithoutUser,
  createShortUrlServiceWithUser,
} from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body;
    let shortUrl;
    if (req.user) {
      shortUrl = await createShortUrlServiceWithUser(
        data.url,
        req.user._id,
        data.slug
      );
    } else {
      shortUrl = await createShortUrlServiceWithoutUser(data.url);
    }
    res.status(200).json({
      shortUrl: process.env.APP_URL + shortUrl,
    });
  } catch (error) {
    next(error);
  }
};
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

export const createCustomShortUrl = async (req, res, next) => {
  try {
    const { url, slug } = req.body;
    const shortUrl = await createShortUrlServiceWithoutUser(url, customUrl);
    res.status(200).json({
      shortUrl: process.env.APP_URL + shortUrl,
    });
  } catch (error) {
    next(error);
  }
};
