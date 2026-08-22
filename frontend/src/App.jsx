import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CheckBurnout from "./pages/CheckBurnout";
import BurnoutResult from "./pages/BurnoutResult";
import Recommendations from "./pages/Recommendations";

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
        element={<BurnoutResult />}
      />

      <Route
        path="/recommendations"
        element={<Recommendations />}
      />

    </Routes>
  );
}

export default App;