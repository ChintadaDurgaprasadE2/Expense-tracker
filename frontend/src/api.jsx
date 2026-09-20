import axios from "axios";

// Automatically detect environment:
// When running locally in browser (localhost or 127.0.0.1), route directly to local server (port 5000) for instant response.
// When deployed on Vercel or other hosts, use the production Render backend (or custom VITE_API_URL if configured).
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const baseURL =
  import.meta.env.VITE_API_URL ||
  (isLocal
    ? "http://localhost:5000/api"
    : "https://expense-tracker-51lt.onrender.com/api");

const API = axios.create({
  baseURL,
  timeout: 60000, // 60s to accommodate cloud cold starts
  headers: { "Content-Type": "application/json" }
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;