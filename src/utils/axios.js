import axios from "axios";

// Use environment variable for API base URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.jsgallor.com";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// No interceptors – authentication has been removed

export default axiosInstance;