import React from "react";

function About() {
  return (
    <div className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-content">

          <div className="about-label">
            ABOUT BURNOUT AI
          </div>

          <h1>
            Understand Burnout.
            <br />
            <span>Before It Takes Over.</span>
          </h1>

          <p>
            BurnoutAI is an AI-based burnout detection system designed to
            identify early signs of burnout by analyzing work patterns,
            lifestyle factors, stress levels and well-being indicators.
          </p>

        </div>
      </section>


      {/* ================= OUR PURPOSE ================= */}
      <section className="purpose-section">

        <div className="purpose-content">

          <div className="purpose-text">

            <div className="section-label">
              OUR PURPOSE
            </div>

            <h2>
              Turning Data Into
              <br />
              <span>Meaningful Insights.</span>
            </h2>

            <p>
              Burnout can develop gradually when prolonged stress,
              excessive workload, poor work-life balance and insufficient
              recovery continue over time.
            </p>

            <p>
              BurnoutAI uses machine learning to analyze multiple factors
              associated with burnout and estimate an individual's burnout
              risk level.
            </p>

            <p>
              The system also uses Explainable AI to make the prediction
              understandable by showing the factors that contributed to
              the result.
            </p>

          </div>


          {/* INFO CARD */}
          <div className="purpose-card">

            <div className="purpose-icon">
              ✦
            </div>

            <h3>
              AI-Powered Detection
            </h3>

            <p>
              Analyze multiple work, lifestyle and well-being indicators
              to identify potential burnout patterns.
            </p>

            <div className="purpose-divider"></div>

            <strong>
              ML + XAI
            </strong>

            <span>
              Intelligent & Explainable
            </span>

          </div>

        </div>

      </section>


      {/* ================= WHAT WE ANALYZE ================= */}
      <section className="analyze-section">

        <div className="analyze-heading">

          <div className="section-label">
            WHAT WE ANALYZE
          </div>

          <h2>
            Multiple Factors. <span>One Clear Picture.</span>
          </h2>

          <p>
            Burnout is influenced by multiple aspects of daily life.
            BurnoutAI considers several relevant factors instead of
            relying on a single indicator.
          </p>

        </div>


        <div className="analyze-grid">

          {/* WORK */}
          <div className="analyze-card">

            <div className="analyze-icon purple">
              ◎
            </div>

            <div>
              <h3>Work Patterns</h3>

              <p>
                Work hours, overtime, meetings and missed deadlines
                can provide important information about workload.
              </p>
            </div>

          </div>


          {/* LIFESTYLE */}
          <div className="analyze-card">

            <div className="analyze-icon blue">
              ○
            </div>

            <div>
              <h3>Lifestyle</h3>

              <p>
                Sleep, physical activity, screen time and caffeine
                intake are considered as part of the assessment.
              </p>
            </div>

          </div>


          {/* MENTAL WELLBEING */}
          <div className="analyze-card">

            <div className="analyze-icon violet">
              ✦
            </div>

            <div>
              <h3>Mental Well-being</h3>

              <p>
                Stress, anxiety, depression and social support
                provide additional context for burnout risk.
              </p>
            </div>

          </div>


          {/* WORKPLACE */}
          <div className="analyze-card">

            <div className="analyze-icon green">
              ✓
            </div>

            <div>
              <h3>Workplace Environment</h3>

              <p>
                Job satisfaction, manager support, company size
                and work mode help provide a broader assessment.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="about-footer">

        <div className="footer-brand">
          <strong>
            Burnout<span>AI</span>
          </strong>

          <p>
            AI-powered burnout risk detection and explainable insights.
          </p>
        </div>

        <div className="footer-copy">
          © 2026 BurnoutAI. AI-based burnout detection system.
        </div>

      </footer>

    </div>
  );
}

export default About;