import React, { useState, useEffect } from "react";
import axios from "axios";



const PORTB = process.env.REACT_APP_BACKEND_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${PORTB}/allOrders`).then((res) => {
      setOrders(res.data);
    });
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

  return (
    <>
      <h3 style={styles.title}>Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>No orders yet. Get started by placing a Buy or Sell order!</p>
        </div>
      ) : (
        <div className="order-table">
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Instrument</th>
                <th style={styles.th}>Qty.</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const modeStyle =
                  order.mode === "BUY" ? styles.buy : styles.sell;
                return (
                  <tr key={order.id}>
                    <td style={styles.td}>{order.name}</td>
                    <td style={styles.td}>{order.qty}</td>
                    <td style={styles.td}>{order.price.toFixed(2)}</td>
                    <td style={{ ...styles.td, ...modeStyle }}>{order.mode}</td>
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
