function HowitWorks() {
  return (
    <div className="page-container">

      <section className="page-hero">

        <p className="section-label">HOW IT WORKS</p>

        <h1>
          From Data to
          <span> Insight.</span>
        </h1>

        <p>
          BurnoutDetect follows a structured machine learning workflow
          to analyze user information, predict burnout risk and provide
          understandable explanations.
        </p>

      </section>


      <section className="steps-section">

        <div className="process-card">

          <div className="step-number">01</div>

          <h2>Data Collection</h2>

          <p>
            Relevant behavioral and work-related information is collected
            from the user through the burnout assessment interface.
          </p>

        </div>


        <div className="process-card">

          <div className="step-number">02</div>

          <h2>Data Processing</h2>

          <p>
            The collected data is cleaned, transformed and prepared
            before being provided to the machine learning model.
          </p>

        </div>


        <div className="process-card">

          <div className="step-number">03</div>

          <h2>ML Prediction</h2>

          <p>
            The trained machine learning model analyzes the input
            features and predicts the user's burnout risk level.
          </p>

        </div>


        <div className="process-card">

          <div className="step-number">04</div>

          <h2>Risk Classification</h2>

          <p>
            The prediction is categorized into an understandable risk
            level such as Low, Moderate or High.
          </p>

        </div>


        <div className="process-card">

          <div className="step-number">05</div>

          <h2>Explainable AI</h2>

          <p>
            XAI techniques help identify the factors that contributed
            most to the model's prediction.
          </p>

        </div>


        <div className="process-card">

          <div className="step-number">06</div>

          <h2>Recommendations</h2>

          <p>
            The system presents useful preventive recommendations based
            on the detected burnout risk.
          </p>

        </div>

      </section>

    </div>
  );
}

export default HowitWorks;