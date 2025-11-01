import axios from "axios";

// Helper function to get base URL from localStorage or fallback to env
const getBaseURL = (localStorageKey, envKey) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) return stored;
  }
  return import.meta.env[envKey];
};

const API = axios.create({
  baseURL: getBaseURL("apiBaseUrl", "VITE_API_URL"),
  withCredentials: true, // <- enable cookies to be sent
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Separate instance for authentication API with different base URL
export const AuthAPI = axios.create({
  baseURL: getBaseURL("authBaseUrl", "VITE_AUTH_API_URL"),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Export function to update base URLs dynamically
export const updateApiBaseURL = (url) => {
  API.defaults.baseURL = url;
};

export const updateAuthBaseURL = (url) => {
  AuthAPI.defaults.baseURL = url;
};

export default API;
