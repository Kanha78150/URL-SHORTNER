import axiosInstance from "./axiosInstance";

export const createShortURL = async (url) => {
  const { data } = await axiosInstance.post("/api/create", { url });
  return data.shortUrl;
};
