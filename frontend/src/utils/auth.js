/**
 * Auth token helpers — thin wrappers around localStorage.
 * The actual axios instance for API calls lives in src/api/api.js.
 */

// Get JWT token from localStorage
export const getToken = () => localStorage.getItem("token");

// Persist JWT token to localStorage
export const setToken = (token) => localStorage.setItem("token", token);

// Remove JWT token from localStorage (logout)
export const removeToken = () => localStorage.removeItem("token");
