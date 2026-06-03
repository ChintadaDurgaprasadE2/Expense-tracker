import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Graphs from "./pages/Graphs.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import AddIncome from "./pages/AddIncome.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* PRIVATE ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/add-income" element={<AddIncome />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;