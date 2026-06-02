// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import expenseRoutes from "./routes/expenseRoutes.js";
// import incomeRoutes from "./routes/incomeRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/income", incomeRoutes);

// app.listen(5000, () => console.log("Server running"));
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

// ✅ FIRST middleware
app.use(cors());
app.use(express.json());

// ✅ THEN routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server
app.listen(5000, () => console.log("Server running on port 5000"));