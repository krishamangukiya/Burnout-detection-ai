import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BurnoutResult.css";

const BurnoutResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // GET ASSESSMENT DATA
  // =========================================================

  const assessmentData = location.state?.assessmentData;

  // =========================================================
  // STATE
  // =========================================================

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // DEBUG
  // =========================================================

  console.log("Assessment data received:", assessmentData);

  // =========================================================
  // CALL FASTAPI
  // =========================================================

  useEffect(() => {
    const getPrediction = async () => {
      // No assessment data
      if (!assessmentData) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Sending data to FastAPI:", assessmentData);

        const response = await fetch(
          "http://127.0.0.1:8000/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(assessmentData),
          }
        );

        console.log("FastAPI status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();

          console.error(
            "FastAPI error response:",
            errorText
          );

          throw new Error(
            'Prediction failed. Server returned ${response.status}'
          );
        }

        const data = await response.json();

        console.log(
          "FastAPI prediction response:",
          data
        );

        // Store API result
        setResult(data);

      } catch (err) {
        console.error(
          "Prediction error:",
          err
        );

        setError(
          err.message ||
            "Unable to connect to the prediction server."
        );
      } finally {
        setLoading(false);
      }
    };

    getPrediction();
  }, [assessmentData]);

  // =========================================================
  // NO ASSESSMENT DATA
  // =========================================================

  if (!assessmentData) {
    return (
      <div className="result-page result-empty">

        <div className="result-empty-card">

          <div className="result-empty-icon">
            !
          </div>

          <span className="result-eyebrow">
            BURNOUT ASSESSMENT
          </span>

          <h1>
            No Assessment Found
          </h1>

          <p>
            Please complete the burnout assessment first
            to view your personalized result.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/check-burnout")
            }
          >
            Start Assessment

            <span>
              →
            </span>

          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="result-page result-empty">

        <div className="result-empty-card">

          <div className="result-empty-icon">
            ⟳
          </div>

          <span className="result-eyebrow">
            AI BURNOUT ASSESSMENT
          </span>

          <h1>
            Analyzing Your Assessment
          </h1>

          <p>
            Our AI model is analyzing your work patterns,
            lifestyle factors, and behavioral information.
          </p>

          <p>
            Please wait while we generate your burnout result.
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // API ERROR
  // =========================================================

  if (error) {
    return (
      <div className="result-page result-empty">

        <div className="result-empty-card">

          <div className="result-empty-icon">
            !
          </div>

          <span className="result-eyebrow">
            AI BURNOUT ASSESSMENT
          </span>

          <h1>
            Prediction Failed
          </h1>

          <p>
            {error}
          </p>

          <p>
            Please make sure your FastAPI server is running
            and try the assessment again.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/check-burnout")
            }
          >
            Try Again

            <span>
              →
            </span>

          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!result) {
    return (
      <div className="result-page result-empty">

        <div className="result-empty-card">

          <div className="result-empty-icon">
            !
          </div>

          <span className="result-eyebrow">
            AI BURNOUT ASSESSMENT
          </span>

          <h1>
            No Prediction Available
          </h1>

          <p>
            The AI model did not return a prediction.
            Please try the assessment again.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/check-burnout")
            }
          >
            Retake Assessment

            <span>
              →
            </span>

          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // GET SCORE
  // =========================================================

  const burnoutScore = Number(
    result.burnout_score
  );

  const burnoutLevel =
    result.burnout_level || "Unknown";

  // Convert 0-10 score into percentage
  const scorePercentage = Math.min(
    Math.max(burnoutScore * 10, 0),
    100
  );

  // =========================================================
  // SHAP FACTORS
  // =========================================================

  const shapExplanation =
    Array.isArray(result.explanation)
      ? result.explanation
      : [];

  // Display strongest 5 factors
  const factors = shapExplanation
    .slice(0, 5)
    .map((item) => {

      const impact = Number(
        item.impact || 0
      );

      let type = "warning";
      let impactText = "Neutral";

      if (item.direction === "increases") {
        type = "negative";
        impactText = "Increases risk";
      }

      if (item.direction === "decreases") {
        type = "positive";
        impactText = "Reduces risk";
      }

      return {
        name: formatFeatureName(
          item.feature
        ),

        value:
          impact > 0
            ? `+${impact.toFixed(2)}`
            : impact.toFixed(2),

        impact: impactText,

        type,

        shap:
          impact > 0
            ? `+${impact.toFixed(2)}`
            : impact.toFixed(2),

        numericImpact: impact,

        width: `${Math.min(
          Math.abs(impact) * 100,
          100
        )}%`,
      };
    });

  // =========================================================
  // INTERPRETATION
  // =========================================================

  let interpretation = "";

  if (burnoutLevel === "Low") {

    interpretation =
      "Your current work pattern shows relatively low signs of burnout risk. Continue maintaining healthy work habits, sufficient rest, and a balanced routine.";

  } else if (burnoutLevel === "Moderate") {

    interpretation =
      "Your current work pattern shows signs of increased strain. Some of the factors identified by the AI model are contributing to your burnout risk. Consider improving your work-life balance and taking regular breaks.";

  } else if (burnoutLevel === "High") {

    interpretation =
      "Your current work pattern shows significant signs of burnout risk. The factors identified by the AI model suggest that changes to workload, rest, and work habits may be important.";

  } else {

    interpretation =
      "The AI model has analyzed your assessment and identified several factors contributing to your current burnout score.";
  }

  // =========================================================
  // RENDER RESULT PAGE
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
            Your assessment has been analyzed using our
            AI-powered burnout detection system.
          </p>

        </div>

        <div className="assessment-date">

          <div className="date-icon">
            ◷
          </div>

          <div>

            <small>
              Assessment completed
            </small>

            <strong>
              Today
            </strong>

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

                {scorePercentage.toFixed(1)}

                <small>
                  %
                </small>

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
                width: `${scorePercentage}%`,
              }}
            ></div>

          </div>


          <div className="score-scale">

            <span>
              Low
            </span>

            <span>
              Moderate
            </span>

            <span>
              High
            </span>

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
                {burnoutLevel}
              </h2>

              <span
                className={`risk-badge ${burnoutLevel.toLowerCase()}`}
              >
                {burnoutLevel} Risk
              </span>

            </div>

            <p>

              Your AI assessment indicates a{" "}

              <strong>
                {burnoutLevel.toLowerCase()}
              </strong>{" "}

              level of burnout risk based on your
              reported work patterns, lifestyle,
              and behavioral factors.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          AI EXPLANATION
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
              The following factors had the strongest
              influence on your burnout prediction.
            </p>

          </div>

        </div>


        {/* FACTORS CARD */}

        <div className="explanation-card">

          <div className="explanation-card-header">

            <div>

              <h3>
                Key Contributing Factors
              </h3>

              <p>
                Factors are ranked according to their
                influence on your predicted burnout risk.
              </p>

            </div>

            <span className="shap-tag">
              SHAP ANALYSIS
            </span>

          </div>


          {/* FACTORS */}

          <div className="factors-list">

            {factors.length > 0 ? (

              factors.map(
                (factor, index) => (

                  <div
                    className="factor-row"
                    key={`${factor.name}-${index}`}
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
                            width:
                              factor.width,
                          }}
                        ></div>

                      </div>

                    </div>


                    {/* IMPACT */}

                    <div
                      className={`factor-impact ${factor.type}`}
                    >

                      <span>

                        {factor.type ===
                        "positive"
                          ? "↓"
                          : factor.type ===
                            "negative"
                          ? "↑"
                          : "•"}

                      </span>

                      {factor.impact}

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="no-factors">
                No SHAP explanation was returned
                by the model.
              </div>

            )}

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
                SHAP explains how each input feature
                contributes to the model's prediction.
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

            {factors.length > 0 ? (

              factors.map(
                (factor, index) => {

                  const impact =
                    factor.numericImpact;

                  const isPositive =
                    impact > 0;

                  const barWidth = Math.min(
                    Math.abs(impact) * 100,
                    45
                  );

                  return (

                    <div
                      className="chart-row"
                      key={`chart-${factor.name}-${index}`}
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
                              width: `${barWidth}%`,
                              marginLeft: "50%",
                            }}
                          >

                            {factor.shap}

                          </div>

                        ) : (

                          <div
                            className="shap-value reduced-risk"
                            style={{
                              width: `${barWidth}%`,
                              marginLeft: `${50 - barWidth}%`,
                            }}
                          >

                            {factor.shap}

                          </div>

                        )}

                      </div>

                    </div>

                  );
                }
              )

            ) : (

              <div className="no-factors">
                No SHAP data available.
              </div>

            )}

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
            Your work pattern has been analyzed.
          </h2>

          <p>
            {interpretation}
          </p>

        </div>

      </section>


      {/* =====================================================
          PERSONALIZED RECOMMENDATION
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
              Get practical suggestions based on your
              burnout score and the factors identified
              by the AI.
            </p>

          </div>

        </div>


        <button
          className="recommendation-btn"
          onClick={() =>
            navigate(
              "/recommendations",
              {
                state: { assessmentData, result, factors }
              }
            )
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


// =============================================================
// HELPER FUNCTION
// Convert feature names into readable names
// =============================================================

function formatFeatureName(feature) {

  if (!feature) {
    return "Unknown Factor";
  }

  return feature
    .replace(/^num__/, "")
    .replace(/^cat__/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}


export default BurnoutResult;