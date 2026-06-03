import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const logout = () => {
    localStorage.removeItem("token");
    onLogout?.();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Expense Tracker</div>

      <div className="nav-group">
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/add-expense">
          Add Expense
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/add-income">
          Add Income
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/graphs">
          Graphs
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/reports">
          Reports
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/settings">
          Settings
        </NavLink>
      </div>

      <button className="logout-button" onClick={logout}>Logout</button>
    </nav>
  );
}