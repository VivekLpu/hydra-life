
// client/src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.meta.env.VITE_API_URL,
  withCredentials: false,
});

// Add a request interceptor to attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // wherever you stored it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
