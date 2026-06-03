import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import AddIncome from "./pages/AddIncome.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* PRIVATE ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/add-income" element={<AddIncome />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;