
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Coffee,
  Dumbbell,
  Moon,
  Monitor,
  Sparkles,
  Target,
  Timer,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

const Recommendations = () => {
  const location = useLocation();

  /*
   * ---------------------------------------------------------
   * GET PREDICTION DATA
   * ---------------------------------------------------------
   * The page first checks navigation state and then localStorage.
   * This makes the page work whether the user comes here directly
   * from the result page or refreshes the browser.
   */

  const predictionData = useMemo(() => {
    const navigationData = location.state;

    if (navigationData && typeof navigationData === "object") {
      return navigationData;
    }

    try {
      const storedData =
        localStorage.getItem("burnoutResult") ||
        localStorage.getItem("predictionResult") ||
        localStorage.getItem("burnoutPrediction");

      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Unable to read burnout prediction data:", error);
    }

    return {};
  }, [location.state]);

  /*
   * ---------------------------------------------------------
   * NORMALIZE BURNOUT LEVEL
   * ---------------------------------------------------------
   */

  const burnoutLevel = useMemo(() => {
    const level =
      predictionData?.burnout_level ||
      predictionData?.burnoutLevel ||
      predictionData?.level ||
      predictionData?.prediction ||
      "Moderate";

    return String(level).trim().toLowerCase();
  }, [predictionData]);

  const normalizedLevel =
    burnoutLevel === "high"
      ? "High"
      : burnoutLevel === "low"
      ? "Low"
      : "Moderate";

  /*
   * ---------------------------------------------------------
   * SCORE
   * ---------------------------------------------------------
   */

  const burnoutScore = useMemo(() => {
    const possibleScore =
      predictionData?.burnout_score ??
      predictionData?.burnoutScore ??
      predictionData?.score ??
      predictionData?.prediction_score;

    const numericScore = Number(possibleScore);

    if (!Number.isNaN(numericScore)) {
      return Math.round(numericScore * 10) / 10;
    }

    return null;
  }, [predictionData]);

  /*
   * ---------------------------------------------------------
   * RECOMMENDATION DATA
   * ---------------------------------------------------------
   */

  const recommendations = useMemo(() => {
    const commonRecommendations = [
      {
        icon: Timer,
        title: "Take Regular Breaks",
        description:
          "Avoid working continuously for long periods. Take a short break every 45–60 minutes to refresh your mind and reduce mental fatigue.",
        action: "Set a reminder to stand up, stretch, or walk for a few minutes.",
      },
      {
        icon: Monitor,
        title: "Reduce Screen Fatigue",
        description:
          "Extended screen exposure can increase mental and physical fatigue. Give your eyes regular rest during your working day.",
        action:
          "Follow the 20-20-20 rule: every 20 minutes, look at something about 20 feet away for 20 seconds.",
      },
      {
        icon: Moon,
        title: "Prioritize Quality Sleep",
        description:
          "Consistent and sufficient sleep supports concentration, emotional regulation, memory, and recovery from daily workload.",
        action:
          "Maintain a consistent sleep schedule and avoid unnecessary screen use before bedtime.",
      },
      {
        icon: Dumbbell,
        title: "Stay Physically Active",
        description:
          "Regular physical movement can help reduce tension and support overall energy levels during demanding work periods.",
        action:
          "Include walking, stretching, exercise, or another enjoyable physical activity in your routine.",
      },
      {
        icon: Coffee,
        title: "Manage Caffeine Intake",
        description:
          "Caffeine can temporarily improve alertness, but excessive or late-day consumption may interfere with rest and recovery.",
        action:
          "Keep caffeine moderate and avoid relying on it as a replacement for adequate rest.",
      },
      {
        icon: Brain,
        title: "Practice Mental Recovery",
        description:
          "Give your mind time away from work-related tasks. Short periods of relaxation can help reduce cognitive overload.",
        action:
          "Try breathing exercises, mindfulness, music, journaling, or another relaxing activity.",
      },
    ];

    if (normalizedLevel === "High") {
      return [
        {
          icon: HeartPulse,
          title: "Prioritize Your Well-Being",
          description:
            "Your assessment indicates a high burnout risk. Consider reducing unnecessary workload and giving yourself more recovery time.",
          action:
            "Review your current workload and identify tasks that can be postponed, delegated, or simplified.",
          priority: true,
        },
        {
          icon: Timer,
          title: "Increase Break Frequency",
          description:
            "Frequent short breaks can help prevent continuous mental overload when working for extended periods.",
          action:
            "Take short recovery breaks throughout the workday instead of waiting until you feel completely exhausted.",
          priority: true,
        },
        {
          icon: Moon,
          title: "Protect Your Recovery Time",
          description:
            "Rest is an important part of maintaining sustainable productivity. Avoid continuously extending work into your personal recovery time.",
          action:
            "Create a clear stopping point for work and maintain a consistent sleep routine.",
        },
        {
          icon: Brain,
          title: "Use Stress-Management Techniques",
          description:
            "Mental recovery activities can help you transition away from work pressure and manage daily stress.",
          action:
            "Try breathing exercises, mindfulness, journaling, walking, or another calming activity.",
        },
        {
          icon: Dumbbell,
          title: "Add Light Physical Activity",
          description:
            "Movement can help break up long periods of sitting and provide a mental reset during demanding days.",
          action:
            "Add short walks or stretching sessions between longer work periods.",
        },
        {
          icon: Target,
          title: "Consider Professional Support",
          description:
            "If feelings of exhaustion, stress, or reduced functioning continue or interfere with daily life, consider speaking with a qualified mental-health professional.",
          action:
            "Reach out to a trusted professional or appropriate support service if you feel you need additional help.",
          priority: true,
        },
      ];
    }

    if (normalizedLevel === "Low") {
      return [
        {
          icon: CheckCircle2,
          title: "Maintain Your Current Routine",
          description:
            "Your assessment indicates a low burnout risk. Continue the habits that are helping you maintain a healthy work pattern.",
          action:
            "Keep a balanced routine and monitor changes in your energy, workload, and recovery.",
        },
        {
          icon: Timer,
          title: "Keep Taking Breaks",
          description:
            "Regular breaks are useful even when burnout risk is low because they help maintain sustainable productivity.",
          action:
            "Continue taking short breaks throughout your working day.",
        },
        {
          icon: Moon,
          title: "Maintain Healthy Sleep",
          description:
            "Consistent sleep is one of the foundations of physical and mental recovery.",
          action:
            "Keep a regular sleep schedule and make sufficient rest a priority.",
        },
        {
          icon: Dumbbell,
          title: "Stay Active",
          description:
            "Regular movement can support energy, concentration, and overall well-being.",
          action:
            "Continue incorporating physical activity into your daily routine.",
        },
        {
          icon: Brain,
          title: "Monitor Your Stress",
          description:
            "Burnout risk can change over time as workload, sleep, and personal circumstances change.",
          action:
            "Pay attention to persistent changes in mood, motivation, energy, or concentration.",
        },
        {
          icon: Monitor,
          title: "Maintain Healthy Screen Habits",
          description:
            "Balanced screen use can help reduce physical and mental fatigue during digital work.",
          action:
            "Take regular visual breaks and avoid unnecessary screen time when you are finished working.",
        },
      ];
    }

    return commonRecommendations;
  }, [normalizedLevel]);

  /*
   * ---------------------------------------------------------
   * LEVEL INFORMATION
   * ---------------------------------------------------------
   */

  const levelInfo = {
    Low: {
      label: "Low Burnout Risk",
      description:
        "Your current assessment indicates a relatively low level of burnout risk. Continue maintaining healthy work and recovery habits.",
      className: "low",
    },
    Moderate: {
      label: "Moderate Burnout Risk",
      description:
        "Your assessment indicates some signs of burnout risk. Small changes in workload, breaks, sleep, and recovery can help prevent the situation from becoming more serious.",
      className: "moderate",
    },
    High: {
      label: "High Burnout Risk",
      description:
        "Your assessment indicates a high level of burnout risk. Prioritize recovery, manage workload where possible, and consider additional support if these difficulties continue.",
      className: "high",
    },
  };

  const currentLevel = levelInfo[normalizedLevel];

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  return (
    <main className="recommendations-page">
      <div className="recommendations-container">

        {/* -------------------------------------------------
            TOP NAVIGATION
        ------------------------------------------------- */}

        <div className="recommendations-topbar">
          <Link to="/result" className="recommendations-back">
            <ArrowLeft size={18} />
            <span>Back to Results</span>
          </Link>
        </div>

        {/* -------------------------------------------------
            HERO SECTION
        ------------------------------------------------- */}

        <section className="recommendations-hero">
          <div className="recommendations-hero-content">

            <div className="recommendations-eyebrow">
              <Sparkles size={17} />
              <span>Personalized Wellness Plan</span>
            </div>

            <h1>
              Recommendations for
              <span> a Healthier Workday</span>
            </h1>

            <p>
              Based on your burnout assessment, here are practical steps
              designed to help you manage workload, improve recovery, and
              maintain sustainable productivity.
            </p>

          </div>

          <div className="recommendations-hero-icon">
            <Brain size={54} strokeWidth={1.5} />
          </div>
        </section>

        {/* -------------------------------------------------
            RISK SUMMARY
        ------------------------------------------------- */}

        <section className={`recommendations-risk-card ${currentLevel.className}`}>

          <div className="risk-card-left">
            <div className="risk-icon">
              <Target size={24} />
            </div>

            <div>
              <span className="risk-label">Assessment Result</span>

              <h2>{currentLevel.label}</h2>

              <p>{currentLevel.description}</p>
            </div>
          </div>

          {burnoutScore !== null && (
            <div className="risk-score">
              <span>Burnout Score</span>
              <strong>{burnoutScore}</strong>
            </div>
          )}

        </section>

        {/* -------------------------------------------------
            SECTION HEADING
        ------------------------------------------------- */}

        <section className="recommendations-section-heading">
          <div>
            <span className="section-kicker">YOUR ACTION PLAN</span>

            <h2>
              Simple changes that
              <span> make a difference</span>
            </h2>

            <p>
              Start with the recommendations that feel most realistic for
              your current routine. Consistency is more important than trying
              to change everything at once.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------
            RECOMMENDATION CARDS
        ------------------------------------------------- */}

        <section className="recommendations-grid">

          {recommendations.map((recommendation, index) => {
            const Icon = recommendation.icon;

            return (
              <article
                className={`recommendation-card ${
                  recommendation.priority ? "priority" : ""
                }`}
                key={`${recommendation.title}-${index}`}
              >
                {recommendation.priority && (
                  <span className="recommendation-priority">
                    Priority
                  </span>
                )}

                <div className="recommendation-card-icon">
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                <div className="recommendation-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>{recommendation.title}</h3>

                <p className="recommendation-description">
                  {recommendation.description}
                </p>

                <div className="recommendation-action">
                  <span>Suggested action</span>
                  <p>{recommendation.action}</p>
                </div>
              </article>
            );
          })}

        </section>

        {/* -------------------------------------------------
            DAILY ROUTINE
        ------------------------------------------------- */}

        <section className="recommendations-routine">

          <div className="routine-header">
            <div className="routine-icon">
              <Timer size={25} />
            </div>

            <div>
              <span className="section-kicker">A SIMPLE ROUTINE</span>

              <h2>Build a sustainable work rhythm</h2>
            </div>
          </div>

          <div className="routine-grid">

            <div className="routine-step">
              <span>01</span>
              <div>
                <h3>Start with a clear priority</h3>
                <p>
                  Identify the most important task before beginning your
                  workday instead of trying to handle everything at once.
                </p>
              </div>
            </div>

            <div className="routine-step">
              <span>02</span>
              <div>
                <h3>Work in focused intervals</h3>
                <p>
                  Divide longer work sessions into manageable periods and
                  include short recovery breaks.
                </p>
              </div>
            </div>

            <div className="routine-step">
              <span>03</span>
              <div>
                <h3>Disconnect when work ends</h3>
                <p>
                  Give yourself time away from work-related screens and
                  responsibilities to support mental recovery.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* -------------------------------------------------
            FINAL MESSAGE
        ------------------------------------------------- */}

        <section className="recommendations-footer-card">

          <div className="footer-card-icon">
            <HeartPulse size={28} />
          </div>

          <div className="footer-card-content">
            <span className="section-kicker">REMEMBER</span>

            <h2>Productivity should be sustainable.</h2>

            <p>
              Burnout is not something that should be ignored. Use your
              assessment as an early-warning signal and make small,
              consistent changes to your work and recovery routine.
            </p>

            <p className="footer-note">
              This assessment is intended for awareness and wellness guidance,
              not as a medical diagnosis.
            </p>
          </div>

        </section>

        {/* -------------------------------------------------
            BOTTOM ACTIONS
        ------------------------------------------------- */}

        <div className="recommendations-actions">

          <Link to="/result" className="recommendations-secondary-btn">
            <ArrowLeft size={18} />
            View My Results
          </Link>

          <Link to="/assessment" className="recommendations-primary-btn">
            Take Assessment Again
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </main>
  );
};

export default Recommendations;
