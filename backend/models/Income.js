import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Income", incomeSchema);