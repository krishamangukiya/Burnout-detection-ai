import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recommendations.css";

const Recommendations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data received from BurnoutResult.jsx
  const assessmentData = location.state?.assessmentData;

  const predictionResult =
    location.state?.result ||
    location.state?.predictionResult;

  /*
   * =========================================================
   * GENERATE PERSONALIZED RECOMMENDATIONS
   * =========================================================
   */

  const recommendations = useMemo(() => {
    if (!assessmentData) {
      return [];
    }

    const personalized = [];

    const addRecommendation = (
      condition,
      recommendation
    ) => {
      if (condition) {
        personalized.push({
          ...recommendation,
          personalized: true,
        });
      }
    };

    // ---------------------------------------------------------
    // 1. SCREEN TIME
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.screen_time_hours) >= 8,
      {
        category: "WORK & SCREEN TIME",
        title: "Take regular screen breaks",
        description:
          "Your daily screen exposure is relatively high and may contribute to digital fatigue and reduced recovery time.",
        action:
          "Try a 5–10 minute break after every 60–90 minutes of focused screen-based work.",
        icon: "◷",
        color: "purple",
        priority: 1,
      }
    );

    // ---------------------------------------------------------
    // 2. WORKING HOURS
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.work_hours_per_week) >= 45,
      {
        category: "WORKLOAD",
        title: "Manage extended working hours",
        description:
          "Your weekly working hours are above a balanced range and may reduce the amount of time available for recovery.",
        action:
          "Set a clear daily stopping time and avoid regularly extending your workday.",
        icon: "⌚",
        color: "blue",
        priority: 2,
      }
    );

    // ---------------------------------------------------------
    // 3. OVERTIME
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.overtime_hours) >= 5,
      {
        category: "WORK-LIFE BALANCE",
        title: "Reduce unnecessary overtime",
        description:
          "Frequent overtime can increase workload pressure and make it harder to maintain consistent recovery time.",
        action:
          "Reserve overtime for genuinely urgent tasks and protect your normal working hours whenever possible.",
        icon: "↗",
        color: "orange",
        priority: 3,
      }
    );

    // ---------------------------------------------------------
    // 4. SLEEP
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.sleep_hours) < 7,
      {
        category: "RECOVERY & SLEEP",
        title: "Protect your sleep routine",
        description:
          "Your reported sleep duration is below the recommended recovery range and may affect energy and concentration.",
        action:
          "Aim for a consistent sleep schedule and create a wind-down period before bedtime.",
        icon: "☾",
        color: "violet",
        priority: 4,
      }
    );

    // ---------------------------------------------------------
    // 5. PHYSICAL ACTIVITY
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.physical_activity_days) < 3,
      {
        category: "PHYSICAL WELLNESS",
        title: "Add more physical activity",
        description:
          "Your current activity frequency is relatively low, which may reduce opportunities to recover from prolonged sedentary work.",
        action:
          "Try adding short walks, stretching, or another enjoyable physical activity throughout the week.",
        icon: "✦",
        color: "green",
        priority: 5,
      }
    );

    // ---------------------------------------------------------
    // 6. STRESS
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.stress_level) >= 4,
      {
        category: "STRESS MANAGEMENT",
        title: "Create a stress-reset routine",
        description:
          "Your reported stress level suggests that regular recovery moments could be especially useful.",
        action:
          "Use short breathing exercises, quiet breaks, or a brief walk when you notice stress building up.",
        icon: "♡",
        color: "pink",
        priority: 6,
      }
    );

    // ---------------------------------------------------------
    // 7. JOB SATISFACTION
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.job_satisfaction) <= 2,
      {
        category: "WORK SATISFACTION",
        title: "Identify sources of work frustration",
        description:
          "Lower job satisfaction can make everyday workload pressure feel more difficult to manage.",
        action:
          "Identify one or two recurring sources of frustration and consider practical ways to improve them.",
        icon: "◎",
        color: "blue",
        priority: 7,
      }
    );

    // ---------------------------------------------------------
    // 8. MANAGER SUPPORT
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.manager_support) <= 2,
      {
        category: "WORKPLACE SUPPORT",
        title: "Strengthen workplace communication",
        description:
          "Limited perceived manager support may make workload and deadline pressure harder to manage.",
        action:
          "Discuss workload expectations, priorities, or support needs with your manager when appropriate.",
        icon: "→",
        color: "purple",
        priority: 8,
      }
    );

    // ---------------------------------------------------------
    // 9. WORK-LIFE BALANCE
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.work_life_balance) <= 2,
      {
        category: "WORK-LIFE BALANCE",
        title: "Create clearer boundaries",
        description:
          "Your reported work-life balance suggests that work may be taking up too much of your personal recovery time.",
        action:
          "Set boundaries around work notifications and protect time for personal activities after work.",
        icon: "◇",
        color: "green",
        priority: 9,
      }
    );

    // ---------------------------------------------------------
    // 10. MISSED DEADLINES
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.deadlines_missed) >= 3,
      {
        category: "TASK MANAGEMENT",
        title: "Break large tasks into smaller steps",
        description:
          "Missed deadlines may indicate that workload or task planning needs additional structure.",
        action:
          "Divide larger tasks into smaller milestones and set realistic deadlines for each step.",
        icon: "✓",
        color: "orange",
        priority: 10,
      }
    );

    // ---------------------------------------------------------
    // 11. CAFFEINE
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.caffeine_intake) >= 4,
      {
        category: "DAILY HABITS",
        title: "Monitor caffeine intake",
        description:
          "Higher caffeine consumption may become part of a cycle of fatigue and reduced recovery if used to compensate for insufficient rest.",
        action:
          "Pay attention to when you consume caffeine and avoid relying on it as a replacement for adequate rest.",
        icon: "○",
        color: "pink",
        priority: 11,
      }
    );

    // ---------------------------------------------------------
    // 12. SOCIAL SUPPORT
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.social_support_score) <= 2,
      {
        category: "SOCIAL WELLNESS",
        title: "Stay connected with your support network",
        description:
          "A stronger social support system can provide opportunities to talk, relax, and step away from work-related pressure.",
        action:
          "Make regular time to connect with friends, family, colleagues, or other trusted people.",
        icon: "♡",
        color: "violet",
        priority: 12,
      }
    );

    // ---------------------------------------------------------
    // 13. ANXIETY
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.anxiety_score) >= 6,
      {
        category: "EMOTIONAL WELLNESS",
        title: "Use short anxiety-reset breaks",
        description:
          "Your assessment indicates that anxiety-related experiences may benefit from regular moments of pause and recovery.",
        action:
          "When you feel overwhelmed, pause for a few minutes and use slow breathing or another calming activity.",
        icon: "○",
        color: "purple",
        priority: 13,
      }
    );

    // ---------------------------------------------------------
    // 14. DEPRESSION
    // ---------------------------------------------------------

    addRecommendation(
      Number(assessmentData.depression_score) >= 6,
      {
        category: "EMOTIONAL WELLNESS",
        title: "Prioritize recovery and meaningful activities",
        description:
          "Your responses suggest that maintaining regular routines and activities outside work may be particularly valuable.",
        action:
          "Keep a consistent daily routine and make time for activities that help you feel engaged and refreshed.",
        icon: "✦",
        color: "green",
        priority: 14,
      }
    );

    /*
     * =========================================================
     * GENERAL RECOMMENDATIONS
     *
     * These are used only when fewer than 6 personalized
     * recommendations are generated.
     * =========================================================
     */

    const generalRecommendations = [
      {
        category: "RECOVERY",
        title: "Schedule regular recovery time",
        description:
          "Consistent recovery periods can help prevent work pressure from accumulating throughout the day.",
        action:
          "Add short breaks between demanding tasks and protect some uninterrupted personal time.",
        icon: "◷",
        color: "purple",
        priority: 100,
      },
      {
        category: "FOCUS & PRODUCTIVITY",
        title: "Prioritize your most important tasks",
        description:
          "A clear task priority can reduce unnecessary mental load and make demanding work more manageable.",
        action:
          "Choose your top two or three priorities before starting your workday.",
        icon: "✓",
        color: "blue",
        priority: 101,
      },
      {
        category: "WORK-LIFE BALANCE",
        title: "Create a clear end to your workday",
        description:
          "A consistent transition away from work can help your mind shift into recovery mode.",
        action:
          "Finish your workday with a short review and avoid checking work unnecessarily afterward.",
        icon: "→",
        color: "green",
        priority: 102,
      },
      {
        category: "MINDFUL WORK",
        title: "Use short focus sessions",
        description:
          "Working in manageable focus periods can make long digital work sessions feel less overwhelming.",
        action:
          "Work in focused blocks and use the breaks between them to move away from the screen.",
        icon: "◎",
        color: "orange",
        priority: 103,
      },
      {
        category: "PERSONAL WELLNESS",
        title: "Make time for activities you enjoy",
        description:
          "Personal activities outside work can create a healthier balance and provide opportunities for recovery.",
        action:
          "Schedule time for hobbies, social activities, or other things you genuinely enjoy.",
        icon: "✦",
        color: "pink",
        priority: 104,
      },
      {
        category: "SELF-MONITORING",
        title: "Monitor your energy levels",
        description:
          "Noticing changes in energy, focus, and motivation can help you respond before work pressure becomes overwhelming.",
        action:
          "Check in with yourself during the week and adjust your workload or recovery time when needed.",
        icon: "◇",
        color: "violet",
        priority: 105,
      },
    ];

    /*
     * Sort personalized recommendations by priority.
     */

    personalized.sort(
      (a, b) => a.priority - b.priority
    );

    /*
     * Fill remaining spaces with general recommendations.
     */

    const selected = [...personalized];

    for (const recommendation of generalRecommendations) {
      if (selected.length >= 6) {
        break;
      }

      selected.push({
        ...recommendation,
        personalized: false,
      });
    }

    /*
     * Maximum 6 cards.
     */

    return selected.slice(0, 6);
  }, [assessmentData]);

  /*
   * =========================================================
   * BURNOUT RESULT
   * =========================================================
   */

  const burnoutScore = Number(
    predictionResult?.burnout_score ?? 0
  );

  const burnoutLevel =
    predictionResult?.burnout_level || "Unknown";

  /*
   * Model score is 0–10.
   * Convert to percentage for UI display.
   */

  const scorePercentage = Math.min(
    Math.max(burnoutScore * 10, 0),
    100
  );

  /*
   * =========================================================
   * STATUS DESCRIPTION
   * =========================================================
   */

  const getStatusDescription = () => {
    if (burnoutLevel === "High") {
      return "Your assessment indicates a higher burnout risk. Focus on reducing workload pressure, improving recovery, and seeking appropriate support.";
    }

    if (burnoutLevel === "Moderate") {
      return "Your assessment indicates a moderate burnout risk. Small, consistent changes to workload, recovery, and daily habits can help.";
    }

    if (burnoutLevel === "Low") {
      return "Your current assessment indicates a lower burnout risk. Continue maintaining healthy work, recovery, and lifestyle habits.";
    }

    return "Your personalized recommendations are based on the information provided in your burnout assessment.";
  };

  /*
   * =========================================================
   * NO DATA HANDLING
   * =========================================================
   */

  if (!assessmentData || !predictionResult) {
    return (
      <div className="recommendations-page">
        <div className="recommendations-header">
          <div className="recommendations-eyebrow">
            <span className="recommendation-dot"></span>
            PERSONALIZED PLAN
          </div>

          <h1>
            Your recommendations
          </h1>

          <p>
            We need your burnout assessment result before
            generating personalized recommendations.
          </p>

          <div className="recommendation-actions">
            <button
              className="primary-btn"
              onClick={() =>
                navigate("/check-burnout")
              }
            >
              Start Assessment <span>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * DAILY PLAN
   * =========================================================
   */

  const dailyPlan = [
    {
      time: "START",
      title: "Plan your priorities",
      description:
        "Choose your most important tasks before beginning your workday.",
    },
    {
      time: "60–90 MIN",
      title: "Take a short screen break",
      description:
        "Step away from your screen, stretch, move around, or rest your eyes.",
    },
    {
      time: "MIDDAY",
      title: "Reset and recharge",
      description:
        "Take a proper break away from work and allow yourself time to recover.",
    },
    {
      time: "AFTERNOON",
      title: "Check your energy",
      description:
        "Notice your concentration and stress level before taking on more demanding tasks.",
    },
    {
      time: "END",
      title: "Close your workday",
      description:
        "Review unfinished work, set priorities for tomorrow, and disconnect from work.",
    },
    {
      time: "EVENING",
      title: "Protect recovery time",
      description:
        "Spend time on sleep, movement, hobbies, family, friends, or other relaxing activities.",
    },
  ];

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="recommendations-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="recommendations-header">

        <div className="recommendations-eyebrow">
          <span className="recommendation-dot"></span>
          YOUR PERSONALIZED PLAN
        </div>

        <h1>
          Small changes can make a <span>difference.</span>
        </h1>

        <p>
          These suggestions are prioritized according to
          the information provided in your assessment.
          Start with the areas that feel most practical
          for you.
        </p>

        <div className="recommendation-note">
          <span>✦</span>

          <div>
            <strong>
              AI-Powered Recommendations
            </strong>

            <small>
              Your suggestions are generated using your
              assessment responses and predicted burnout
              level.
            </small>
          </div>
        </div>

      </header>


      {/* =====================================================
          STATUS
          ===================================================== */}

      <section className="recommendation-status">

        <div className="status-card">

          <div className="status-icon">
            {burnoutLevel === "High"
              ? "!"
              : burnoutLevel === "Moderate"
              ? "!"
              : "✓"}
          </div>

          <div className="status-content">

            <span className="status-label">
              CURRENT BURNOUT STATUS
            </span>

            <h2>
              {burnoutLevel} Burnout Risk
            </h2>

            <p>
              {getStatusDescription()}
            </p>

          </div>

          <div className="status-score">

            <strong>
              {scorePercentage.toFixed(1)}%
            </strong>

            <span>
              Burnout Score
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          RECOMMENDATIONS
          ===================================================== */}

      <section className="recommendations-section">

        <div className="section-heading">

          <span className="section-label">
            YOUR NEXT STEPS
          </span>

          <h2>
            Recommendations for you
          </h2>

          <p>
            Start with the recommendations that match
            your current work and lifestyle patterns.
            You do not need to change everything at once.
          </p>

        </div>


        <div className="recommendations-grid">

          {recommendations.map(
            (recommendation, index) => (
              <article
                className="recommendation-card"
                key={`${recommendation.title}-${index}`}
              >

                {/* CARD TOP */}

                <div className="recommendation-card-top">

                  <div
                    className={`recommendation-icon ${recommendation.color}`}
                  >
                    {recommendation.icon}
                  </div>

                  <span className="recommendation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>


                {/* CARD CONTENT */}

                <span className="recommendation-category">
                  {recommendation.category}
                </span>

                <h3>
                  {recommendation.title}
                </h3>

                <p>
                  {recommendation.description}
                </p>


                {/* ACTION */}

                <div className="recommendation-action">

                  <span className="action-icon">
                    →
                  </span>

                  <div>
                    <strong>
                      Try this
                    </strong>

                    <span>
                      {recommendation.action}
                    </span>
                  </div>

                </div>

              </article>
            )
          )}

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
                SIMPLE DAILY ROUTINE
              </span>

              <h2>
                A healthier workday
              </h2>

              <p>
                Use this as a flexible guide rather than
                a strict schedule.
              </p>

            </div>

          </div>


          <div className="daily-plan-grid">

            {dailyPlan.map((item, index) => (
              <div
                className="plan-item"
                key={index}
              >

                <span className="plan-time">
                  {item.time}
                </span>

                <div className="plan-line">
                  <span></span>
                </div>

                <div className="plan-content">

                  <strong>
                    {item.title}
                  </strong>

                  <p>
                    {item.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          DISCLAIMER
          ===================================================== */}

      <div className="recommendation-disclaimer">

        <span className="disclaimer-icon">
          i
        </span>

        <div>

          <strong>
            Important note
          </strong>

          <p>
            These recommendations are intended for
            general wellness and early awareness. They
            are not a medical diagnosis or a substitute
            for professional healthcare advice. If
            burnout, stress, anxiety, or low mood is
            significantly affecting your daily life,
            consider speaking with a qualified
            professional.
          </p>

        </div>

      </div>


      {/* =====================================================
          ACTION BUTTONS
          ===================================================== */}

      <div className="recommendation-actions">

        <button
          className="secondary-btn"
          onClick={() =>
            navigate("/result", {
              state: {
                assessmentData,
                result: predictionResult,
              },
            })
          }
        >
          ← Back to Result
        </button>


        <button
          className="primary-btn"
          onClick={() =>
            navigate("/Home")
          }
        >
          Go to Dashboard <span>→</span>
        </button>

      </div>

    </div>
  );
};

export default Recommendations;