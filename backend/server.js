// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import connectDB from "./config/db.js";

// // import authRoutes from "./routes/authRoutes.js";
// // import expenseRoutes from "./routes/expenseRoutes.js";
// // import incomeRoutes from "./routes/incomeRoutes.js";

// // dotenv.config();
// // connectDB();

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // app.use("/api/auth", authRoutes);
// // app.use("/api/expenses", expenseRoutes);
// // app.use("/api/income", incomeRoutes);

// // app.listen(5000, () => console.log("Server running"));
// import dns from "dns";
// dns.setDefaultResultOrder("ipv4first");

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "./routes/authRoutes.js";
// import expenseRoutes from "./routes/expenseRoutes.js";
// import incomeRoutes from "./routes/incomeRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ FIRST middleware
// app.use(cors({
//   origin: "https://your-frontend.vercel.app"
// }));
// app.use(express.json());

// // ✅ THEN routes
// app.use("/api/auth", authRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/income", incomeRoutes);
// // DB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // server
// app.listen(5000, () => console.log("Server running on port 5000"));
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

// ✅ CORS configuration for your frontend + local dev
const allowedOrigins = [
  "https://expense-tracker-virid-phi-27.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: origin not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Correct PORT for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));