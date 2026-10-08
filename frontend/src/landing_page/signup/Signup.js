import React, { useState } from "react";

const PORTB = process.env.REACT_APP_BACK || "http://localhost:8080";
const DASH_URL = process.env.REACT_APP_DASH_URL || "http://localhost:3001";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const url = `${PORTB}/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.msg === "User registered successfully") {
        setMessage("Account initialized! Redirecting to Terminal...");
        setTimeout(() => {
          window.location.href = `${DASH_URL}/login`;
        }, 1500);
      } else {
        setMessage(data.msg || "Registration failed");
      }
    } catch (err) {
      setMessage("Server connection error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "40px",
          boxShadow: "0 0 50px rgba(0, 240, 255, 0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px auto",
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.6)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: "900", fontSize: "22px", color: "#050713" }}>
              VX
            </span>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", margin: 0, textTransform: "uppercase" }}>
            Initialize DMA Account
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "6px", fontFamily: "var(--font-mono)" }}>
            DIRECT QUANTUM MARKET ACCESS
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginBottom: "8px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.5px",
              }}
            >
              TRADER IDENTIFIER (USERNAME)
            </label>
            <input
              type="text"
              placeholder="e.g. quant_trader_01"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "var(--text-primary)",
                fontSize: "14px",
                fontFamily: "var(--font-mono)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginBottom: "8px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.5px",
              }}
            >
              CRYPTOGRAPHIC KEY (PASSWORD)
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "var(--text-primary)",
                fontSize: "14px",
                fontFamily: "var(--font-mono)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-cyber-primary"
            style={{ width: "100%", padding: "14px", justifyContent: "center" }}
            disabled={loading}
          >
            {loading ? "INITIALIZING..." : "INITIALIZE ACCESS"}
          </button>
        </form>

        <div style={{ marginTop: "30px", textAlign: "center", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 12px 0", fontFamily: "var(--font-mono)" }}>
            ALREADY INITIALIZED?
          </p>
          <button
            onClick={() => {
              window.location.href = `${DASH_URL}/login`;
            }}
            className="btn-cyber-outline"
            style={{ width: "100%", padding: "10px", justifyContent: "center" }}
          >
            TERMINAL LOGIN
          </button>
        </div>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "6px",
              background: message.includes("Redirecting") || message.includes("initialized")
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(244, 63, 94, 0.15)",
              color: message.includes("Redirecting") || message.includes("initialized")
                ? "var(--emerald)"
                : "var(--rose)",
              border: `1px solid ${
                message.includes("Redirecting") || message.includes("initialized")
                  ? "var(--emerald)"
                  : "var(--rose)"
              }`,
              textAlign: "center",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
