import React, { useState, useEffect } from "react";
import axios from "axios";



const PORTB = process.env.REACT_APP_BACKEND_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${PORTB}/allOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  };

  useEffect(() => {
    fetchOrders();
    window.addEventListener("order-executed", fetchOrders);
    return () => window.removeEventListener("order-executed", fetchOrders);
  }, []);

  const styles = {
    title: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
      fontWeight: "600",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "2rem",
    },
    th: {
      backgroundColor: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #eee",
    },
    buy: {
      color: "green",
      fontWeight: "bold",
    },
    sell: {
      color: "red",
      fontWeight: "bold",
    },
    empty: {
      textAlign: "center",
      padding: "2rem",
      fontStyle: "italic",
      color: "#666",
    },
  };

  const [filter, setFilter] = useState("ALL");


  const filteredOrders = orders.filter((o) => {
    if (filter === "ALL") return true;
    return o.mode?.toUpperCase() === filter;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={styles.title}>Orders ({orders.length})</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setFilter("ALL")}
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: filter === "ALL" ? "#2563eb" : "#fff",
              color: filter === "ALL" ? "#fff" : "#475569",
              cursor: "pointer"
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter("BUY")}
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: filter === "BUY" ? "#16a34a" : "#fff",
              color: filter === "BUY" ? "#fff" : "#475569",
              cursor: "pointer"
            }}
          >
            Buy
          </button>
          <button
            onClick={() => setFilter("SELL")}
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: filter === "SELL" ? "#dc2626" : "#fff",
              color: filter === "SELL" ? "#fff" : "#475569",
              cursor: "pointer"
            }}
          >
            Sell
          </button>
          <button
            onClick={fetchOrders}
            title="Refresh Orders"
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              color: "#334155",
              cursor: "pointer"
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={styles.empty}>
          <p>No {filter !== "ALL" ? filter : ""} orders found. Use the Watchlist to place market orders!</p>
        </div>
      ) : (
        <div className="order-table">
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Instrument</th>
                <th style={styles.th}>Qty.</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Order Value</th>
                <th style={styles.th}>Mode</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => {
                const modeStyle =
                  order.mode?.toUpperCase() === "BUY" ? styles.buy : styles.sell;
                const orderVal = (order.price || 0) * (order.qty || 0);

                return (
                  <tr key={order._id || idx}>
                    <td style={styles.td}><strong>{order.name}</strong></td>
                    <td style={styles.td}>{order.qty}</td>
                    <td style={styles.td}>₹{(order.price || 0).toFixed(2)}</td>
                    <td style={styles.td}>₹{orderVal.toFixed(2)}</td>
                    <td style={{ ...styles.td, ...modeStyle }}>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: "3px",
                        background: order.mode?.toUpperCase() === "BUY" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)"
                      }}>
                        {order.mode?.toUpperCase()}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: "rgba(34, 197, 94, 0.15)",
                        color: "#16a34a",
                        fontWeight: "600"
                      }}>
                        COMPLETE
                      </span>
                    </td>
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

export default Orders;
