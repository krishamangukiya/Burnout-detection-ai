import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BurnoutResult.css";

const BurnoutResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // GET ASSESSMENT DATA FROM CHECK BURNOUT PAGE
  // =========================================================

  const assessmentData = location.state?.assessmentData;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  console.log("Assessment data received:", assessmentData);
  console.log("Assessment data JSON:", JSON.stringify(assessmentData, null, 2));

  useEffect(() => {
    const getPrediction = async () => {
      if (!assessmentData) {
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assessmentData),
        });
  
        if (!response.ok) {
          throw new Error("Prediction request failed");
        }
  
        const data = await response.json();
  
        console.log("FastAPI prediction response:", data);
  
        setResult(data);
      } catch (err) {
        console.error("Prediction error:", err);
        setError("Unable to connect to the burnout prediction server.");
      } finally {
        setLoading(false);
      }
    };
  
    getPrediction();
  }, [assessmentData]);

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!assessmentData) {
    if (loading) {
      return (
        <div className="result-page result-empty">
          <div className="result-empty-card">
            <div className="result-empty-icon">⟳</div>
    
            <span className="result-eyebrow">
              AI BURNOUT ASSESSMENT
            </span>
    
            <h1>Analyzing Your Assessment</h1>
    
            <p>
              Our AI model is analyzing your work patterns and generating
              your burnout risk assessment.
            </p>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="result-page result-empty">
          <div className="result-empty-card">
            <div className="result-empty-icon">!</div>
    
            <span className="result-eyebrow">
              AI BURNOUT ASSESSMENT
            </span>
    
            <h1>Prediction Failed</h1>
    
            <p>{error}</p>
    
            <button
              className="primary-btn"
              onClick={() => navigate("/check-burnout")}
            >
              Try Again
              <span>→</span>
            </button>
          </div>
        </div>
      );
    }
  }
    
  // =========================================================
  // TEMPORARY AI RESULT
  // =========================================================
  // Later these values will come from your FastAPI + ML model.

  // const result = {
  //   score: 68,
  //   level: "Moderate",
  //   description:
  //     "Your assessment indicates a moderate level of burnout risk based on your work patterns, lifestyle, and behavioral factors.",
  // };

  // =========================================================
  // TEMPORARY XAI / SHAP FACTORS
  // =========================================================
  // Later these will come directly from SHAP values.

  const factors = result.explanation.slice(0, 5).map((item) => {
    const impact = Number(item.impact);
  
    return {
      name: item.feature,
      value: `${impact > 0 ? "+" : ""}${impact.toFixed(2)}`,
      impact:
        item.direction === "increases"
          ? "Increases risk"
          : item.direction === "decreases"
          ? "Reduces risk"
          : "Neutral",
      type:
        item.direction === "increases"
          ? "negative"
          : item.direction === "decreases"
          ? "positive"
          : "warning",
      shap: `${impact > 0 ? "+" : ""}${impact.toFixed(2)}`,
      width: `${Math.min(Math.abs(impact) * 200, 100)}%`,
    };
  });
  // =========================================================
  // INTERPRETATION
  // =========================================================

  const interpretation =
    "Your current work pattern shows signs of increased strain. Higher screen time, longer working hours, and overtime are contributing to your burnout risk. Your sleep and job satisfaction are helping reduce some of the overall risk.";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="result-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="result-header">

        <div className="result-header-content">

          <span className="result-eyebrow">
            <span className="eyebrow-dot"></span>
            AI BURNOUT ASSESSMENT
          </span>

          <h1>
            Your Burnout <span>Result</span>
          </h1>

          <p>
            Your assessment has been analyzed using our AI-powered
            burnout detection system.
          </p>

        </div>

        <div className="assessment-date">

          <div className="date-icon">
            ◷
          </div>

          <div>
            <small>Assessment completed</small>
            <strong>Today</strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          RESULT SUMMARY
      ====================================================== */}

      <section className="result-summary">

        {/* SCORE CARD */}

        <div className="score-card">

          <div className="score-card-top">

            <div>

              <span className="card-label">
                BURNOUT SCORE
              </span>

              <h2>
                {result.burnout_score.toFixed(2)}
                <small>/10</small>
              </h2>

            </div>

            <div className="score-icon">
              ✦
            </div>

          </div>


          <div className="score-progress">

            <div
              className="score-progress-fill"
              style={{
                width: `${Math.min(result.burnout_score * 10, 100)}%`,
              }}
            ></div>

          </div>


          <div className="score-scale">

            <span>Low</span>

            <span>Moderate</span>

            <span>High</span>

          </div>

        </div>


        {/* RISK CARD */}

        <div className="risk-card">

          <div className="risk-icon">
            !
          </div>

          <div className="risk-content">

            <span className="card-label">
              CURRENT RISK LEVEL
            </span>

            <div className="risk-title-row">

            <h2>
              {result.burnout_level}
            </h2>
            <span className={`risk-badge ${result.burnout_level.toLowerCase()}`}>
              {result.burnout_level} Risk
            </span>

            </div>

            <p>
              Your AI assessment indicates a{" "}
              <strong>{result.burnout_level.toLowerCase()}</strong>{" "}
              level of burnout risk based on your reported work patterns,
              lifestyle, and behavioral factors.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          AI EXPLANATION
          AUTOMATICALLY SHOWN
      ====================================================== */}

      <section className="explanation-section">

        <div className="section-heading">

          <div className="heading-icon">
            ✦
          </div>

          <div>

            <span>
              EXPLAINABLE AI
            </span>

            <h2>
              Why did the AI make this prediction?
            </h2>

            <p>
              The following factors had the strongest influence
              on your burnout prediction.
            </p>

          </div>

        </div>


        {/* =================================================
            FACTORS CARD
        ================================================== */}

        <div className="explanation-card">

          <div className="explanation-card-header">

            <div>

              <h3>
                Key Contributing Factors
              </h3>

              <p>
                Factors are ranked according to their influence
                on your predicted burnout risk.
              </p>

            </div>

            <span className="shap-tag">
              SHAP ANALYSIS
            </span>

          </div>


          {/* FACTORS */}

          <div className="factors-list">

            {factors.map((factor, index) => (

              <div
                className="factor-row"
                key={factor.name}
              >

                {/* NUMBER */}

                <div className="factor-number">
                  {index + 1}
                </div>


                {/* INFORMATION */}

                <div className="factor-info">

                  <div className="factor-title">

                    <strong>
                      {factor.name}
                    </strong>

                    <span
                      className={`factor-status ${factor.type}`}
                    >
                      {factor.value}
                    </span>

                  </div>


                  <div className="factor-bar-container">

                    <div
                      className={`factor-bar ${factor.type}`}
                      style={{
                        width: factor.width,
                      }}
                    ></div>

                  </div>

                </div>


                {/* IMPACT */}

                <div
                  className={`factor-impact ${factor.type}`}
                >

                  <span>
                    {factor.type === "positive"
                      ? "↓"
                      : "↑"}
                  </span>

                  {factor.impact}

                </div>

              </div>

            ))}

          </div>


          {/* LEGEND */}

          <div className="factor-legend">

            <div>

              <span className="legend-dot negative"></span>

              Increases burnout risk

            </div>

            <div>

              <span className="legend-dot positive"></span>

              Reduces burnout risk

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SHAP VISUALIZATION
      ====================================================== */}

      <section className="shap-section">

        <div className="shap-header">

          <div>

            <span>
              MODEL EXPLANATION
            </span>

            <h2>
              Impact of Each Factor
            </h2>

          </div>


          <div className="shap-info">

            <span>
              ?
            </span>

            <div>

              <strong>
                What is SHAP?
              </strong>

              <p>
                SHAP explains how each input feature contributes
                to the model's prediction.
              </p>

            </div>

          </div>

        </div>


        {/* SHAP CHART */}

        <div className="shap-chart-card">

          <div className="chart-axis">

            <span>
              Reduces Risk
            </span>

            <span>
              Baseline
            </span>

            <span>
              Increases Risk
            </span>

          </div>


          <div className="shap-chart">

            {factors.map((factor) => {

              const isPositive =
                factor.shap.startsWith("+");

              return (

                <div
                  className="chart-row"
                  key={factor.name}
                >

                  <div className="chart-label">
                    {factor.name}
                  </div>

                  <div className="chart-track">

                    <div className="baseline"></div>

                    {isPositive ? (

                      <div
                        className="shap-value positive-risk"
                        style={{
                          width:
                            factor.name === "Screen Time"
                              ? "34%"
                              : factor.name === "Work Hours"
                              ? "27%"
                              : "18%",

                          marginLeft: "50%",
                        }}
                      >
                        {factor.shap}
                      </div>

                    ) : (

                      <div
                        className="shap-value reduced-risk"
                        style={{
                          width:
                            factor.name === "Sleep Hours"
                              ? "21%"
                              : "15%",

                          marginLeft:
                            factor.name === "Sleep Hours"
                              ? "29%"
                              : "35%",
                        }}
                      >
                        {factor.shap}
                      </div>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          AI INTERPRETATION
      ====================================================== */}

      <section className="interpretation-card">

        <div className="interpretation-icon">
          ✦
        </div>

        <div>

          <span>
            AI INTERPRETATION
          </span>

          <h2>
            Your work pattern is showing signs of increased strain.
          </h2>

          <p>
            {interpretation}
          </p>

        </div>

      </section>


      {/* =====================================================
          PERSONALIZED RECOMMENDATION
          OPTIONAL USER CHOICE
      ====================================================== */}

      <section className="recommendation-cta">

        <div className="recommendation-content">

          <div className="recommendation-icon">
            ♡
          </div>

          <div>

            <span>
              PERSONALIZED SUPPORT
            </span>

            <h2>
              Would you like personalized recommendations?
            </h2>

            <p>
              Get practical suggestions based on your burnout
              score and the factors identified by the AI.
            </p>

          </div>

        </div>


        <button
          className="recommendation-btn"
          onClick={() =>
            navigate("/recommendations", {
              state: {
                assessmentData,
                result,
                factors,
              },
            })
          }
        >

          Get Personalized Recommendations

          <span>
            →
          </span>

        </button>

      </section>


      {/* =====================================================
          BOTTOM ACTIONS
      ====================================================== */}

      <section className="result-actions">

        <button
          className="secondary-btn"
          onClick={() =>
            navigate("/check-burnout")
          }
        >
          ← Retake Assessment
        </button>


        <button
          className="primary-btn"
          onClick={() =>
            navigate("/Home")
          }
        >

          Go to Dashboard

          <span>
            →
          </span>

        </button>

      </section>

    </div>
  );
};

export default BurnoutResult;

