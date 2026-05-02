import axios from "axios";

// Use environment variable for API base URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.jsgallor.com";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vendorToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 unauthorized globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("vendorToken");
      localStorage.removeItem("vendor");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;