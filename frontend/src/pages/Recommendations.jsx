function Recommendations() {
  return (
    <div className="page-container">

      <section className="page-hero">

        <p className="section-label">
          PERSONALIZED GUIDANCE
        </p>

        <h1>
          Take Action Before
          <span> Burnout.</span>
        </h1>

        <p>
          Based on the detected risk level, here are some areas you
          can focus on to improve your work-life balance.
        </p>

      </section>


      <section className="recommendations-grid">

        <div className="recommendation-card">

          <div className="feature-icon">😴</div>

          <h2>Improve Sleep</h2>

          <p>
            Maintain a consistent sleep schedule and aim for adequate
            rest to support recovery.
          </p>

        </div>


        <div className="recommendation-card">

          <div className="feature-icon">⏱️</div>

          <h2>Take Regular Breaks</h2>

          <p>
            Include short breaks during long working sessions to
            reduce mental fatigue.
          </p>

        </div>


        <div className="recommendation-card">

          <div className="feature-icon">🧘</div>

          <h2>Manage Stress</h2>

          <p>
            Use healthy stress-management techniques and avoid
            prolonged periods of excessive workload.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Recommendations;