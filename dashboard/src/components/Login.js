import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ThreeTerminalCanvas from "./ThreeTerminalCanvas";
import "./Login.css";

const PORTB = process.env.REACT_APP_BACKEND_URL;

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${PORTB}/login`, {
        username: formData.username,
        password: formData.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        if (onLoginSuccess) {
          onLoginSuccess(res.data);
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "Authentication failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* 3D Interactive WebGL Background */}
      <ThreeTerminalCanvas variant="login" />

      {/* Cyber HUD Login Panel */}
      <div className="login-card">
        <div className="login-logo-container">
          <img src="logo-d.svg" alt="VORTEX" className="login-logo-mark" />
          <h1 className="login-title">
            VORTEX
          </h1>
          <p className="subtitle">AUTHENTICATE 3D DMA TERMINAL ACCESS</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">TRADER IDENTIFIER</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoFocus
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">CRYPTOGRAPHIC KEY</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "AUTHENTICATING SESSION..." : "INITIALIZE TERMINAL SESSION"}
          </button>
        </form>

        <div className="signup-link">
          NO TRADER ACCESS? <Link to="/signup">INITIALIZE ACCOUNT</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
