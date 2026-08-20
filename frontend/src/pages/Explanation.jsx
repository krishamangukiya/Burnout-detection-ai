function Explanation() {
    return (
      <div className="page-container">
  
        <section className="page-hero">
  
          <p className="section-label">
            EXPLAINABLE AI
          </p>
  
          <h1>
            Why Did The Model
            <span> Predict This?</span>
          </h1>
  
          <p>
            Understand the factors that influenced your burnout risk
            prediction.
          </p>
  
        </section>
  
  
        <section className="explanation-grid">
  
          <div className="explanation-card">
  
            <h2>Top Contributing Factors</h2>
  
            <div className="factor">
              <span>Workload</span>
              <strong>High</strong>
            </div>
  
            <div className="factor">
              <span>Working Hours</span>
              <strong>High</strong>
            </div>
  
            <div className="factor">
              <span>Sleep</span>
              <strong>Low</strong>
            </div>
  
            <div className="factor">
              <span>Job Satisfaction</span>
              <strong>Moderate</strong>
            </div>
  
          </div>
  
  
          <div className="explanation-card">
  
            <h2>Model Explanation</h2>
  
            <p>
              These factors had the greatest influence on the model's
              prediction for this assessment.
            </p>
  
            <div className="chart-placeholder">
              SHAP Visualization
            </div>
  
          </div>
  
        </section>
  
      </div>
    );
  }
  
  export default Explanation;