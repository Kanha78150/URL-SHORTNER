import axiosInstance from "./axiosInstance";

export const registerUserAPI = async (name, email, password) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

export const loginUserAPI = async (email, password) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

export const logoutUserUserAPI = async () => {
  const { data } = await axiosInstance.get("/api/auth/logout");
  return data;
};

export const getTokenUserAPI = async () => {
  const { data } = await axiosInstance.get("/api/auth/me");
  return data;
};

export const getUserUrlsAPI = async () => {
  const { data } = await axiosInstance.post("/api/user/urls");
  return data;
};
