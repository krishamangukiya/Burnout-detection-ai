import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CheckBurnout from "./pages/CheckBurnout";
import Result from "./pages/BurnoutResult";
import Recommendations from "./pages/Recommendations";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

import "./App.css";



function App() {
  return (
    <Routes>

       {/* localhost:5173 */}
       <Route path="/" element={<Home />} />

       {/* Home */}
      <Route
        path="/Home"
        element={<Home />}
      />

      {/* Check Burnout */}
      <Route
        path="/check-burnout"
        element={<CheckBurnout />}
      />

      {/* Burnout Result */}
      <Route
        path="/result"
        element={<Result />}
      />

      {/* Recommendations */}
      <Route
        path="/recommendations"
        element={<Recommendations />}
      />

      {/* How It Works */}
      <Route
        path="/howitworks"
        element={<HowItWorks />}
      />

      {/* About */}
      <Route
        path="/about"
        element={<About />}
      />
    </Routes>
  );
}

export default App;