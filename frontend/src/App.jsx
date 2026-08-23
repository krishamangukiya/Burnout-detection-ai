import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import About from "./pages/About";
import CheckBurnout from "./pages/CheckBurnout";
import Burnout from "./pages/BurnoutResult";
import Recommendation from "./pages/Recommendations";
import HowItWorks from "./pages/HowitWorks";

import "./App.css";

function App() {
  return (
      <Routes>

        <Route path="/" element={<Home />} />

        {/* <Route path="/about" element={<About />} /> */}

        <Route
          path="/check-burnout"
          element={<CheckBurnout />}
        />

        <Route
          path="/burnout"
          element={<BurnoutResult />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

      </Routes>
  );
}

export default App;