import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PORTB = process.env.REACT_APP_BACKEND_URL;

const Funds = () => {
  const [availableCash, setAvailableCash] = useState(100000);
  const [usedMargin, setUsedMargin] = useState(0);

  const fetchFunds = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

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
        console.error("Error fetching funds:", err);
      });
  };

  useEffect(() => {
    fetchFunds();
    window.addEventListener("order-executed", fetchFunds);
    return () => window.removeEventListener("order-executed", fetchFunds);
  }, []);

  const handleAddFunds = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const input = prompt("Enter deposit amount via Instant UPI (₹):", "50000");
    const amount = Number(input);
    if (!amount || isNaN(amount) || amount <= 0) return;

    axios
      .post(
        `${PORTB}/addFunds`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setAvailableCash(res.data.availableCash);
        alert(`₹${amount.toLocaleString("en-IN")} deposited successfully!`);
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Failed to add funds");
      });
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const input = prompt(`Enter amount to withdraw (Available: ₹${availableCash.toFixed(2)}):`, "10000");
    const amount = Number(input);
    if (!amount || isNaN(amount) || amount <= 0) return;

    if (amount > availableCash) {
      alert("Insufficient available cash balance");
      return;
    }

    axios
      .post(
        `${PORTB}/withdrawFunds`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setAvailableCash(res.data.availableCash);
        alert(`Withdrawal of ₹${amount.toLocaleString("en-IN")} processed successfully!`);
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Failed to withdraw funds");
      });
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI &amp; NetBanking</p>
        <button onClick={handleAddFunds} className="btn btn-green" style={{ border: "none", cursor: "pointer" }}>
          + Add funds
        </button>
        <button onClick={handleWithdraw} className="btn btn-blue" style={{ border: "none", cursor: "pointer" }}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;