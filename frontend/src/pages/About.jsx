function About() {
  return (
    <div className="page-container">

      <section className="page-hero">
        <p className="section-label">ABOUT BURNOUT DETECT</p>

        <h1>
          Understanding Burnout
          <span> Before It Gets Worse.</span>
        </h1>

        <p>
          BurnoutDetect is an AI-powered system designed to identify
          potential burnout risk by analyzing relevant behavioral and
          work-related factors.
        </p>
      </section>


      <section className="about-content">

        <div className="about-card">
          <div className="feature-icon">🎯</div>

          <h2>Our Objective</h2>

          <p>
            The primary objective of BurnoutDetect is to provide an
            early indication of burnout risk so that users can recognize
            unhealthy patterns and take appropriate preventive action.
          </p>
        </div>


        <div className="about-card">
          <div className="feature-icon">🤖</div>

          <h2>AI-Powered Detection</h2>

          <p>
            Machine learning models analyze input features and identify
            patterns associated with different levels of burnout risk.
          </p>
        </div>


        <div className="about-card">
          <div className="feature-icon">🔍</div>

          <h2>Explainable AI</h2>

          <p>
            The system uses Explainable AI techniques to provide
            understandable insights into why a prediction was made.
          </p>
        </div>

      </section>

    </div>
  );
}

export default About;