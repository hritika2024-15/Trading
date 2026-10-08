import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThreeCanvas from "../../components/ThreeCanvas";

function HomePage() {
  const dashUrl = process.env.REACT_APP_DASH_URL || "http://localhost:3001";

  // Simulated live ticker data
  const [tickerPrices, setTickerPrices] = useState([
    { sym: "NIFTY 50", price: 24852.15, chg: "+0.48%", isUp: true },
    { sym: "SENSEX", price: 81392.4, chg: "+0.40%", isUp: true },
    { sym: "BTC / USDT", price: 92450.0, chg: "+2.85%", isUp: true },
    { sym: "ETH / USDT", price: 3410.5, chg: "+1.92%", isUp: true },
    { sym: "RELIANCE", price: 2112.4, chg: "+1.44%", isUp: true },
    { sym: "TCS", price: 3194.8, chg: "-0.25%", isUp: false },
    { sym: "INFY", price: 1555.45, chg: "-1.60%", isUp: false },
    { sym: "CRUDE OIL", price: 6240.0, chg: "+0.78%", isUp: true },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPrices((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.49) * (item.price * 0.001);
          const newPrice = Number((item.price + delta).toFixed(2));
          return {
            ...item,
            price: newPrice,
          };
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--bg-deep)", minHeight: "100vh", position: "relative" }}>
      {/* 3D Three.js Interactive Hero Canvas */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          padding: "60px 20px 40px 20px",
        }}
      >
        <ThreeCanvas />

        {/* Foreground Content with Cyber HUD */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "960px",
          }}
        >


          {/* Futuristic Hero Title */}
          <h1
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              letterSpacing: "-1.5px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            THE PROPRIETARY <br />
            <span className="text-gradient">3D QUANTUM TRADING</span>
            <br />
            ARCHITECTURE
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              maxWidth: "720px",
              margin: "0 auto 35px auto",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            Direct Market Access (DMA) algorithmic execution, real-time 3D market
            topology, sub-millisecond tick processing, and institutional multi-asset
            order routing engineered for quantitative and retail traders.
          </p>

          {/* Action CTAs */}
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a
              href={dashUrl}
              className="btn-cyber-primary"
              style={{ padding: "16px 36px", fontSize: "1rem" }}
            >
              Launch 3D Terminal <i className="fa-solid fa-arrow-right"></i>
            </a>
            <Link
              to="/register"
              className="btn-cyber-outline"
              style={{ padding: "16px 32px", fontSize: "1rem" }}
            >
              Create Trading Account
            </Link>
          </div>

          {/* Live Telemetry Matrix Ribbon */}
          <div
            className="d-flex justify-content-center flex-wrap gap-4 mt-5 pt-4"
            style={{
              borderTop: "1px solid rgba(0, 240, 255, 0.15)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <div>
              EXECUTION SPEED: <span style={{ color: "var(--cyan)", fontWeight: "600" }}>&lt; 0.12ms</span>
            </div>
            <div>
              QUANTUM UPTIME: <span style={{ color: "var(--emerald)", fontWeight: "600" }}>99.999%</span>
            </div>
            <div>
              ORDER ROUTING: <span style={{ color: "var(--cyan)", fontWeight: "600" }}>SMART DMA</span>
            </div>
            <div>
              COMMISSION: <span style={{ color: "var(--emerald)", fontWeight: "600" }}>₹0 DELIVERY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Ribbon */}
      <div className="ticker-ribbon">
        <div className="ticker-track">
          {[...tickerPrices, ...tickerPrices].map((stock, idx) => (
            <div key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--text-primary)", fontWeight: "700" }}>{stock.sym}</span>
              <span style={{ color: "var(--cyan)" }}>₹{stock.price.toFixed(2)}</span>
              <span style={{ color: stock.isUp ? "var(--emerald)" : "var(--rose)", fontWeight: "600" }}>
                {stock.chg}
              </span>
              <span style={{ color: "rgba(0, 0, 0, 0.15)", margin: "0 8px" }}>|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Architecture & Modules Section */}
      <section style={{ padding: "100px 0", position: "relative" }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="telemetry-badge mb-3">SYSTEM ARCHITECTURE</div>
            <h2
              style={{
                fontFamily: "var(--font-main)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "800",
                color: "var(--text-primary)",
              }}
            >
              Engineered For Pure Performance
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "10px auto 0 auto" }}>
              Our proprietary infrastructure eliminates latency bottlenecks and empowers traders with institutional algorithmic workflows.
            </p>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 h-100">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    background: "rgba(2, 132, 199, 0.1)",
                    border: "1px solid var(--cyan)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "var(--cyan)",
                    fontSize: "22px",
                  }}
                >
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                  Sub-Millisecond Execution
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Direct market connections with ultra-low latency co-located servers ensure your market orders execute with institutional precision and zero slippage.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 h-100">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "1px solid var(--purple)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "var(--purple)",
                    fontSize: "22px",
                  }}
                >
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                  Real-Time Market Depth
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Live streaming Level 2 orderbook feeds, dynamic volume delta profiles, and advanced multi-depth liquidity visualization across equities and derivatives.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 h-100">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid var(--emerald)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "var(--emerald)",
                    fontSize: "22px",
                  }}
                >
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>
                  Quantum Risk Matrix
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Institutional risk guards, automated VaR checks, pre-trade margin verification, and instant emergency Kill-Switch safeguards to protect your capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Cyber HUD Terminal Preview */}
      <section style={{ padding: "80px 0 120px 0", backgroundColor: "rgba(241, 245, 249, 0.7)" }}>
        <div className="container">
          <div className="glass-panel p-4 p-lg-5" style={{ border: "1px solid rgba(2, 132, 199, 0.25)" }}>
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6">
                <div className="telemetry-badge mb-3">TERMINAL INTERFACE</div>
                <h2
                  style={{
                    fontFamily: "var(--font-main)",
                    fontSize: "2.4rem",
                    fontWeight: "800",
                    color: "var(--text-primary)",
                    marginBottom: "20px",
                  }}
                >
                  Your Command Center For Financial Markets
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "25px" }}>
                  VortexTerminal integrates real-time watchlist monitoring, instant buy/sell modal execution, live portfolio valuation, and interactive P&amp;L analytics into one streamlined interface.
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 35px 0" }}>
                  <li className="d-flex align-items-center gap-3 mb-3" style={{ color: "var(--text-primary)" }}>
                    <i className="fa-solid fa-check text-cyan"></i>
                    <span>Real-time Buy &amp; Sell order placement with dynamic margin calculations</span>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-3" style={{ color: "var(--text-primary)" }}>
                    <i className="fa-solid fa-check text-cyan"></i>
                    <span>Automated portfolio P&amp;L tracking with interactive data visualizers</span>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-3" style={{ color: "var(--text-primary)" }}>
                    <i className="fa-solid fa-check text-cyan"></i>
                    <span>Instant UPI fund transfers &amp; real-time capital allocation</span>
                  </li>
                </ul>

                <a
                  href={dashUrl}
                  className="btn-cyber-primary"
                  style={{ padding: "14px 32px" }}
                >
                  Enter VortexTerminal <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>

              {/* Terminal HUD Mockup */}
              <div className="col-12 col-lg-6">
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(2, 132, 199, 0.25)",
                    borderRadius: "10px",
                    padding: "20px",
                    fontFamily: "var(--font-mono)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  {/* Window Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                      paddingBottom: "12px",
                      marginBottom: "16px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span style={{ color: "var(--cyan)", fontWeight: "600" }}>● VORTEX_TERMINAL // LIVE_FEED</span>
                    <span>SESSION: SECURE_JWT</span>
                  </div>

                  {/* Market Depth Sim */}
                  <div style={{ fontSize: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-secondary)" }}>
                      <span>INSTRUMENT</span>
                      <span>BID (QTY)</span>
                      <span>ASK (QTY)</span>
                      <span>STATUS</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-primary)" }}>
                      <span style={{ fontWeight: "600" }}>INFY</span>
                      <span style={{ color: "var(--emerald)" }}>1555.40 (1,240)</span>
                      <span style={{ color: "var(--rose)" }}>1555.50 (890)</span>
                      <span style={{ color: "var(--cyan)", fontWeight: "600" }}>ACTIVE</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-primary)" }}>
                      <span style={{ fontWeight: "600" }}>RELIANCE</span>
                      <span style={{ color: "var(--emerald)" }}>2112.35 (3,100)</span>
                      <span style={{ color: "var(--rose)" }}>2112.45 (2,450)</span>
                      <span style={{ color: "var(--cyan)", fontWeight: "600" }}>ACTIVE</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-primary)" }}>
                      <span style={{ fontWeight: "600" }}>TCS</span>
                      <span style={{ color: "var(--emerald)" }}>3194.70 (980)</span>
                      <span style={{ color: "var(--rose)" }}>3194.85 (1,150)</span>
                      <span style={{ color: "var(--cyan)", fontWeight: "600" }}>ACTIVE</span>
                    </div>

                    <div
                      style={{
                        marginTop: "20px",
                        padding: "12px",
                        background: "rgba(2, 132, 199, 0.08)",
                        border: "1px dashed rgba(2, 132, 199, 0.35)",
                        borderRadius: "6px",
                        color: "var(--cyan)",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      &gt; DMA ORDER ROUTE: SUB-MILLISECOND LATENCY CONFIRMED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;