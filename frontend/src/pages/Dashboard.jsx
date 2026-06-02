// import { useEffect, useState } from "react";
// import API from "../api.jsx";
// import ChartComponent from "../components/ChartComponent.jsx";

// export default function Dashboard() {
//   const [summary, setSummary] = useState({});
//   const [expenses, setExpenses] = useState([]);
//   const [income, setIncome] = useState([]);

//   useEffect(() => {
//     API.get("/reports/summary").then(res => setSummary(res.data));
//     API.get("/expenses").then(res => setExpenses(res.data));
//     API.get("/income").then(res => setIncome(res.data));
//   }, []);
  

//   const chartData = [
//     { name: "Income", value: summary.totalIncome || 0 },
//     { name: "Expense", value: summary.totalExpense || 0 }
//   ];

//   return (
//     <div className="container">
//       <h2>Dashboard</h2>

//       <div className="dashboard">
//         <div className="summary-card">
//           <h3>Balance</h3>
//           <p>₹{summary.balance}</p>
//         </div>

//         <div className="summary-card">
//           <h3>Income</h3>
//           <p>₹{summary.totalIncome}</p>
//         </div>

//         <div className="summary-card">
//           <h3>Expense</h3>
//           <p>₹{summary.totalExpense}</p>
//         </div>
//       </div>

//       <ChartComponent data={chartData} />

//       <div className="card">
//         {expenses.map(e => (
//           <div className="expense-item" key={e._id}>
//             <span>{e.title}</span>
//             <span>₹{e.amount}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../api.jsx";
import ChartComponent from "../components/ChartComponent.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  // 🔄 Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const expRes = await API.get("/expenses");
      const incRes = await API.get("/income");

      setExpenses(expRes.data);
      setIncome(incRes.data);

    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  // 💰 Calculations
  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount), 0
  );

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount), 0
  );

  const balance = totalIncome - totalExpense;

  // 📊 Chart Data
  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* 🔢 Summary Cards */}
      <div className="dashboard">
        <div className="summary-card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>

        <div className="summary-card">
          <h3>Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="summary-card">
          <h3>Expense</h3>
          <p>₹{totalExpense}</p>
        </div>
      </div>

      {/* 📊 Chart */}
      <div className="card">
        <h3>Income vs Expense</h3>
        <ChartComponent data={chartData} />
      </div>

      {/* 💸 Expense History */}
      <div className="card">
        <h3>Expense History</h3>

        {expenses.length === 0 ? (
          <p>No expenses added</p>
        ) : (
          expenses.map(e => (
            <div className="expense-item" key={e._id}>
              <span>{e.title}</span>
              <span>₹{e.amount}</span>
            </div>
          ))
        )}
      </div>

      {/* 💵 Income History */}
      <div className="card">
        <h3>Income History</h3>

        {income.length === 0 ? (
          <p>No income added</p>
        ) : (
          income.map(i => (
            <div className="expense-item" key={i._id}>
              <span>{i.source}</span>
              <span>₹{i.amount}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}