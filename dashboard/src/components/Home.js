import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ThreeTerminalCanvas from "./ThreeTerminalCanvas";
import PortfolioRiskModal from "./PortfolioRiskModal";
import VortexAICopilot from "./VortexAICopilot";

const Home = () => {
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenRisk = () => setIsRiskModalOpen(true);
    window.addEventListener("open-risk-analysis", handleOpenRisk);
    return () => window.removeEventListener("open-risk-analysis", handleOpenRisk);
  }, []);

  return (
    <div className="terminal-app-wrapper">
      {/* 3D Ambient WebGL Terminal Canvas */}
      <ThreeTerminalCanvas variant="terminal" />
      <TopBar />
      <Dashboard />

      {/* Quantitative Portfolio Risk & Health Modal */}
      <PortfolioRiskModal
        isOpen={isRiskModalOpen}
        onClose={() => setIsRiskModalOpen(false)}
      />

      {/* VORTEX AI Quant Copilot Floating Chatbot */}
      <VortexAICopilot onOpenRiskModal={() => setIsRiskModalOpen(true)} />
    </div>
  );
};

export default Home;