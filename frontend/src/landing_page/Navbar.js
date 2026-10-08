import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const dashUrl = process.env.REACT_APP_DASH_URL || "http://localhost:3001";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.9)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
        padding: "12px 0",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Cyber Glyph */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(2, 132, 199, 0.35)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: "900",
                fontSize: "18px",
                color: "#ffffff",
              }}
            >
              VX
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-main)",
                fontWeight: "800",
                fontSize: "20px",
                letterSpacing: "1.5px",
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              VORTEX
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "2px",
                color: "var(--text-muted)",
              }}
            >
              QUANTUM TRADING SYSTEMS
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="d-flex align-items-center gap-3">
          <Link
            to="/pricing"
            style={{
              textDecoration: "none",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--cyan)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
          >
            EXECUTION TIERS
          </Link>

          <a
            href={`${dashUrl}/login`}
            className="btn-cyber-outline"
            style={{ padding: "8px 18px", fontSize: "12px" }}
          >
            Terminal Login
          </a>

          <a
            href={dashUrl}
            className="btn-cyber-primary"
            style={{ padding: "8px 20px", fontSize: "12px" }}
          >
            Launch Terminal <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;