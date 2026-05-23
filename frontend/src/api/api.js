import axios from "axios";

// Accessing environment variables in Vite and stripping any trailing slash
let BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
if (BASE_URL.endsWith("/")) {
  BASE_URL = BASE_URL.slice(0, -1);
}

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor for Auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (e.g., token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Optional: redirect to login if not already there
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
