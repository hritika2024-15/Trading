import React from "react";

function Brokerage() {
  return (
    <div className="container pb-5">
      <div className="glass-panel p-4 p-lg-5 mb-5">
        <h3
          style={{
            color: "var(--text-primary)",
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="fa-solid fa-calculator text-cyan"></i>
          Execution Rules &amp; Statutory Matrix
        </h3>
        <div className="row g-4">
          <div className="col-12 col-md-8">
            <ul
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                lineHeight: "2.2",
                paddingLeft: "20px",
              }}
            >
              <li>Call &amp; Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.</li>
              <li>Digital cryptographically verified contract notes delivered via e-mail at end of trading session.</li>
              <li>Pre-trade margin calculation and VaR limits applied dynamically in real time.</li>
              <li>STT / CTT, Exchange transaction charges, SEBI turnover fees, and Stamp duty levied as per statutory rates.</li>
              <li>Direct Market Access (DMA) institutional routing available on all quantitative accounts.</li>
            </ul>
          </div>
          <div className="col-12 col-md-4 text-center d-flex flex-column justify-content-center">
            <div
              style={{
                padding: "20px",
                background: "rgba(0, 240, 255, 0.05)",
                borderRadius: "8px",
                border: "1px dashed rgba(0, 240, 255, 0.3)",
              }}
            >
              <h5 style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                DMA CO-LOCATION
              </h5>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: "8px 0" }}>
                Direct exchange fiber connection with &lt;0.12ms execution latency.
              </p>
              <span className="telemetry-badge">
                100% DMA COMPLIANT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;