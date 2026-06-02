import Income from "../models/Income.js";

// ADD INCOME
export const addIncome = async (req, res) => {
  try {
    const income = await Income.create({
      ...req.body,
      user: req.userId
    });

    res.json(income);
  } catch (err) {
    res.status(500).json({ msg: "Error adding income" });
  }
};

// GET INCOME
export const getIncome = async (req, res) => {
  try {
    const data = await Income.find({ user: req.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching income" });
  }
};