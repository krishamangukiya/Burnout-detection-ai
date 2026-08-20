import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CheckBurnout from "./pages/CheckBurnout";
import Result from "./pages/Result";

import "./App.css";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/check-burnout"
        element={<CheckBurnout />}
      />

      <Route
        path="/result"
        element={<Result />}
      />

    </Routes>
  );
}

export default App;