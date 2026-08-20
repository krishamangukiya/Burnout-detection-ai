import React from "react";
import "./Result.css";

function Result() {
  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-label">YOUR WELL-BEING</div>

        <h1>Burnout Assessment Result</h1>

        <div className="result-card">
          <div className="score-circle">
            <span>64</span>
            <small>/100</small>
          </div>

          <div className="result-info">
            <p className="status-label">CURRENT STATUS</p>

            <h2>Moderate Risk</h2>

            <p>
              Your current patterns indicate some signs of burnout.
            </p>
          </div>
        </div>

        <button className="result-button">
          Take Assessment Again →
        </button>
      </div>
    </div>
  );
}

export default Result;