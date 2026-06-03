import { useState } from "react";
import API from "../api.jsx";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      onLogin?.();

      alert("Login Successful ✅");

      nav("/dashboard");

    } catch (err) {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button className="btn btn-auth" onClick={handleLogin}>Login</button>

      {/* 👉 Link to register */}
      <p>New user? <a href="/">Register</a></p>
    </div>
  );
}