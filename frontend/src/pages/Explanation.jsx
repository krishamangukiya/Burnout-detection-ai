import { Link } from "react-router-dom";

const explanationData = [
  {
    feature: "Screen Time",
    value: "8.5 hours",
    impact: 82,
    direction: "increases",
  },
  {
    feature: "Stress Level",
    value: "8 / 10",
    impact: 76,
    direction: "increases",
  },
  {
    feature: "Sleep Hours",
    value: "5.5 hours",
    impact: 68,
    direction: "increases",
  },
  {
    feature: "Work Hours",
    value: "48 hours/week",
    impact: 54,
    direction: "increases",
  },
  {
    feature: "Job Satisfaction",
    value: "4 / 10",
    impact: 43,
    direction: "increases",
  },
];

function Explanation() {
  return (
    <main className="explanation-page">
      <section className="result-header">
        <span className="assessment-label">
          EXPLAINABLE AI
        </span>

        <h1>
          Why did the model give you
          <span> this result?</span>
        </h1>

        <p>
          SHAP-based explainability helps show which
          factors contributed most to the predicted
          burnout risk.
        </p>
      </section>

      <section className="explanation-card">
        <div className="explanation-card-header">
          <div>
            <span>MODEL EXPLANATION</span>
            <h2>Feature Contribution</h2>
          </div>

          <div className="xai-badge">
            SHAP
          </div>
        </div>

        <div className="shap-list">
          {explanationData.map((item, index) => (
            <div className="shap-row" key={index}>
              <div className="shap-info">
                <strong>{item.feature}</strong>
                <span>{item.value}</span>
              </div>

              <div className="shap-bar">
                <div
                  className="shap-value"
                  style={{
                    width: `${item.impact}%`,
                  }}
                />
              </div>

              <strong className="shap-percent">
                +{item.impact}%
              </strong>
            </div>
          ))}
        </div>
      </section>

      <section className="xai-info">
        <div className="xai-info-card">
          <span>01</span>
          <h3>Prediction</h3>
          <p>
            The trained ML model estimates your burnout
            risk from the submitted features.
          </p>
        </div>

        <div className="xai-info-card">
          <span>02</span>
          <h3>Explanation</h3>
          <p>
            SHAP identifies how individual features
            influenced the model output.
          </p>
        </div>

        <div className="xai-info-card">
          <span>03</span>
          <h3>Understanding</h3>
          <p>
            The result becomes easier to understand
            instead of being a black-box prediction.
          </p>
        </div>
      </section>

      <Link
        to="/recommendations"
        className="assessment-primary-btn centered-btn"
      >
        Continue to Recommendations →
      </Link>
    </main>
  );
}

export default Explanation;