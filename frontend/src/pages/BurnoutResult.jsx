import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BurnoutResult.css";

const BurnoutResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // GET ASSESSMENT DATA FROM CHECK BURNOUT PAGE
  // =========================================================

  const assessmentData = location.state?.assessmentData;

  console.log("Assessment data received:", assessmentData);

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!assessmentData) {
    return (
      <div className="result-page result-empty">
        <div className="result-empty-card">
          <div className="result-empty-icon">!</div>

          <span className="result-eyebrow">
            BURNOUT ASSESSMENT
          </span>

          <h1>No Assessment Found</h1>

          <p>
            Please complete the burnout assessment first to view your
            personalized result.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/check-burnout")}
          >
            Start Assessment
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // TEMPORARY AI RESULT
  // =========================================================
  // Later these values will come from your FastAPI + ML model.

  const result = {
    score: 68,
    level: "Moderate",
    description:
      "Your assessment indicates a moderate level of burnout risk based on your work patterns, lifestyle, and behavioral factors.",
  };

  // =========================================================
  // TEMPORARY XAI / SHAP FACTORS
  // =========================================================
  // Later these will come directly from SHAP values.

  const factors = [
    {
      name: "Screen Time",
      value: assessmentData.screen_time_hours
        ? `${assessmentData.screen_time_hours} hrs/day`
        : "High",
      impact: "Increases risk",
      type: "negative",
      width: "82%",
      shap: "+0.34",
    },

    {
      name: "Work Hours",
      value: assessmentData.work_hours_per_week
        ? `${assessmentData.work_hours_per_week} hrs/week`
        : "Long",
      impact: "Increases risk",
      type: "negative",
      width: "74%",
      shap: "+0.27",
    },

    {
      name: "Overtime Hours",
      value: assessmentData.overtime_hours
        ? `${assessmentData.overtime_hours} hrs`
        : "Moderate",
      impact: "Increases risk",
      type: "warning",
      width: "56%",
      shap: "+0.18",
    },

    {
      name: "Sleep Hours",
      value: assessmentData.sleep_hours
        ? `${assessmentData.sleep_hours} hrs/night`
        : "Good",
      impact: "Reduces risk",
      type: "positive",
      width: "68%",
      shap: "-0.21",
    },

    {
      name: "Job Satisfaction",
      value: assessmentData.job_satisfaction
        ? `${assessmentData.job_satisfaction}/5`
        : "Good",
      impact: "Reduces risk",
      type: "positive",
      width: "61%",
      shap: "-0.15",
    },
  ];

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
                {result.score}%
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
                width: `${result.score}%`,
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
                {result.level}
              </h2>

              <span className="risk-badge">
                Moderate Risk
              </span>

            </div>

            <p>
              {result.description}
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