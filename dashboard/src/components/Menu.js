import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const username = localStorage.getItem("username") || "Trader";
  const avatarInitials = username ? username.slice(0, 2).toUpperCase() : "VX";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    const mainPageUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
    window.location.href = mainPageUrl;
  };

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Orders", path: "/orders" },
    { label: "Holdings", path: "/holdings" },
    { label: "Positions", path: "/positions" },
    { label: "Funds", path: "/funds" },
  ];

  return (
    <div className="topbar-right">
      <nav className="header-nav">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-tab ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="topbar-meta-area">
        <span className="market-live-pill">
          MARKET LIVE
        </span>

        <div className="user-profile-badge" title={`Trader: ${username}`}>
          <div className="avatar-chip">{avatarInitials}</div>
          <span className="username-label">{username}</span>
        </div>

        <button
          onClick={handleLogout}
          className="header-logout-btn"
          title="Sign out of Vortex Terminal"
        >
          <span className="logout-glyph">⏻</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;