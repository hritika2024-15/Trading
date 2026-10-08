import React from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ThreeTerminalCanvas from "./ThreeTerminalCanvas";

const Home = () => {
  return (
    <div className="terminal-app-wrapper">
      {/* 3D Ambient WebGL Terminal Canvas */}
      <ThreeTerminalCanvas variant="terminal" />
      <TopBar />
      <Dashboard />
    </div>
  );
};

export default Home;