import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <header className="topbar-container">
      {/* LEFT: BRAND + INDICES */}
      <div className="topbar-left">
        <a href={process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"} className="topbar-brand" title="Back to VORTEX Main Page">
          <img src="logo-d.svg" alt="VORTEX" className="topbar-logo-img" />
          <span className="topbar-brand-name">
            VORTEX
          </span>
        </a>

        <div className="indices-container">
          <div className="index-pill">
            <span className="index-title">NIFTY 50</span>
            <span className="index-val">24,852.15</span>
            <span className="index-chg">+0.48%</span>
          </div>
          <div className="index-pill">
            <span className="index-title">SENSEX</span>
            <span className="index-val">81,392.40</span>
            <span className="index-chg">+0.40%</span>
          </div>
        </div>
      </div>

      {/* RIGHT: NAVIGATION TABS + USER PROFILE + LOGOUT */}
      <Menu />
    </header>
  );
};

export default TopBar;