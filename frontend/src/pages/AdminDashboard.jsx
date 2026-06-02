import { useEffect, useState } from "react";
import API from "../api.jsx";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <div className="card">
        {users.map(u => (
          <div className="expense-item" key={u._id}>
            <span>{u.email}</span>
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}