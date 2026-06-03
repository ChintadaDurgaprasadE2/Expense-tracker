// import { useEffect, useState } from "react";
// import API from "../api.jsx";
// import ChartComponent from "../components/ChartComponent.jsx";

// export default function Dashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const [income, setIncome] = useState([]);

//   // 🔄 Fetch data
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const expRes = await API.get("/expenses");
//       const incRes = await API.get("/income");

//       setExpenses(expRes.data);
//       setIncome(incRes.data);

//     } catch (err) {
//       console.log("Error fetching data", err);
//     }
//   };

//   // 💰 Calculations
//   const totalIncome = income.reduce(
//     (sum, item) => sum + Number(item.amount), 0
//   );

//   const totalExpense = expenses.reduce(
//     (sum, item) => sum + Number(item.amount), 0
//   );

//   const balance = totalIncome - totalExpense;

//   // 📊 Chart Data
//   const chartData = [
//     { name: "Income", value: totalIncome },
//     { name: "Expense", value: totalExpense }
//   ];
//   // delete functions
//  const handleDeleteExpense = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this expense?")) return;
//   try {
//     await API.delete(`/expenses/${id}`);
//     setExpenses(prev => prev.filter(e => e._id !== id));

//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleDeleteIncome = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this expense?")) return;
//   try {
//     await API.delete(`/income/${id}`);
//     setIncome(prev => prev.filter(i => i._id !== id));

//   } catch (err) {
//     console.log(err);
//   }
// };
// // edit functions
// const handleEditExpense = async (item) => {
//   const newAmount = prompt("Enter new amount", item.amount);
//   if (!newAmount) return;

//   try {
//     const res = await API.put(`/expenses/${item._id}`, {
//       ...item,
//       amount: newAmount
//     });
//     setExpenses(prev =>
//       prev.map(e => (e._id === item._id ? res.data : e))
//     );

//   } catch (err) {
//     console.log(err);
//   }
// };
// const handleEditIncome = async (item) => {
//   const newAmount = prompt("Enter new amount", item.amount);
//   if (!newAmount) return;

//   try {
//     const res = await API.put(`/income/${item._id}`, {
//       ...item,
//       amount: newAmount
//     });

//     // ✅ update UI instantly
//     setIncome(prev =>
//       prev.map(i => (i._id === item._id ? res.data : i))
//     );

//   } catch (err) {
//     console.log(err);
//   }
// };
//   return (
//     <div className="container">
//       <h2>Dashboard</h2>

//       {/* 🔢 Summary Cards */}
//       <div className="dashboard">
//         <div className="summary-card">
//           <h3>Balance</h3>
//           <p>₹{balance}</p>
//         </div>

//         <div className="summary-card">
//           <h3>Income</h3>
//           <p>₹{totalIncome}</p>
//         </div>

//         <div className="summary-card">
//           <h3>Expense</h3>
//           <p>₹{totalExpense}</p>
//         </div>
//       </div>

//       {/* 📊 Chart */}
//       <div className="card">
//         <h3>Income vs Expense</h3>
//         <ChartComponent data={chartData} />
//       </div>

//       {/* 💸 Expense History */}
//      <div className="card">
//   <h3>Expense History</h3>

//   {expenses.length === 0 ? (
//     <p>No expenses added</p>
//   ) : (
//     expenses.map(e => (
//       <div className="expense-item" key={e._id}>
//         <span>{e.title}</span>
//         <span>₹{e.amount}</span>

//         <button onClick={() => handleEditExpense(e)}>Edit</button>
//         <button onClick={() => handleDeleteExpense(e._id)}>Delete</button>
//       </div>
//     ))
//   )}
// </div>

//       {/* 💵 Income History */}
//     <div className="card">
//   <h3>Income History</h3>

//   {income.length === 0 ? (
//     <p>No income added</p>
//   ) : (
//     income.map(i => (
//       <div className="expense-item" key={i._id}>
//         <span>{i.source}</span>
//         <span>₹{i.amount}</span>

//         <button onClick={() => handleEditIncome(i)}>Edit</button>
//         <button onClick={() => handleDeleteIncome(i._id)}>Delete</button>
//       </div>
//     ))
//   )}
// </div>

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../api.jsx";
import ChartComponent from "../components/ChartComponent.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [crypto, setCrypto] = useState({});

  // 🔄 Load data
  useEffect(() => {
    fetchData();
    fetchCrypto();

    // auto refresh crypto every 10 sec
    const interval = setInterval(fetchCrypto, 10000);
    return () => clearInterval(interval);
  }, []);

  // 📥 Fetch income & expense
  const fetchData = async () => {
    try {
      const expRes = await API.get("/expenses");
      const incRes = await API.get("/income");

      setExpenses(expRes.data);
      setIncome(incRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 💰 Fetch crypto prices
  const fetchCrypto = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=inr"
      );
      const data = await res.json();
      setCrypto(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 💰 Calculations
  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  // 🗑️ DELETE (NO REFRESH)
  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    await API.delete(`/expenses/${id}`);
    setExpenses(prev => prev.filter(e => e._id !== id));
  };

  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Delete this income?")) return;

    await API.delete(`/income/${id}`);
    setIncome(prev => prev.filter(i => i._id !== id));
  };

  // ✏️ EDIT (NO REFRESH)
  const handleEditExpense = async (item) => {
    const newAmount = prompt("Enter new amount", item.amount);
    if (!newAmount) return;

    const res = await API.put(`/expenses/${item._id}`, {
      ...item,
      amount: newAmount
    });

    setExpenses(prev =>
      prev.map(e => (e._id === item._id ? res.data : e))
    );
  };

  const handleEditIncome = async (item) => {
    const newAmount = prompt("Enter new amount", item.amount);
    if (!newAmount) return;

    const res = await API.put(`/income/${item._id}`, {
      ...item,
      amount: newAmount
    });

    setIncome(prev =>
      prev.map(i => (i._id === item._id ? res.data : i))
    );
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* 💳 SUMMARY */}
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

      {/* 📊 CHART */}
      <div className="card">
        <h3>Income vs Expense</h3>
        <ChartComponent data={chartData} />
      </div>

      {/* 💰 CRYPTO */}
      <div className="card">
        <h3>Live Crypto Prices</h3>
        <p>Bitcoin: ₹{crypto.bitcoin?.inr}</p>
        <p>Ethereum: ₹{crypto.ethereum?.inr}</p>
        <p>Solana: ₹{crypto.solana?.inr}</p>
      </div>

      {/* 💸 EXPENSE LIST */}
      <div className="card">
        <h3>Expense History</h3>

        {expenses.length === 0 ? (
          <p>No expenses</p>
        ) : (
          expenses.map(e => (
            <div key={e._id} className="expense-item">
              <span>{e.title}</span>
              <span>₹{e.amount}</span>

              <button onClick={() => handleEditExpense(e)}>Edit</button>
              <button onClick={() => handleDeleteExpense(e._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* 💵 INCOME LIST */}
      <div className="card">
        <h3>Income History</h3>

        {income.length === 0 ? (
          <p>No income</p>
        ) : (
          income.map(i => (
            <div key={i._id} className="expense-item">
              <span>{i.source}</span>
              <span>₹{i.amount}</span>

              <button onClick={() => handleEditIncome(i)}>Edit</button>
              <button onClick={() => handleDeleteIncome(i._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}