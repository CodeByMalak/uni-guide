import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Helper to get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Helper to set token in localStorage
export const setToken = (token) => localStorage.setItem("token", token);

// Helper to remove token
export const removeToken = () => localStorage.removeItem("token");

// Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
