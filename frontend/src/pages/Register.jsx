import { useState } from "react";
import API from "../api.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);

      alert("Registered Successfully ✅");

      // 👉 Go to login page
      nav("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button className="btn btn-auth" onClick={handleRegister}>Register</button>

      {/* 👉 Link to login */}
      <p>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}