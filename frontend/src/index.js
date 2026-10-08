import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import HomePage from './landing_page/home/HomePage';
import Signup from "./landing_page/signup/Signup";
import PricingPage from "./landing_page/pricing/PricingPage";
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

const PORTD = process.env.REACT_APP_DASH_URL;

const Root = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />

      {/* Show Dashboard banner only if logged in */}
      {user && (
        <div style={{ background: "rgba(0, 240, 255, 0.15)", borderBottom: "1px solid var(--cyan)", padding: "10px", textAlign: "center" }}>
          <a
            href={`${PORTD}?token=${localStorage.getItem("token")}`}
            style={{ color: "var(--cyan)", fontWeight: "bold", textDecoration: "none", fontFamily: "var(--font-mono)" }}
          >
            &gt; AUTHENTICATED SESSION DETECTED // ENTER TERMINAL &rarr;
          </a>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Signup setUser={setUser} />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
