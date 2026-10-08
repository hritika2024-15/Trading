import React, { useEffect, useState } from "react";
import "./PortfolioRiskModal.css";

const PORTB = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const PortfolioRiskModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("AUTH_REQUIRED");
          setLoading(false);
          return;
        }

        const res = await fetch(`${PORTB}/api/portfolio/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          setError("AUTH_REQUIRED");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.msg || "Unable to fetch risk analytics");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="risk-modal-overlay" onClick={onClose}>
      <div className="risk-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="risk-modal-header">
          <h2 className="risk-modal-title">
            <i className="fa-solid fa-shield-halved" style={{ color: "#0284c7" }}></i>
            Quantitative Risk &amp; Portfolio Health Analysis
          </h2>
          <button className="risk-modal-close" onClick={onClose} title="Close modal">
            &times;
          </button>
        </div>

        <div className="risk-modal-body">
          {loading ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "#64748b" }}>
              <i className="fa-solid fa-circle-notch fa-spin fa-2x" style={{ color: "#0284c7", marginBottom: "12px" }}></i>
              <p>Computing mathematical VaR and concentration metrics...</p>
            </div>
          ) : error === "AUTH_REQUIRED" ? (
            <div style={{ padding: "36px 20px", textAlign: "center", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "rgba(2, 132, 199, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", color: "#0284c7", fontSize: "22px" }}>
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                Session Expired or Not Logged In
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", maxWidth: "460px", margin: "0 auto 22px auto", lineHeight: "1.6" }}>
                To calculate your authentic live portfolio health score and Value at Risk (VaR), please sign in with your trader account.
              </p>
              <a
                href="/login"
                className="btn btn-blue"
                style={{ padding: "10px 24px", display: "inline-block", textDecoration: "none", fontWeight: "600" }}
              >
                Sign In to Terminal &rarr;
              </a>
            </div>
          ) : error ? (
            <div style={{ padding: "20px", color: "#dc2626", background: "#fee2e2", borderRadius: "8px", textAlign: "center" }}>
              <p style={{ margin: "0 0 10px 0", fontWeight: "700" }}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-blue"
                style={{ fontSize: "12px", padding: "6px 14px" }}
              >
                Retry
              </button>
            </div>
          ) : data ? (
            <>
              {/* Score Hero Card */}
              <div className="score-hero-card">
                <div className="score-badge-circle">
                  <span className="score-number">{data.healthScore}</span>
                  <span className="score-label">HEALTH</span>
                </div>

                <div className="score-stats">
                  <div className="stat-item">
                    <div className="stat-title">1-Day VaR (95%)</div>
                    <div className="stat-value" style={{ color: "#dc2626" }}>
                      ₹{data.var95Value?.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">Concentration (HHI)</div>
                    <div className="stat-value" style={{ color: data.hhi > 2500 ? "#d97706" : "#0284c7" }}>
                      {data.hhi}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">Liquid Cash</div>
                    <div className="stat-value" style={{ color: "#16a34a" }}>
                      ₹{data.funds?.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">Equity Assets</div>
                    <div className="stat-value">
                      ₹{data.currentHoldingsValue?.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="metrics-grid">
                {/* Sector Diversification Panel */}
                <div className="metric-panel">
                  <div className="metric-panel-title">
                    <i className="fa-solid fa-chart-pie" style={{ color: "#0284c7" }}></i>
                    Sector Allocation Breakdown
                  </div>
                  {data.sectorBreakdown && data.sectorBreakdown.length > 0 ? (
                    data.sectorBreakdown.map((sec, idx) => (
                      <div key={idx} className="sector-bar-container">
                        <div className="sector-bar-header">
                          <span>{sec.sector}</span>
                          <span>{sec.percentage}%</span>
                        </div>
                        <div className="sector-progress-track">
                          <div
                            className="sector-progress-fill"
                            style={{ width: `${Math.min(100, sec.percentage)}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                      No active equity positions. 100% liquid cash reserves.
                    </p>
                  )}
                </div>

                {/* Risk Alerts Panel */}
                <div className="metric-panel">
                  <div className="metric-panel-title">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#d97706" }}></i>
                    Actionable Risk Insights
                  </div>
                  <div className="alerts-list">
                    {data.alerts?.map((alert, idx) => (
                      <div key={idx} className={`alert-item ${alert.type}`}>
                        <div>
                          <div className="alert-item-title">{alert.title}</div>
                          <div className="alert-item-desc">{alert.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Asset Weight Table */}
              {data.assetWeights && data.assetWeights.length > 0 && (
                <div className="metric-panel" style={{ marginTop: "16px" }}>
                  <div className="metric-panel-title">
                    <i className="fa-solid fa-layer-group" style={{ color: "#0284c7" }}></i>
                    Individual Holdings Risk Exposure
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e2e8f0", color: "#64748b", textAlign: "left" }}>
                          <th style={{ padding: "8px 6px" }}>INSTRUMENT</th>
                          <th style={{ padding: "8px 6px" }}>QTY</th>
                          <th style={{ padding: "8px 6px" }}>CURRENT VAL</th>
                          <th style={{ padding: "8px 6px" }}>PORTFOLIO WT</th>
                          <th style={{ padding: "8px 6px" }}>DAILY VOL</th>
                          <th style={{ padding: "8px 6px" }}>UNREALIZED P&amp;L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.assetWeights.map((asset, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "8px 6px", fontWeight: "700" }}>{asset.name}</td>
                            <td style={{ padding: "8px 6px" }}>{asset.qty}</td>
                            <td style={{ padding: "8px 6px" }}>₹{asset.currentValue?.toLocaleString("en-IN")}</td>
                            <td style={{ padding: "8px 6px", fontWeight: "600", color: asset.portfolioWeight > 35 ? "#d97706" : "#0284c7" }}>
                              {asset.portfolioWeight}%
                            </td>
                            <td style={{ padding: "8px 6px" }}>{(asset.volatility * 100).toFixed(1)}%</td>
                            <td style={{ padding: "8px 6px", fontWeight: "600", color: asset.pnl >= 0 ? "#16a34a" : "#dc2626" }}>
                              {asset.pnl >= 0 ? "+" : ""}₹{asset.pnl?.toFixed(2)} ({asset.pnlPct}%)
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PortfolioRiskModal;
