import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PORTB = process.env.REACT_APP_BACKEND_URL;

const Summary = () => {
  const username = localStorage.getItem("username") || "Trader";
  const [holdingsData, setHoldingsData] = useState([]);
  const [availableCash, setAvailableCash] = useState(100000);
  const [usedMargin, setUsedMargin] = useState(0);

  const fetchSummaryData = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch user-specific holdings
    axios
      .get(`${PORTB}/allHoldings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setHoldingsData(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching summary holdings:", err);
      });

    // Fetch user-specific funds
    axios
      .get(`${PORTB}/userFunds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setAvailableCash(res.data.availableCash != null ? res.data.availableCash : 100000);
          setUsedMargin(res.data.usedMargin != null ? res.data.usedMargin : 0);
        }
      })
      .catch((err) => {
        console.error("Error fetching user funds:", err);
      });
  };

  useEffect(() => {
    fetchSummaryData();
    window.addEventListener("order-executed", fetchSummaryData);
    return () => window.removeEventListener("order-executed", fetchSummaryData);
  }, []);

  const totalInv = holdingsData.reduce(
    (acc, s) => acc + (s.avg || 0) * (s.qty || 0),
    0
  );
  const currentVal = holdingsData.reduce(
    (acc, s) => acc + (s.price || 0) * (s.qty || 0),
    0
  );
  const pnl = currentVal - totalInv;
  const pnlPct = totalInv > 0 ? ((pnl / totalInv) * 100).toFixed(2) : "0.00";
  const isProfit = pnl >= 0;

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <div className="username" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h6>Hi, {username}!</h6>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/orders" className="btn btn-blue" style={{ fontSize: "12px", padding: "4px 12px" }}>
            Orders
          </Link>
          <Link to="/funds" className="btn btn-green" style={{ fontSize: "12px", padding: "4px 12px" }}>
            Funds
          </Link>
        </div>
      </div>
      <hr className="divider" />

      <div className="section">
        <span>
          <p>Equity &amp; Margin</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{formatCurrency(availableCash)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{formatCurrency(usedMargin)}</span>
            </p>
            <p>
              Total trading capital <span>₹{formatCurrency(availableCash + totalInv)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdingsData.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {isProfit ? "+" : ""}
              ₹{formatCurrency(pnl)}{" "}
              <small>
                ({isProfit ? "+" : ""}
                {pnlPct}%)
              </small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{formatCurrency(currentVal)}</span>
            </p>
            <p>
              Investment <span>₹{formatCurrency(totalInv)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;