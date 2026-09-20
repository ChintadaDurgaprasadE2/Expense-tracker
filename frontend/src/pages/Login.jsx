import { useState } from "react";
import API from "../api.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      onLogin?.();

      alert("Login Successful ✅");
      nav("/dashboard");

    } catch (err) {
      const message =
        err.response?.data?.msg ||
        (err.code === "ECONNABORTED"
          ? "Server took too long to respond. Render may be waking up, please retry in a few seconds."
          : !err.response
          ? "Cannot connect to backend server. Make sure your local server is running on port 5000."
          : "Invalid Email or Password ❌");

      setErrorMsg(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-box">
      {/* 🌟 Tab switcher */}
      <div className="auth-tab-group">
        <Link to="/login" className="auth-tab active">
          Login
        </Link>
        <Link to="/" className="auth-tab">
          <span className="badge-new">New</span> Register
        </Link>
      </div>

      <h2>Welcome Back</h2>

      {errorMsg && (
        <p style={{ color: "#fb7185", marginBottom: "12px", fontSize: "0.9rem", textAlign: "center" }}>
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="btn btn-auth"
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>

      {/* 🌟 Highlighted prompt for new users */}
      <div className="auth-switch-prompt">
        <span>Are you a new user?</span>
        <Link to="/" className="btn-highlight-link">
          ✨ Create New Account ➔
        </Link>
      </div>
    </div>
  );
}