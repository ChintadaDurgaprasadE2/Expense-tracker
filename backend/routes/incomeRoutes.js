import express from "express";
import { addIncome, getIncome,updateIncome,
  deleteIncome } from "../controllers/incomeController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, addIncome);
router.get("/", auth, getIncome);
router.put("/:id", auth, updateIncome);
router.delete("/:id", auth, deleteIncome);

export default router;