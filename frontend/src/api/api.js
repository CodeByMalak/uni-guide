import axios from "axios";

const normalizeApiUrl = (url) => {
  const trimmed = (url || "/api").trim().replace(/\/+$/, "");
  return trimmed || "/api";
};

// In local development, /api is proxied by Vite to the Express backend.
// In production (Vercel), set VITE_API_URL to the deployed backend URL:
//   e.g. https://your-backend.onrender.com/api
const BASE_URL = normalizeApiUrl(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ────────────────────────────────────────────────────
// Attach the JWT token from localStorage to every outgoing request.
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

// ── Response interceptor ───────────────────────────────────────────────────
// Handle global errors so individual components don't need to repeat this.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 401 Unauthorized — token expired or invalid; clear it and redirect.
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        // Only redirect if not already on an auth page to avoid loops.
        const authPaths = ["/login", "/signup"];
        if (!authPaths.includes(window.location.pathname)) {
          window.location.href = "/login";
        }
      }

      // 403 Forbidden — user is logged in but lacks permission; leave them.
      // 500 Server errors — surface the backend message if available.
    } else if (error.request) {
      // Request was made but no response received (network/CORS issue).
      console.error(
        "⚠️ No response from backend — is the server running on port 5000?",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;
