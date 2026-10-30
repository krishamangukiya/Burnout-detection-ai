import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CheckBurnout from "./pages/CheckBurnout";
import Result from "./pages/BurnoutResult";
import History from "./pages/History";
import Recommendations from "./pages/Recommendations";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Default / Home */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />

          {/* Assessment */}
          <Route path="/check-burnout" element={<CheckBurnout />} />

          {/* Burnout Result */}
          <Route path="/result" element={<Result />} />

          {/* Assessment History */}
          <Route path="/history" element={<History />} />

          {/* Recommendations */}
          <Route path="/recommendations" element={<Recommendations />} />

          {/* How It Works */}
          <Route path="/howitworks" element={<HowItWorks />} />

          {/* About */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
