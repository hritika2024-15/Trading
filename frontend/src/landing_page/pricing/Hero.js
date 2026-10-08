import React from "react";

function Hero() {
  return (
    <div className="container py-5">
      <div className="text-center py-5">
        <div className="telemetry-badge mb-3">EXECUTION TIERS &amp; BROKERAGE</div>
        <h1
          style={{
            fontFamily: "var(--font-main)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: "800",
            color: "var(--text-primary)",
          }}
        >
          Transparent Quantum Pricing
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "10px auto 0 auto" }}>
          Predictable flat-fee model with zero hidden costs, no routing markup, and free equity delivery.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <div className="glass-panel p-4 text-center h-100">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "3rem",
                fontWeight: "800",
                color: "var(--emerald)",
                marginBottom: "10px",
              }}
            >
              ₹0
            </div>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.3rem", fontWeight: "700" }}>
              Equity Delivery
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
              All equity delivery investments across NSE and BSE are completely free — zero brokerage fees for lifetime.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="glass-panel p-4 text-center h-100" style={{ border: "1px solid var(--cyan)" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "3rem",
                fontWeight: "800",
                color: "var(--cyan)",
                marginBottom: "10px",
              }}
            >
              ₹20
            </div>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.3rem", fontWeight: "700" }}>
              Intraday &amp; F&amp;O
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
              Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodities. Flat ₹20 on all option trades.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="glass-panel p-4 text-center h-100">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "3rem",
                fontWeight: "800",
                color: "var(--purple)",
                marginBottom: "10px",
              }}
            >
              ₹0
            </div>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.3rem", fontWeight: "700" }}>
              Direct Wealth &amp; SIPs
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
              Direct index and mutual fund investments with ₹0 commission, zero upfront charges, and direct demat settlement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;