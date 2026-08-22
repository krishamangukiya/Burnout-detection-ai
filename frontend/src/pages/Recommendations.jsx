import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Recommendations.css";

const Recommendations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Assessment data coming from the result page
  const assessmentData = location.state?.assessmentData;

  console.log("Recommendation page data:", assessmentData);

  /*
    ---------------------------------------------------------
    TEMPORARY DATA
    ---------------------------------------------------------
    Later these recommendations can be generated dynamically
    by the ML/FastAPI backend based on the user's assessment.
  */

  const recommendations = [
    {
      icon: "◷",
      category: "WORK & SCREEN TIME",
      title: "Take regular screen breaks",
      description:
        "Your screen usage may be contributing to your overall burnout risk. Take short breaks during long periods of computer or digital-device use.",
      action:
        "Try a 5–10 minute break after every 60–90 minutes of focused work.",
      type: "purple",
    },
    {
      icon: "⌛",
      category: "WORKLOAD",
      title: "Manage extended working hours",
      description:
        "Long working hours can increase mental fatigue and reduce recovery time. Try to maintain a consistent working schedule.",
      action:
        "Set a daily work limit and avoid unnecessary work after your planned working hours.",
      type: "blue",
    },
    {
      icon: "☾",
      category: "SLEEP & RECOVERY",
      title: "Protect your sleep routine",
      description:
        "Adequate sleep supports concentration, emotional regulation, and recovery from daily stress.",
      action:
        "Aim for a consistent sleep schedule and approximately 7–9 hours of sleep when possible.",
      type: "green",
    },
    {
      icon: "⚡",
      category: "OVERTIME",
      title: "Reduce unnecessary overtime",
      description:
        "Frequent overtime can increase workload pressure and reduce the time available for recovery and personal activities.",
      action:
        "Identify tasks that can be planned earlier or delegated to reduce repeated overtime.",
      type: "orange",
    },
    {
      icon: "♡",
      category: "WELL-BEING",
      title: "Make time for physical activity",
      description:
        "Regular physical activity can support energy levels and help maintain a healthier work-life routine.",
      action:
        "Try walking, stretching, or another enjoyable physical activity for 20–30 minutes.",
      type: "pink",
    },
    {
      icon: "✦",
      category: "MENTAL WELL-BEING",
      title: "Monitor your stress levels",
      description:
        "Pay attention to changes in stress, concentration, motivation, and energy throughout your working week.",
      action:
        "Use simple breathing exercises, short breaks, or relaxation activities when you notice increasing stress.",
      type: "violet",
    },
  ];

  return (
    <div className="recommendations-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="recommendations-header">

        <div className="recommendations-eyebrow">
          <span className="recommendation-dot"></span>
          PERSONALIZED SUPPORT
        </div>

        <h1>
          Recommendations <span>For You</span>
        </h1>

        <p>
          Based on your burnout assessment, here are practical suggestions
          designed to help you manage workload, improve recovery, and maintain
          a healthier daily routine.
        </p>

        <div className="recommendation-note">
          <span>✦</span>
          <div>
            <strong>Personalized guidance</strong>
            <small>
              These suggestions are based on the factors identified during
              your burnout assessment.
            </small>
          </div>
        </div>

      </section>


      {/* =====================================================
          CURRENT STATUS
      ===================================================== */}

      <section className="recommendation-status">

        <div className="status-card">

          <div className="status-icon">
            ✦
          </div>

          <div className="status-content">
            <span className="status-label">
              YOUR CURRENT STATUS
            </span>

            <h2>
              Moderate Burnout Risk
            </h2>

            <p>
              Focus on reducing workload pressure, improving recovery time,
              and maintaining healthy daily habits.
            </p>
          </div>

          <div className="status-score">
            <strong>68%</strong>
            <span>Burnout Score</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          RECOMMENDATIONS
      ===================================================== */}

      <section className="recommendations-section">

        <div className="section-heading">

          <span className="section-label">
            YOUR PERSONALIZED PLAN
          </span>

          <h2>
            Small changes can make a difference.
          </h2>

          <p>
            Start with the recommendations that feel most practical for your
            current routine. You do not need to change everything at once.
          </p>

        </div>


        <div className="recommendations-grid">

          {recommendations.map((recommendation, index) => (

            <article
              className="recommendation-card"
              key={index}
            >

              <div className="recommendation-card-top">

                <div
                  className={`recommendation-icon ${recommendation.type}`}
                >
                  {recommendation.icon}
                </div>

                <span className="recommendation-number">
                  0{index + 1}
                </span>

              </div>

              <span className="recommendation-category">
                {recommendation.category}
              </span>

              <h3>
                {recommendation.title}
              </h3>

              <p>
                {recommendation.description}
              </p>

              <div className="recommendation-action">

                <span className="action-icon">
                  →
                </span>

                <div>
                  <strong>Try this</strong>
                  <span>
                    {recommendation.action}
                  </span>
                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          DAILY PLAN
      ===================================================== */}

      <section className="daily-plan-section">

        <div className="daily-plan-card">

          <div className="daily-plan-heading">

            <div className="plan-icon">
              ✓
            </div>

            <div>
              <span>
                SIMPLE DAILY PLAN
              </span>

              <h2>
                Build healthier work habits
              </h2>

              <p>
                A simple routine can help you gradually improve your
                work-life balance.
              </p>
            </div>

          </div>


          <div className="daily-plan-grid">

            <div className="plan-item">

              <div className="plan-time">
                Morning
              </div>

              <div className="plan-line">
                <span></span>
              </div>

              <div className="plan-content">
                <strong>
                  Start your day intentionally
                </strong>

                <p>
                  Plan your important tasks and avoid beginning the day with
                  unnecessary digital distractions.
                </p>
              </div>

            </div>


            <div className="plan-item">

              <div className="plan-time">
                Work
              </div>

              <div className="plan-line">
                <span></span>
              </div>

              <div className="plan-content">
                <strong>
                  Use focused work sessions
                </strong>

                <p>
                  Work in focused sessions and include short breaks between
                  demanding tasks.
                </p>
              </div>

            </div>


            <div className="plan-item">

              <div className="plan-time">
                Evening
              </div>

              <div className="plan-line">
                <span></span>
              </div>

              <div className="plan-content">
                <strong>
                  Disconnect from work
                </strong>

                <p>
                  Give yourself time away from work-related screens and
                  activities before going to sleep.
                </p>
              </div>

            </div>


            <div className="plan-item">

              <div className="plan-time">
                Night
              </div>

              <div className="plan-line">
                <span></span>
              </div>

              <div className="plan-content">
                <strong>
                  Prioritize recovery
                </strong>

                <p>
                  Maintain a consistent sleep routine and allow enough time
                  for physical and mental recovery.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPORTANT NOTE
      ===================================================== */}

      <section className="recommendation-disclaimer">

        <div className="disclaimer-icon">
          i
        </div>

        <div>
          <strong>
            Important
          </strong>

          <p>
            These recommendations are intended as general wellness guidance
            and are not a medical diagnosis or substitute for professional
            healthcare. If your stress or burnout symptoms persist or become
            difficult to manage, consider speaking with a qualified
            professional.
          </p>
        </div>

      </section>


      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <section className="recommendation-actions">

        <button
          className="secondary-btn"
          onClick={() => navigate("/result")}
        >
          ← Back to Result
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
          <span>→</span>
        </button>

      </section>

    </div>
  );
};

export default Recommendations;