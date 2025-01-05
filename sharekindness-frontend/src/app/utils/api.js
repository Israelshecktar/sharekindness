import axios from "axios";
import { toast } from "react-toastify";

// Base Axios Instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, ""), // Ensure no trailing slash
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response.data; // Return `response.data` for consistent usage in components
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401) and retry logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
            { refresh: refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Update the token in localStorage
          localStorage.setItem("accessToken", data.access);

          // Update headers for the retry
          api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
          originalRequest.headers.Authorization = `Bearer ${data.access}`;

          return api(originalRequest); // Retry the original request
        } catch (refreshError) {
          // Handle refresh token errors
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth"; // Redirect to login
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, log out the user
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth"; // Redirect to login
      }
    }

    // For all other errors
    return Promise.reject(error);
  }
);

// Logout function
export const logout = async () => {
  try {
    const refresh = localStorage.getItem("refreshToken");
    const response = await api.post("api/logout/", { refresh });

    if (response?.status === 200) {
      toast.success("Logout successful!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth"; // Redirect to login
    } else {
      toast.error(response?.detail || "Logout failed!");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("An error occurred during logout!");
  }
};

export default api;
