function Home() {
  return (
    <main className="home" id="home">
      <section className="hero">
        <div className="hero-content">
          <p className="subtitle">AI-POWERED BURNOUT DETECTION</p>

          <h1>
            Understand Your
            <span> Burnout Risk </span>
            Before It Gets Worse.
          </h1>

          <p className="description">
            An intelligent system that analyzes behavioral and lifestyle
            factors to identify burnout risk and provide understandable
            insights.
          </p>

          <button className="primary-button">
            Check My Burnout Risk
          </button>
        </div>

        <div className="hero-card">
          <div className="card-icon">🧠</div>
          <h3>Burnout Risk Analysis</h3>
          <p>
            Machine learning helps identify patterns associated with
            burnout risk.
          </p>

          <div className="risk-item">
            <span>Current Risk</span>
            <strong>Analysis Required</strong>
          </div>
        </div>
      </section>

      <section className="features" id="how-it-works">
        <div className="feature">
          <h3>📊 Data Analysis</h3>
          <p>
            Analyze relevant behavioral and lifestyle information.
          </p>
        </div>

        <div className="feature">
          <h3>🤖 Machine Learning</h3>
          <p>
            Use trained machine learning models to estimate burnout risk.
          </p>
        </div>

        <div className="feature">
          <h3>💡 Explainable Results</h3>
          <p>
            Understand which factors contribute to the prediction.
          </p>
        </div>
      </section>

      <section className="about" id="about">
        <h2>About BurnoutDetect</h2>

        <p>
          BurnoutDetect is designed to provide an early indication of
          burnout risk using machine learning and explainable AI.
          The system aims to help users understand their risk factors
          and take appropriate preventive action.
        </p>
      </section>
    </main>
  );
}

export default Home;