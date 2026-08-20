function HowItWorks() {
    return (
      <main>
  
        <section className="page-hero">
  
          <div className="section-container">
  
            <span className="section-tag">
              HOW IT WORKS
            </span>
  
            <h1>
              From your data to
              <span className="gradient-text">
                actionable insight.
              </span>
            </h1>
  
            <p>
              Burnout AI follows a structured machine learning
              workflow to analyze your information and estimate
              burnout risk.
            </p>
  
          </div>
  
        </section>
  
  
        <section className="process-section">
  
          <div className="section-container">
  
            <div className="process-grid">
  
              {/* Step 1 */}
              <div className="process-item">
  
                <div className="process-icon">
                  01
                </div>
  
                <h3>
                  Complete Assessment
                </h3>
  
                <p>
                  Enter information related to your work patterns,
                  lifestyle, sleep, stress, anxiety and other
                  relevant factors.
                </p>
  
              </div>
  
  
              {/* Step 2 */}
              <div className="process-item">
  
                <div className="process-icon">
                  02
                </div>
  
                <h3>
                  Data Processing
                </h3>
  
                <p>
                  The submitted information is processed and
                  transformed into the required machine learning
                  features.
                </p>
  
              </div>
  
  
              {/* Step 3 */}
              <div className="process-item">
  
                <div className="process-icon">
                  03
                </div>
  
                <h3>
                  ML Prediction
                </h3>
  
                <p>
                  The trained machine learning model predicts the
                  expected burnout score.
                </p>
  
              </div>
  
  
              {/* Step 4 */}
              <div className="process-item">
  
                <div className="process-icon">
                  04
                </div>
  
                <h3>
                  Risk Classification
                </h3>
  
                <p>
                  The predicted burnout score is interpreted into
                  Low, Moderate or High risk levels.
                </p>
  
              </div>
  
  
              {/* Step 5 */}
              <div className="process-item">
  
                <div className="process-icon">
                  05
                </div>
  
                <h3>
                  SHAP Explanation
                </h3>
  
                <p>
                  Explainable AI identifies the major factors that
                  influenced the prediction.
                </p>
  
              </div>
  
  
              {/* Step 6 */}
              <div className="process-item">
  
                <div className="process-icon">
                  06
                </div>
  
                <h3>
                  Recommendations
                </h3>
  
                <p>
                  Users receive practical recommendations based
                  on their identified risk factors.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </section>
  
  
        {/* ML Pipeline */}
  
        <section className="about-section">
  
          <div className="section-container">
  
            <div className="section-heading center">
  
              <span className="section-tag">
                ML PIPELINE
              </span>
  
              <h2>
                How the prediction
                <span> is generated.</span>
              </h2>
  
            </div>
  
  
            <div className="process-grid">
  
              <div className="process-item">
  
                <div className="process-icon">
                  01
                </div>
  
                <h3>
                  Preprocessing
                </h3>
  
                <p>
                  Clean and prepare the dataset for machine
                  learning.
                </p>
  
              </div>
  
  
              <div className="process-item">
  
                <div className="process-icon">
                  02
                </div>
  
                <h3>
                  Feature Engineering
                </h3>
  
                <p>
                  Select and transform relevant numerical and
                  categorical features.
                </p>
  
              </div>
  
  
              <div className="process-item">
  
                <div className="process-icon">
                  03
                </div>
  
                <h3>
                  Model Prediction
                </h3>
  
                <p>
                  Compare Linear Regression, Random Forest
                  and XGBoost models.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </section>
  
      </main>
    );
  }
  
  export default HowItWorks;