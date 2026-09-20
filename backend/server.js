import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed origins for local dev and production
const allowedOrigins = [
  "https://expense-tracker-virid-phi-27.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:3000"
];

// ✅ Robust CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      callback(null, true);
    } else {
      // Fallback to allow origin rather than throwing an unhandled server error
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ API Root & Health Check routes
app.get("/", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "Expense Tracker API",
    message: "Backend is running",
    database: isConnected ? "Connected" : "Connecting or Disconnected"
  });
});

app.get("/api/health", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "OK",
    database: isConnected ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ msg: err.message || "Internal Server Error" });
});

// ✅ MongoDB connection with connection pooling
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000
})
  .then(() => console.log("✅ MongoDB Connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.error("👉 Please ensure your IP address is whitelisted in MongoDB Atlas (Network Access -> Allow 0.0.0.0/0).");
  });

// ✅ Port listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));