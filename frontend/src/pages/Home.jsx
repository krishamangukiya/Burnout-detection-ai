import React from "react";

function Home() {
  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-label">
            AI-POWERED BURNOUT DETECTION
          </div>

          <h1 className="hero-title">
            Understand Your{" "}
            <span>Burnout Risk</span>
            <br />
            Before It Gets Worse.
          </h1>

          <p className="hero-description">
            An intelligent system that analyzes work patterns, lifestyle,
            stress levels and well-being indicators to identify early signs
            of burnout and provide understandable insights.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Check Your Burnout
              <span>→</span>
            </button>

            <button className="secondary-btn">
              See How It Works
              <span>→</span>
            </button>

          </div>

          {/* Trust Points */}
          <div className="hero-trust">

            <div className="trust-item">

              <div className="trust-icon">
                ✓
              </div>

              <div>
                <strong>Private Assessment</strong>
                <span>Your information stays protected</span>
              </div>

            </div>

            <div className="trust-item">

              <div className="trust-icon lightning">
                ϟ
              </div>

              <div>
                <strong>Quick Analysis</strong>
                <span>Get results in seconds</span>
              </div>

            </div>

            <div className="trust-item">

              <div className="trust-icon">
                ✦
              </div>

              <div>
                <strong>Explainable AI</strong>
                <span>Understand your prediction</span>
              </div>

            </div>

          </div>

        </div>


        {/* ================= HERO CARD ================= */}

        <div className="hero-card">

          <div className="card-header">

            <div>
              <span className="small-label">
                YOUR WELL-BEING
              </span>

              <h3>
                Burnout Overview
              </h3>
            </div>

            <button className="more-btn">
              •••
            </button>

          </div>


          <div className="score-section">

            <div className="score-circle">

              <div className="score-inner">

                <strong>
                  64
                </strong>

                <span>
                  /100
                </span>

              </div>

            </div>


            <div className="score-info">

              <span className="status-label">
                CURRENT STATUS
              </span>

              <h2>
                Moderate Risk
              </h2>

              <p>
                Your current patterns indicate
                some signs of burnout.
              </p>

            </div>

          </div>


          {/* Progress */}

          <div className="risk-progress">

            <div className="progress-heading">

              <span>
                Burnout Risk
              </span>

              <strong>
                64%
              </strong>

            </div>

            <div className="progress-bar">

              <div className="progress-value"></div>

            </div>

          </div>


          {/* Insight Cards */}

          <div className="mini-insights">

            <div className="mini-card">

              <div className="mini-icon purple">
                ◉
              </div>

              <div>
                <strong>
                  Workload
                </strong>

                <span>
                  High
                </span>
              </div>

            </div>


            <div className="mini-card">

              <div className="mini-icon blue">
                ◌
              </div>

              <div>

                <strong>
                  Recovery
                </strong>

                <span>
                  Needs attention
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURE STRIP ================= */}

      <section className="feature-strip">

        <div className="feature-card">

          <div className="feature-icon purple-bg">
            ◉
          </div>

          <div>

            <h3>
              AI Prediction
            </h3>

            <p>
              Machine learning based risk analysis
            </p>

          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon blue-bg">
            ✦
          </div>

          <div>

            <h3>
              Explainable AI
            </h3>

            <p>
              Understand why the model predicts risk
            </p>

          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon green-bg">
            ✓
          </div>

          <div>

            <h3>
              Early Detection
            </h3>

            <p>
              Identify warning signs before burnout
            </p>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="section-label">
          HOW IT WORKS
        </div>

        <h2 className="section-title">
          From Data to <span>Insight.</span>
        </h2>

        <p className="section-description">
          BurnoutDetect transforms everyday behavioral and well-being
          information into meaningful burnout risk insights.
        </p>


        <div className="steps-container">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>
              Assess
            </h3>

            <p>
              Provide information about your work patterns,
              lifestyle and well-being.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>
              Analyze
            </h3>

            <p>
              Machine learning analyzes the collected
              factors and identifies risk patterns.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>
              Understand
            </h3>

            <p>
              Explainable AI highlights the factors
              influencing your burnout risk.
            </p>

          </div>

        </div>

      </section>


      {/* ================= SYSTEM FEATURES ================= */}

      <section className="features-section">

        <div className="section-label">
          SYSTEM FEATURES
        </div>

        <h2 className="section-title">
          Intelligent Insights,
          <br />
          <span>Made Understandable.</span>
        </h2>

        <p className="section-description">
          Designed to help users recognize burnout patterns early
          and take meaningful action.
        </p>


        <div className="feature-grid">

          <div className="large-feature-card">

            <div className="large-icon">
              ◉
            </div>

            <h3>
              Burnout Risk Prediction
            </h3>

            <p>
              Machine learning models evaluate multiple
              behavioral and well-being factors to estimate
              burnout risk.
            </p>

          </div>


          <div className="large-feature-card">

            <div className="large-icon">
              ✦
            </div>

            <h3>
              Explainable AI
            </h3>

            <p>
              SHAP-based explanations help users understand
              which factors contributed most to the prediction.
            </p>

          </div>


          <div className="large-feature-card">

            <div className="large-icon">
              ✓
            </div>

            <h3>
              Early Warning
            </h3>

            <p>
              Identify potential warning signs before burnout
              becomes more severe.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div className="cta-content">

          <div className="section-label">
            TAKE THE FIRST STEP
          </div>

          <h2>
            Understand Your Risk.
            <br />
            <span>Protect Your Well-being.</span>
          </h2>

          <p>
            Take a quick assessment and discover what your
            current patterns may be telling you.
          </p>

          <button className="primary-btn cta-btn">
            Check Your Burnout
            <span>→</span>
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-brand">

          <strong>
            Burnout<span>AI</span>
          </strong>

          <p>
            AI-powered burnout risk detection and
            explainable insights.
          </p>

        </div>

        <div className="footer-bottom">
          © 2026 BurnoutAI. AI-based burnout detection system.
        </div>

      </footer>

    </div>
  );
}

export default Home;