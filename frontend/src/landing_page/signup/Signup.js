import React, { useState } from "react";

const PORTB =  process.env.REACT_APP_BACK;

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle between login and register
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? `${PORTB}/login` : `${PORTB}/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (isLogin) {
        if (data.token) {
          // Login successful
          localStorage.setItem("token", data.token);
          setUser(data.user); // update user in index.js
          setMessage("Login successful!");
        } else {
          setMessage(data.msg || "Login failed");
        }
      } else {
        // Registration
        if (data.msg === "User registered successfully") {
          setMessage("Registration successful! You can now login.");
          setIsLogin(true); // switch to login
        } else {
          setMessage(data.msg || "Registration failed");
        }
      }
    } catch (err) {
      setMessage("Server error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
        style={{ display: "block", width: "100%" }}
      >
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default Signup;

