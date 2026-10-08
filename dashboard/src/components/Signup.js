import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThreeTerminalCanvas from "./ThreeTerminalCanvas";
import "./Login.css";

const PORTB = process.env.REACT_APP_BACKEND_URL;

const Signup = ({ onSwitchToLogin, setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${PORTB}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Error registering user");
      } else {
        // Automatically login after signup
        const loginRes = await fetch(`${PORTB}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: formData.username, password: formData.password }),
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("username", formData.username);
          if (setUser) {
            setUser({ token: loginData.token });
          }
          window.location.href = "/";
        } else {
          setError(loginData.msg || "Login failed after signup");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      {/* 3D WebGL Background */}
      <ThreeTerminalCanvas variant="login" />

      {/* Cyber HUD Signup Panel */}
      <div className="login-card">
        <div className="login-logo-container">
          <img src="logo-d.svg" alt="VORTEX" className="login-logo-mark" />
          <h1 className="login-title">
            VORTEX
          </h1>
          <p className="subtitle">INITIALIZE DMA TRADING IDENTITY</p>
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
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">CONFIRM KEY</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "INITIALIZING TRADER IDENTITY..." : "CREATE DMA ACCOUNT"}
          </button>
        </form>

        <div className="signup-link">
          ALREADY INITIALIZED? <Link to="/login">TERMINAL LOGIN</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
