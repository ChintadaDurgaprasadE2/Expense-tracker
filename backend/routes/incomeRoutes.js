import express from "express";
import { addIncome, getIncome } from "../controllers/incomeController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, addIncome);
router.get("/", auth, getIncome);

export default router;