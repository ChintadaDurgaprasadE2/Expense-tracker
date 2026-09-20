import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    onLogout?.();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <nav className="navbar guest-navbar">
        <div className="nav-brand">💰 Expense Tracker</div>
        <div className="nav-guest-actions">
          <NavLink
            to="/login"
            className={({ isActive }) => `btn-guest-login${isActive ? " active" : ""}`}
          >
            Login
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) => `btn-guest-register${isActive ? " active" : ""}`}
          >
            ✨ Register (New User)
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">💰 Expense Tracker</div>

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