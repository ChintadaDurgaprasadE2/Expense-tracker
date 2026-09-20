import { useState } from "react";
import API from "../api.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await API.post("/auth/register", form);

      alert("Registered Successfully ✅");
      nav("/login");

    } catch (err) {
      const message =
        err.response?.data?.msg ||
        (err.code === "ECONNABORTED"
          ? "Server took too long to respond. Render may be waking up, please retry in a few seconds."
          : !err.response
          ? "Cannot connect to backend server. Make sure your local server is running on port 5000."
          : "Registration Error ❌");

      setErrorMsg(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>

      {errorMsg && (
        <p style={{ color: "#fb7185", marginBottom: "12px", fontSize: "0.9rem", textAlign: "center" }}>
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* 👉 Link to login */}
      <p>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}