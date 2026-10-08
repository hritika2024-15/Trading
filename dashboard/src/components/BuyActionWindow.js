import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";


const PORTB = process.env.REACT_APP_BACKEND_URL;



const BuyActionWindow = ({ uid, initialMode = "BUY", initialPrice = 0 }) => {
  const [mode, setMode] = useState(initialMode);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(initialPrice || 100.0);
  const [submitting, setSubmitting] = useState(false);

  const { closeBuyWindow } = useContext(GeneralContext);

  const marginRequired = (
    (parseFloat(stockQuantity) || 0) * (parseFloat(stockPrice) || 0)
  ).toFixed(2);

  const handleOrderSubmit = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      alert("Please login first to place orders");
      return;
    }

    if (!stockQuantity || stockQuantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    setSubmitting(true);
    axios
      .post(
        `${PORTB}/newOrder`,
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: mode.toUpperCase(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        window.dispatchEvent(new CustomEvent("order-executed"));
        alert(res.data?.msg || `${mode} Order for ${uid} placed successfully!`);
        closeBuyWindow();
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        } else {
          alert(err.response?.data?.msg || "Failed to place order");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  const isBuy = mode === "BUY";

  return (
    <div className="container" id="buy-window" draggable="true" style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
      <div className="header" style={{ background: isBuy ? "#2563eb" : "#dc2626", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3>{isBuy ? "BUY" : "SELL"} {uid}</h3>
          <span style={{ color: "#fff", fontSize: "11px", opacity: 0.85 }}>NSE x Regular Market Order</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => setMode("BUY")}
            style={{
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: "600",
              borderRadius: "3px",
              border: "none",
              cursor: "pointer",
              background: isBuy ? "#fff" : "rgba(255,255,255,0.2)",
              color: isBuy ? "#2563eb" : "#fff"
            }}
          >
            BUY
          </button>
          <button
            onClick={() => setMode("SELL")}
            style={{
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: "600",
              borderRadius: "3px",
              border: "none",
              cursor: "pointer",
              background: !isBuy ? "#fff" : "rgba(255,255,255,0.2)",
              color: !isBuy ? "#dc2626" : "#fff"
            }}
          >
            SELL
          </button>
        </div>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span style={{ fontWeight: "600", color: "#475569" }}>
          Margin req: ₹{marginRequired}
        </span>
        <div>
          <button
            className={`btn ${isBuy ? "btn-blue" : ""}`}
            style={{
              background: isBuy ? "#2563eb" : "#dc2626",
              border: "none",
              cursor: "pointer"
            }}
            disabled={submitting}
            onClick={handleOrderSubmit}
          >
            {submitting ? "Placing..." : (isBuy ? "Buy" : "Sell")}
          </button>
          <button
            className="btn btn-grey"
            style={{ border: "none", cursor: "pointer" }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
