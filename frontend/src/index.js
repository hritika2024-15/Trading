
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import HomePage from './landing_page/home/HomePage';
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';




const PORTD = process.env.REACT_APP_DASH_URL;



const Root = () => {
  const [user, setUser] = useState(null);
  console.log("PORTD:", PORTD);


  return (
    <BrowserRouter>
      <Navbar />

      {/* Show Dashboard icon only if logged in */}
      {user && (
        <a
          href={`${PORTD}?token=${localStorage.getItem("token")}`}
          style={{ display: "block", margin: "20px", fontWeight: "bold" }}
        >
          Go to Dashboard
        </a>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Signup setUser={setUser} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);


