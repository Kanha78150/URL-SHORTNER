import { getUserAllUrls } from "../dao/user.dao.js";

export const getUserUrls = async (req, res, next) => {
  const { _id } = req.user;
  const urls = await getUserAllUrls(_id);
  try {
    res.status(200).json({
      message: "User urls",
      urls,
    });
  } catch (error) {
    next(error);
  }
};
