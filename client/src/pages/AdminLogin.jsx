

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/AdminLogin.css"; // ✅ Import CSS

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/admin/login", {
        email: form.email,
        password: form.password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", "true");

        window.dispatchEvent(new Event("storage"));
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-login-title">🔐 Admin Login</h2>
        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="admin-email" className="admin-label">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="admin-input"
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="admin-password" className="admin-label">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              className="admin-input"
            />
          </div>

          <button type="submit" className="admin-btn" style={{ marginTop: "1.5rem" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
