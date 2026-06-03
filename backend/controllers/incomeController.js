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
// UPDATE INCOME
export const updateIncome = async (req, res) => {
  try {
    const updated = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Error updating income" });
  }
};

// DELETE INCOME
export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ msg: "Income deleted" });
  } catch {
    res.status(500).json({ msg: "Error deleting income" });
  }
};