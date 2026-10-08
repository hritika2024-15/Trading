import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  const dashUrl = process.env.REACT_APP_DASH_URL || "http://localhost:3001";

  return (
    <div className="container py-5 my-4">
      <div className="glass-panel p-5 text-center" style={{ border: "1px solid var(--border-neon)" }}>
        <div className="telemetry-badge mb-3">INSTANT ONBOARDING</div>
        <h2
          style={{
            fontFamily: "var(--font-main)",
            fontSize: "2.4rem",
            fontWeight: "800",
            color: "var(--text-primary)",
            marginBottom: "15px",
          }}
        >
          Initialize Your DMA Trading Account
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto 30px auto" }}>
          Instant paperless KYC, ₹0 delivery brokerage, direct exchange connectivity, and automated risk controls.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/register" className="btn-cyber-primary" style={{ padding: "14px 32px" }}>
            Create Account Online
          </Link>
          <a href={`${dashUrl}/login`} className="btn-cyber-outline" style={{ padding: "14px 28px" }}>
            Sign In to Terminal
          </a>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;