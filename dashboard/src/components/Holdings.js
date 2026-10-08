import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const PORTB = process.env.REACT_APP_BACKEND_URL;

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHoldings = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    axios
      .get(`${PORTB}/allHoldings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAllHoldings(res.data);
        } else {
          setAllHoldings([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        setAllHoldings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHoldings();
    window.addEventListener("order-executed", fetchHoldings);
    return () => window.removeEventListener("order-executed", fetchHoldings);
  }, []);

  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (stock.avg || 0) * (stock.qty || 0),
    0
  );
  const totalCurrentValue = allHoldings.reduce(
    (acc, stock) => acc + (stock.price || 0) * (stock.qty || 0),
    0
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : "0.00";
  const isOverallProfit = totalPnL >= 0;

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price (₹)",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(0, 240, 255, 0.4)",
        borderColor: "rgba(0, 240, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 className="title" style={{ margin: 0 }}>Holdings ({allHoldings.length})</h3>
        <button
          onClick={fetchHoldings}
          className="btn btn-blue"
          style={{ fontSize: "12px", padding: "4px 12px", border: "none", cursor: "pointer" }}
        >
          {loading ? "Syncing..." : "Sync Portfolio"}
        </button>
      </div>

      {allHoldings.length === 0 && !loading ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "rgba(15, 23, 42, 0.5)",
          borderRadius: "8px",
          border: "1px dashed rgba(255, 255, 255, 0.15)",
          margin: "20px 0"
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>⚡</div>
          <h4 style={{ color: "#94a3b8", marginBottom: "8px", fontFamily: "monospace" }}>PORTFOLIO EMPTY</h4>
          <p style={{ color: "#64748b", fontSize: "13px", maxWidth: "460px", margin: "0 auto" }}>
            You do not have any open positions or holdings in this account. Select any instrument on the left Watchlist to place your first BUY order.
          </p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&amp;L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, index) => {
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const pnl = curValue - (stock.avg || 0) * (stock.qty || 0);
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td><strong>{stock.name}</strong></td>
                    <td>{stock.qty}</td>
                    <td>{(stock.avg || 0).toFixed(2)}</td>
                    <td>{(stock.price || 0).toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {pnl >= 0 ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net || "0.00%"}</td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="row">
        <div className="col">
          <h5>
            ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{totalCurrentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: isOverallProfit ? "#16a34a" : "#dc2626" }}>
            {isOverallProfit ? "+" : ""}
            ₹{totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({isOverallProfit ? "+" : ""}{pnlPercent}%)
          </h5>
          <p>Total P&amp;L</p>
        </div>
      </div>
      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;