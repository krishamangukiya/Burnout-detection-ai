import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowitWorks";
import CheckBurnout from "./pages/CheckBurnout";
import Result from "./pages/BurnoutResult";
import Recommendations from "./pages/Recommendations";

import "./App.css";

function App() {
  return (
  
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/how-it-works"
          element={<HowitWorks />}
        />

        <Route
          path="/check-burnout"
          element={<CheckBurnout />}
        />

        <Route
          path="/result"
          element={<Result />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

      </Routes>

  );
}

export default App;