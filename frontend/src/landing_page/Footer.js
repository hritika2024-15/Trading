import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const dashUrl = process.env.REACT_APP_DASH_URL || "http://localhost:3001";

  return (
    <footer
      style={{
        backgroundColor: "#f1f5f9",
        borderTop: "1px solid rgba(226, 232, 240, 0.9)",
        padding: "60px 0 30px 0",
        fontFamily: "var(--font-main)",
      }}
    >
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-5">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  fontSize: "14px",
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                }}
              >
                VX
              </div>
              <span style={{ fontWeight: "800", fontSize: "18px", color: "#0f172a", letterSpacing: "1px" }}>
                VORTEX
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.7", maxWidth: "400px" }}>
              Next-generation algorithmic Direct Market Access (DMA) execution platform. Engineered with 3D market topology, high-throughput WebSocket telemetry, and sub-millisecond routing pipelines.
            </p>
          </div>

          <div className="col-6 col-md-3 offset-md-1">
            <h5 style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "1px", marginBottom: "16px" }}>
              PLATFORM NAVIGATION
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2.2" }}>
              <li>
                <a href={dashUrl} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem" }}>
                  Launch Terminal &rarr;
                </a>
              </li>
              <li>
                <Link to="/pricing" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem" }}>
                  Execution Tiers
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem" }}>
                  Open DMA Account
                </Link>
              </li>
              <li>
                <a href={`${dashUrl}/login`} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem" }}>
                  Terminal Sign In
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h5 style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "1px", marginBottom: "16px" }}>
              CORE PROTOCOLS
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2.2", color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>
              <li>PROTOCOL: FIX 4.4 / ITCH</li>
              <li>TICK LATENCY: &lt; 0.12ms</li>
              <li>ENCRYPTION: QUANTUM RSA 4096</li>
              <li>CO-LOCATION: DIRECT NSE</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            paddingTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            fontSize: "12px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div>
            &copy; 2026 VORTEX QUANTUM TECHNOLOGIES // PROPRIETARY TRADING ARCHITECTURE.
          </div>
          <div>
            MEMBERSHIP: NSE, BSE &amp; MCX // DMA CLEARING FACILITY
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;