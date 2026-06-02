import { useState } from "react";
import API from "../api.jsx";

export default function AddExpense() {
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/expenses", data);
      alert("Expense Added ✅");
    } catch (err) {
  console.log("ERROR 👉", err);
  console.log("RESPONSE 👉", err.response);
  alert(err.response?.data?.msg || "Error ❌");
}
  };

  return (
    <div className="form-box">
      <h2>Add Expense</h2>

      <input
        placeholder="Title"
        value={data.title}
        onChange={e => setData({ ...data, title: e.target.value })}
      />

      <input
        placeholder="Amount"
        value={data.amount}
        onChange={e => setData({ ...data, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        value={data.category}
        onChange={e => setData({ ...data, category: e.target.value })}
      />

      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
}