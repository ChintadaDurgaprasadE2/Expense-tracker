import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add-expense">Add Expense</Link>
      <Link to="/add-income">Add Income</Link>
      <Link to="/admin">Admin</Link>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}