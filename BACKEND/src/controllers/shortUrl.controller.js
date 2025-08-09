import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlServiceWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  console.log("Original URL:", url);

  const shortUrl = await createShortUrlServiceWithoutUser(url);
  console.log("Short Url without User:", shortUrl);

  res.send(process.env.APP_URL + shortUrl);
};

// This function handles the redirection from the short URL to the original URL
// It retrieves the original URL from the database using the short URL identifier
// and then redirects the user to that original URL.
export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  res.redirect(url.originalUrl);
};
