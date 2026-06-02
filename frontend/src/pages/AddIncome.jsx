import { useState } from "react";
import API from "../api.jsx";

export default function AddIncome() {
  const [data, setData] = useState({
    source: "",
    amount: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/income", data);
      alert("Income Added ✅");
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div className="form-box">
      <h2>Add Income</h2>

      <input
        placeholder="Source"
        value={data.source}
        onChange={e => setData({ ...data, source: e.target.value })}
      />

      <input
        placeholder="Amount"
        value={data.amount}
        onChange={e => setData({ ...data, amount: e.target.value })}
      />

      <button onClick={handleSubmit}>Add Income</button>
    </div>
  );
}