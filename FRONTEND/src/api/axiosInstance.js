import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );

      switch (error.response.status) {
        case 400:
          throw new Error("Invalid request. Please check your input.");
        case 404:
          throw new Error("Resource not found.");
        case 409:
          throw new Error("URL already exists or conflict occurred.");
        case 500:
          throw new Error("Server error. Please try again later.");
        default:
          throw new Error(
            `Request failed with status ${error.response.status}`
          );
      }
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.request);
      throw new Error("Network error. Please check your connection.");
    } else {
      // Request setup error
      console.error("Request error:", error.message);
      throw new Error("Request failed. Please try again.");
    }
  }
);

export default axiosInstance;
