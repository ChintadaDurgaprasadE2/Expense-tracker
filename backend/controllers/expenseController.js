// import Expense from "../models/Expense.js";

// export const addExpense = async (req, res) => {
//   const expense = await Expense.create({
//     ...req.body,
//     user: req.user.id
//   });
//   res.json(expense);
// };

// export const getExpenses = async (req, res) => {
//   const data = await Expense.find({ user: req.user.id });
//   res.json(data);
// };

// export const deleteExpense = async (req, res) => {
//   await Expense.findByIdAndDelete(req.params.id);
//   res.json({ msg: "Deleted" });
// };
import Expense from "../models/Expense.js";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.userId // from token
    });

    res.json(expense);

  } catch (err) {
    res.status(500).json({ msg: "Error adding expense" });
  }
};

// GET ALL EXPENSES
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching expenses" });
  }
};