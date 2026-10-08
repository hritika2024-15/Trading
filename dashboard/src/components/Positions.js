import React, { useState, useEffect } from "react";
import axios from "axios";

const PORTB = process.env.REACT_APP_BACKEND_URL;

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPositions = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    axios
      .get(`${PORTB}/allPositions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAllPositions(res.data);
        } else {
          setAllPositions([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        setAllPositions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPositions();
    window.addEventListener("order-executed", fetchPositions);
    return () => window.removeEventListener("order-executed", fetchPositions);
  }, []);

  const totalPositionsPnL = allPositions.reduce((acc, pos) => {
    const curVal = (pos.price || 0) * (pos.qty || 0);
    const cost = (pos.avg || 0) * (pos.qty || 0);
    return acc + (curVal - cost);
  }, 0);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h3 className="title" style={{ margin: 0 }}>Positions ({allPositions.length})</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: totalPositionsPnL >= 0 ? "#16a34a" : "#dc2626" }}>
            Unrealized P&amp;L: {totalPositionsPnL >= 0 ? "+" : ""}₹{totalPositionsPnL.toFixed(2)}
          </span>
          <button
            onClick={fetchPositions}
            className="btn btn-blue"
            style={{ fontSize: "12px", padding: "4px 12px", border: "none", cursor: "pointer" }}
          >
            {loading ? "Syncing..." : "Sync Positions"}
          </button>
        </div>
      </div>

      {allPositions.length === 0 && !loading ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "rgba(15, 23, 42, 0.5)",
          borderRadius: "8px",
          border: "1px dashed rgba(255, 255, 255, 0.15)",
          margin: "20px 0"
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📊</div>
          <h4 style={{ color: "#94a3b8", marginBottom: "8px", fontFamily: "monospace" }}>NO ACTIVE POSITIONS</h4>
          <p style={{ color: "#64748b", fontSize: "13px", maxWidth: "460px", margin: "0 auto" }}>
            You have no open intraday or CNC positions in this session. Orders executed from the Watchlist will track live here.
          </p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const pnl = curValue - (stock.avg || 0) * (stock.qty || 0);
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td><span style={{ background: "rgba(255, 255, 255, 0.08)", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>{stock.product || "CNC"}</span></td>
                    <td><strong>{stock.name}</strong></td>
                    <td>{stock.qty}</td>
                    <td>{(stock.avg || 0).toFixed(2)}</td>
                    <td>{(stock.price || 0).toFixed(2)}</td>
                    <td className={profClass}>
                      {pnl >= 0 ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;