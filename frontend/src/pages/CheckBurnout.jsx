import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  BurnoutAI - Check Burnout Assessment

  Dataset-aligned features:
  age
  gender
  job_role
  experience_years
  company_size
  work_mode
  work_hours_per_week
  overtime_hours
  meetings_per_day
  deadlines_missed
  job_satisfaction
  manager_support
  work_life_balance
  sleep_hours
  physical_activity_days
  screen_time_hours
  caffeine_intake
  social_support_score
  has_therapy
  stress_level
  anxiety_score
  depression_score
  seeks_professional_help
*/

function CheckBurnout() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // -----------------------------
    // STEP 1 - PROFILE
    // -----------------------------
    age: "",
    gender: "",
    job_role: "",
    experience_years: "",
    company_size: "",
    work_mode: "",

    // -----------------------------
    // STEP 2 - WORKLOAD
    // -----------------------------
    work_hours_per_week: "",
    overtime_hours: "",
    meetings_per_day: "",
    deadlines_missed: "",
    job_satisfaction: "",
    manager_support: "",
    work_life_balance: "",

    // -----------------------------
    // STEP 3 - LIFESTYLE
    // -----------------------------
    sleep_hours: "",
    physical_activity_days: "",
    screen_time_hours: "",
    caffeine_intake: "",
    social_support_score: "",

    // -----------------------------
    // STEP 4 - WELL-BEING
    // -----------------------------
    has_therapy: "",
    stress_level: "",

    // Anxiety questions
    anxiety_restless: "",
    anxiety_worry: "",
    anxiety_concentration: "",

    // Depression questions
    depression_interest: "",
    depression_energy: "",
    depression_sleep: "",

    seeks_professional_help: "",
  });

  const [errors, setErrors] = useState({});

  // =========================================================
  // GENERAL INPUT HANDLER
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // =========================================================
  // STEP INFORMATION
  // =========================================================

  const steps = [
    {
      number: "01",
      title: "Profile",
    },
    {
      number: "02",
      title: "Workload",
    },
    {
      number: "03",
      title: "Lifestyle",
    },
    {
      number: "04",
      title: "Well-being",
    },
  ];

  const progress = `${step * 25}%`;

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.age) {
        newErrors.age = "Please enter your age.";
      } else if (
        Number(formData.age) < 18 ||
        Number(formData.age) > 100
      ) {
        newErrors.age = "Please enter a valid age between 18 and 100.";
      }

      if (!formData.gender) {
        newErrors.gender = "Please select your gender.";
      }

      if (!formData.job_role) {
        newErrors.job_role = "Please select your job role.";
      }

      if (formData.experience_years === "") {
        newErrors.experience_years =
          "Please enter your years of experience.";
      }

      if (!formData.company_size) {
        newErrors.company_size = "Please select your company size.";
      }

      if (!formData.work_mode) {
        newErrors.work_mode = "Please select your work mode.";
      }
    }

    if (step === 2) {
      if (formData.work_hours_per_week === "") {
        newErrors.work_hours_per_week =
          "Please enter your average weekly work hours.";
      }

      if (formData.overtime_hours === "") {
        newErrors.overtime_hours =
          "Please enter your average overtime hours.";
      }

      if (formData.meetings_per_day === "") {
        newErrors.meetings_per_day =
          "Please enter your average meetings per day.";
      }

      if (formData.deadlines_missed === "") {
        newErrors.deadlines_missed =
          "Please select how often you miss deadlines.";
      }

      if (!formData.job_satisfaction) {
        newErrors.job_satisfaction =
          "Please select your job satisfaction.";
      }

      if (!formData.manager_support) {
        newErrors.manager_support =
          "Please select your level of manager support.";
      }

      if (!formData.work_life_balance) {
        newErrors.work_life_balance =
          "Please select your work-life balance.";
      }
    }

    if (step === 3) {
      if (formData.sleep_hours === "") {
        newErrors.sleep_hours =
          "Please enter your average sleep duration.";
      }

      if (formData.physical_activity_days === "") {
        newErrors.physical_activity_days =
          "Please select your weekly physical activity.";
      }

      if (formData.screen_time_hours === "") {
        newErrors.screen_time_hours =
          "Please enter your approximate daily screen time.";
      }

      if (!formData.caffeine_intake) {
        newErrors.caffeine_intake =
          "Please select your caffeine intake.";
      }

      if (!formData.social_support_score) {
        newErrors.social_support_score =
          "Please select your level of social support.";
      }
    }

    if (step === 4) {
      if (!formData.has_therapy) {
        newErrors.has_therapy =
          "Please select an option.";
      }

      if (!formData.stress_level) {
        newErrors.stress_level =
          "Please select your current stress level.";
      }

      if (!formData.anxiety_restless) {
        newErrors.anxiety_restless =
          "Please answer this question.";
      }

      if (!formData.anxiety_worry) {
        newErrors.anxiety_worry =
          "Please answer this question.";
      }

      if (!formData.anxiety_concentration) {
        newErrors.anxiety_concentration =
          "Please answer this question.";
      }

      if (!formData.depression_interest) {
        newErrors.depression_interest =
          "Please answer this question.";
      }

      if (!formData.depression_energy) {
        newErrors.depression_energy =
          "Please answer this question.";
      }

      if (!formData.depression_sleep) {
        newErrors.depression_sleep =
          "Please answer this question.";
      }

      if (!formData.seeks_professional_help) {
        newErrors.seeks_professional_help =
          "Please select an option.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // ANXIETY SCORE
  // =========================================================

  /*
    The user never directly enters an anxiety score.

    Three simple questions are converted into a 0-10
    behavioural/self-report score.

    This is a project-level proxy score, NOT a clinical diagnosis.
  */

  const calculateAnxietyScore = () => {
    const values = [
      Number(formData.anxiety_restless || 0),
      Number(formData.anxiety_worry || 0),
      Number(formData.anxiety_concentration || 0),
    ];

    const total = values.reduce((sum, value) => sum + value, 0);

    return Number(((total / 12) * 10).toFixed(1));
  };

  // =========================================================
  // DEPRESSION SCORE
  // =========================================================

  /*
    Three well-being questions are converted into a 0-10
    project-level proxy score.

    This is NOT a clinical depression assessment.
  */

  const calculateDepressionScore = () => {
    const values = [
      Number(formData.depression_interest || 0),
      Number(formData.depression_energy || 0),
      Number(formData.depression_sleep || 0),
    ];

    const total = values.reduce((sum, value) => sum + value, 0);

    return Number(((total / 12) * 10).toFixed(1));
  };

  // =========================================================
  // FINAL DATA PREPARATION
  // =========================================================

  const prepareAssessmentData = () => {
    const anxietyScore = calculateAnxietyScore();
    const depressionScore = calculateDepressionScore();

    return {
      // Profile
      age: Number(formData.age),
      gender: formData.gender,
      job_role: formData.job_role,
      experience_years: Number(formData.experience_years),
      company_size: formData.company_size,
      work_mode: formData.work_mode,

      // Workload
      work_hours_per_week: Number(formData.work_hours_per_week),
      overtime_hours: Number(formData.overtime_hours),
      meetings_per_day: Number(formData.meetings_per_day),
      deadlines_missed: Number(formData.deadlines_missed),
      job_satisfaction: Number(formData.job_satisfaction),
      manager_support: Number(formData.manager_support),
      work_life_balance: Number(formData.work_life_balance),

      // Lifestyle
      sleep_hours: Number(formData.sleep_hours),
      physical_activity_days: Number(
        formData.physical_activity_days
      ),
      screen_time_hours: Number(formData.screen_time_hours),
      caffeine_intake: Number(formData.caffeine_intake),
      social_support_score: Number(
        formData.social_support_score
      ),

      // Well-being
      has_therapy: formData.has_therapy,
      stress_level: Number(formData.stress_level),

      // Automatically calculated
      anxiety_score: anxietyScore,
      depression_score: depressionScore,

      seeks_professional_help:
        formData.seeks_professional_help,

      // Keep individual responses too.
      // These can be useful later for explanations.
      anxiety_responses: {
        restless: Number(formData.anxiety_restless),
        worry: Number(formData.anxiety_worry),
        concentration: Number(
          formData.anxiety_concentration
        ),
      },

      depression_responses: {
        interest: Number(formData.depression_interest),
        energy: Number(formData.depression_energy),
        sleep: Number(formData.depression_sleep),
      },
    };
  };

  // =========================================================
  // NEXT
  // =========================================================

  const handleNext = () => {
    if (!validateStep()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setStep((previous) => Math.min(previous + 1, 4));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // PREVIOUS
  // =========================================================

  const handlePrevious = () => {
    setStep((previous) => Math.max(previous - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const assessmentData = prepareAssessmentData();

    console.log("Final Burnout Assessment:", assessmentData);

    /*
      Result page can access the data using:

      const location = useLocation();
      const assessmentData = location.state?.assessmentData;
    */

    navigate("/result", {
      state: {
        assessmentData,
      },
    });
  };

  // =========================================================
  // HELPER
  // =========================================================

  const getError = (field) => {
    return errors[field] ? (
      <small className="field-error">{errors[field]}</small>
    ) : null;
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="assessment-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="assessment-header">

        <div className="assessment-label">
          BURNOUT RISK ASSESSMENT
        </div>

        <h1>
          Understand Your{" "}
          <span>Work &amp; Well-being.</span>
        </h1>

        <p>
          Answer questions about your work patterns, workload,
          lifestyle and recovery habits. Your responses will be
          analyzed to estimate your current burnout risk.
        </p>

        <div className="assessment-highlights">

          <div className="highlight-item">
            <div className="highlight-icon">◷</div>
            <div>
              <strong>3–5 minutes</strong>
              <span>Estimated time</span>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon">✓</div>
            <div>
              <strong>Private</strong>
              <span>Your responses are protected</span>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon">✦</div>
            <div>
              <strong>AI-powered</strong>
              <span>Machine learning analysis</span>
            </div>
          </div>

        </div>

      </header>


      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <section className="assessment-progress">

        <div className="progress-top">

          <div>
            <span className="progress-label">
              Assessment Progress
            </span>

            <strong>
              Step {step} of 4
            </strong>
          </div>

          <strong className="progress-percentage">
            {progress}
          </strong>

        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: progress }}
          ></div>
        </div>

        <div className="progress-steps">

          {steps.map((item, index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={item.number}
                className={`progress-step ${
                  stepNumber === step
                    ? "active"
                    : stepNumber < step
                    ? "completed"
                    : ""
                }`}
              >
                <span>{item.number}</span>
                <strong>{item.title}</strong>
              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          FORM
      ===================================================== */}

      <main className="assessment-container">

        <form onSubmit={handleSubmit}>

          {/* =================================================
              STEP 1 - PROFILE
          ================================================= */}

          {step === 1 && (
            <section className="assessment-card">

              <div className="card-heading">

                <div className="step-badge">
                  01
                </div>

                <div>
                  <span className="section-label">
                    PERSONAL &amp; WORK PROFILE
                  </span>

                  <h2>
                    Tell us about your work environment.
                  </h2>

                  <p>
                    These details help the system understand
                    your professional context.
                  </p>
                </div>

              </div>

              <div className="form-divider"></div>


              <div className="form-grid">

                {/* AGE */}

                <div className="form-group">
                  <label htmlFor="age">
                    Age<span>*</span>
                  </label>

                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 25"
                  />

                  <small>
                    Enter your current age.
                  </small>

                  {getError("age")}
                </div>


                {/* GENDER */}

                <div className="form-group">
                  <label htmlFor="gender">
                    Gender<span>*</span>
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                  {getError("gender")}
                </div>


                {/* JOB ROLE */}

                <div className="form-group">
                  <label htmlFor="job_role">
                    Job Role<span>*</span>
                  </label>

                  <select
                    id="job_role"
                    name="job_role"
                    value={formData.job_role}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select your role
                    </option>

                    <option value="Software Engineer">
                      Software Engineer
                    </option>

                    <option value="Developer">
                      Developer
                    </option>

                    <option value="Data Scientist">
                      Data Scientist
                    </option>

                    <option value="Data Analyst">
                      Data Analyst
                    </option>

                    <option value="Manager">
                      Manager
                    </option>

                    <option value="Team Lead">
                      Team Lead
                    </option>

                    <option value="Designer">
                      Designer
                    </option>

                    <option value="Consultant">
                      Consultant
                    </option>

                    <option value="Teacher">
                      Teacher
                    </option>

                    <option value="Healthcare Professional">
                      Healthcare Professional
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                  {getError("job_role")}
                </div>


                {/* EXPERIENCE */}

                <div className="form-group">
                  <label htmlFor="experience_years">
                    Years of Experience<span>*</span>
                  </label>

                  <input
                    id="experience_years"
                    type="number"
                    name="experience_years"
                    min="0"
                    max="50"
                    step="0.5"
                    value={formData.experience_years}
                    onChange={handleChange}
                    placeholder="e.g. 3.5"
                  />

                  {getError("experience_years")}
                </div>


                {/* COMPANY SIZE */}

                <div className="form-group">
                  <label htmlFor="company_size">
                    Company Size<span>*</span>
                  </label>

                  <select
                    id="company_size"
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select company size
                    </option>

                    <option value="Small">
                      Small
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Large">
                      Large
                    </option>

                  </select>

                  {getError("company_size")}
                </div>


                {/* WORK MODE */}

                <div className="form-group">
                  <label htmlFor="work_mode">
                    Work Mode<span>*</span>
                  </label>

                  <select
                    id="work_mode"
                    name="work_mode"
                    value={formData.work_mode}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select work mode
                    </option>

                    <option value="On-site">
                      On-site
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>

                    <option value="Remote">
                      Remote
                    </option>

                  </select>

                  {getError("work_mode")}
                </div>

              </div>

            </section>
          )}


          {/* =================================================
              STEP 2 - WORKLOAD
          ================================================= */}

          {step === 2 && (
            <section className="assessment-card">

              <div className="card-heading">

                <div className="step-badge">
                  02
                </div>

                <div>
                  <span className="section-label">
                    WORKLOAD &amp; WORK PRESSURE
                  </span>

                  <h2>
                    How does your typical workload look?
                  </h2>

                  <p>
                    Workload, deadlines and workplace support
                    are important indicators of burnout risk.
                  </p>
                </div>

              </div>

              <div className="form-divider"></div>


              <div className="form-grid">

                {/* WORK HOURS */}

                <div className="form-group">
                  <label htmlFor="work_hours_per_week">
                    Work Hours per Week<span>*</span>
                  </label>

                  <input
                    id="work_hours_per_week"
                    type="number"
                    name="work_hours_per_week"
                    min="20"
                    max="100"
                    value={formData.work_hours_per_week}
                    onChange={handleChange}
                    placeholder="e.g. 45"
                  />

                  <small>
                    Include your normal working hours.
                  </small>

                  {getError("work_hours_per_week")}
                </div>


                {/* OVERTIME */}

                <div className="form-group">
                  <label htmlFor="overtime_hours">
                    Overtime Hours per Week<span>*</span>
                  </label>

                  <input
                    id="overtime_hours"
                    type="number"
                    name="overtime_hours"
                    min="0"
                    max="50"
                    value={formData.overtime_hours}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                  />

                  {getError("overtime_hours")}
                </div>


                {/* MEETINGS */}

                <div className="form-group">
                  <label htmlFor="meetings_per_day">
                    Meetings per Day<span>*</span>
                  </label>

                  <input
                    id="meetings_per_day"
                    type="number"
                    name="meetings_per_day"
                    min="0"
                    max="20"
                    value={formData.meetings_per_day}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                  />

                  {getError("meetings_per_day")}
                </div>


                {/* DEADLINES */}

                <div className="form-group">
                  <label htmlFor="deadlines_missed">
                    How often do you miss deadlines?<span>*</span>
                  </label>

                  <select
                    id="deadlines_missed"
                    name="deadlines_missed"
                    value={formData.deadlines_missed}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select frequency
                    </option>

                    <option value="0">
                      Never
                    </option>

                    <option value="1">
                      Rarely
                    </option>

                    <option value="2">
                      Sometimes
                    </option>

                    <option value="3">
                      Often
                    </option>

                    <option value="4">
                      Very often
                    </option>

                  </select>

                  {getError("deadlines_missed")}
                </div>


                {/* JOB SATISFACTION */}

                <div className="form-group">
                  <label htmlFor="job_satisfaction">
                    How satisfied are you with your work?<span>*</span>
                  </label>

                  <select
                    id="job_satisfaction"
                    name="job_satisfaction"
                    value={formData.job_satisfaction}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select satisfaction
                    </option>

                    <option value="1">
                      Very dissatisfied
                    </option>

                    <option value="2">
                      Dissatisfied
                    </option>

                    <option value="3">
                      Neutral
                    </option>

                    <option value="4">
                      Satisfied
                    </option>

                    <option value="5">
                      Very satisfied
                    </option>

                  </select>

                  {getError("job_satisfaction")}
                </div>


                {/* MANAGER SUPPORT */}

                <div className="form-group">
                  <label htmlFor="manager_support">
                    How supported do you feel by your manager?<span>*</span>
                  </label>

                  <select
                    id="manager_support"
                    name="manager_support"
                    value={formData.manager_support}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select support level
                    </option>

                    <option value="1">
                      Not supported
                    </option>

                    <option value="2">
                      Slightly supported
                    </option>

                    <option value="3">
                      Moderately supported
                    </option>

                    <option value="4">
                      Well supported
                    </option>

                    <option value="5">
                      Very well supported
                    </option>

                  </select>

                  {getError("manager_support")}
                </div>


                {/* WORK LIFE BALANCE */}

                <div className="form-group form-group-full">
                  <label htmlFor="work_life_balance">
                    How would you rate your work-life balance?<span>*</span>
                  </label>

                  <select
                    id="work_life_balance"
                    name="work_life_balance"
                    value={formData.work_life_balance}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select your work-life balance
                    </option>

                    <option value="1">
                      Very poor
                    </option>

                    <option value="2">
                      Poor
                    </option>

                    <option value="3">
                      Average
                    </option>

                    <option value="4">
                      Good
                    </option>

                    <option value="5">
                      Excellent
                    </option>

                  </select>

                  {getError("work_life_balance")}
                </div>

              </div>

            </section>
          )}


          {/* =================================================
              STEP 3 - LIFESTYLE
          ================================================= */}

          {step === 3 && (
            <section className="assessment-card">

              <div className="card-heading">

                <div className="step-badge">
                  03
                </div>

                <div>
                  <span className="section-label">
                    LIFESTYLE &amp; RECOVERY
                  </span>

                  <h2>
                    How are your daily recovery habits?
                  </h2>

                  <p>
                    Sleep, physical activity, screen exposure,
                    caffeine and social support can influence
                    your overall well-being.
                  </p>
                </div>

              </div>

              <div className="form-divider"></div>


              <div className="form-grid">

                {/* SLEEP */}

                <div className="form-group">
                  <label htmlFor="sleep_hours">
                    Average Sleep per Night<span>*</span>
                  </label>

                  <input
                    id="sleep_hours"
                    type="number"
                    name="sleep_hours"
                    min="2"
                    max="14"
                    step="0.5"
                    value={formData.sleep_hours}
                    onChange={handleChange}
                    placeholder="e.g. 7"
                  />

                  <small>
                    Approximate hours of sleep on a typical night.
                  </small>

                  {getError("sleep_hours")}
                </div>


                {/* PHYSICAL ACTIVITY */}

                <div className="form-group">
                  <label htmlFor="physical_activity_days">
                    Physical Activity per Week<span>*</span>
                  </label>

                  <select
                    id="physical_activity_days"
                    name="physical_activity_days"
                    value={formData.physical_activity_days}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select days per week
                    </option>

                    <option value="0">
                      0 days
                    </option>

                    <option value="1">
                      1 day
                    </option>

                    <option value="2">
                      2 days
                    </option>

                    <option value="3">
                      3 days
                    </option>

                    <option value="4">
                      4 days
                    </option>

                    <option value="5">
                      5 days
                    </option>

                    <option value="6">
                      6 days
                    </option>

                    <option value="7">
                      7 days
                    </option>

                  </select>

                  {getError("physical_activity_days")}
                </div>


                {/* SCREEN TIME */}

                <div className="form-group">
                  <label htmlFor="screen_time_hours">
                    Daily Screen Time<span>*</span>
                  </label>

                  <input
                    id="screen_time_hours"
                    type="number"
                    name="screen_time_hours"
                    min="0"
                    max="24"
                    step="0.5"
                    value={formData.screen_time_hours}
                    onChange={handleChange}
                    placeholder="e.g. 8"
                  />

                  <small>
                    Include work and other digital-device use.
                  </small>

                  {getError("screen_time_hours")}
                </div>


                {/* CAFFEINE */}

                <div className="form-group">
                  <label htmlFor="caffeine_intake">
                    Caffeine Intake per Day<span>*</span>
                  </label>

                  <select
                    id="caffeine_intake"
                    name="caffeine_intake"
                    value={formData.caffeine_intake}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select intake
                    </option>

                    <option value="0">
                      None
                    </option>

                    <option value="1">
                      1 serving
                    </option>

                    <option value="2">
                      2 servings
                    </option>

                    <option value="3">
                      3 servings
                    </option>

                    <option value="4">
                      4 or more servings
                    </option>

                  </select>

                  {getError("caffeine_intake")}
                </div>


                {/* SOCIAL SUPPORT */}

                <div className="form-group form-group-full">
                  <label htmlFor="social_support_score">
                    How strong is your social support?<span>*</span>
                  </label>

                  <select
                    id="social_support_score"
                    name="social_support_score"
                    value={formData.social_support_score}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select support level
                    </option>

                    <option value="1">
                      Very low
                    </option>

                    <option value="2">
                      Low
                    </option>

                    <option value="3">
                      Moderate
                    </option>

                    <option value="4">
                      Strong
                    </option>

                    <option value="5">
                      Very strong
                    </option>

                  </select>

                  <small>
                    Think about whether you have people you can
                    talk to or rely on when things become difficult.
                  </small>

                  {getError("social_support_score")}
                </div>

              </div>

            </section>
          )}


          {/* =================================================
              STEP 4 - WELL-BEING
          ================================================= */}

          {step === 4 && (
            <section className="assessment-card">

              <div className="card-heading">

                <div className="step-badge wellbeing-badge">
                  04
                </div>

                <div>
                  <span className="section-label">
                    WELL-BEING INDICATORS
                  </span>

                  <h2>
                    How have you been feeling recently?
                  </h2>

                  <p>
                    These final questions help the system understand
                    your current stress and well-being patterns.
                  </p>
                </div>

              </div>

              <div className="form-divider"></div>


              <div className="form-grid">

                {/* =================================================
                    THERAPY
                ================================================= */}

                <div className="form-group">
                  <label htmlFor="has_therapy">
                    Have you previously received counseling or therapy?
                    <span>*</span>
                  </label>

                  <select
                    id="has_therapy"
                    name="has_therapy"
                    value={formData.has_therapy}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select option
                    </option>

                    <option value="Yes">
                      Yes
                    </option>

                    <option value="No">
                      No
                    </option>

                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>

                  </select>

                  <small>
                    This refers to professional counseling or
                    therapy for emotional or well-being concerns.
                  </small>

                  {getError("has_therapy")}
                </div>


                {/* =================================================
                    STRESS
                ================================================= */}

                <div className="form-group">
                  <label htmlFor="stress_level">
                    How would you describe your current stress level?
                    <span>*</span>
                  </label>

                  <select
                    id="stress_level"
                    name="stress_level"
                    value={formData.stress_level}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select stress level
                    </option>

                    <option value="1">
                      Very low
                    </option>

                    <option value="2">
                      Low
                    </option>

                    <option value="3">
                      Moderate
                    </option>

                    <option value="4">
                      High
                    </option>

                    <option value="5">
                      Very high
                    </option>

                  </select>

                  {getError("stress_level")}
                </div>


                {/* =================================================
                    ANXIETY
                ================================================= */}

                <div className="wellbeing-question-group form-group-full">

                  <div className="question-group-heading">

                    <span className="question-group-number">
                      A
                    </span>

                    <div>
                      <h3>
                        Recent feelings of tension or worry
                      </h3>

                      <p>
                        Think about your experience during the
                        past few weeks.
                      </p>
                    </div>

                  </div>


                  {/* RESTLESS */}

                  <div className="scale-question">

                    <label>
                      How often have you felt restless or unable
                      to relax?
                      <span>*</span>
                    </label>

                    <div className="option-row">

                      {[
                        ["1", "Never"],
                        ["2", "Rarely"],
                        ["3", "Sometimes"],
                        ["4", "Often"],
                        ["5", "Very often"],
                      ].map(([value, label]) => (
                        <label
                          className="choice-card"
                          key={value}
                        >
                          <input
                            type="radio"
                            name="anxiety_restless"
                            value={value}
                            checked={
                              formData.anxiety_restless === value
                            }
                            onChange={handleChange}
                          />

                          <span>{label}</span>
                        </label>
                      ))}

                    </div>

                    {getError("anxiety_restless")}

                  </div>


                  {/* WORRY */}

                  <div className="scale-question">

                    <label>
                      How often have you found it difficult to
                      stop worrying about work or everyday matters?
                      <span>*</span>
                    </label>

                    <div className="option-row">

                      {[
                        ["1", "Never"],
                        ["2", "Rarely"],
                        ["3", "Sometimes"],
                        ["4", "Often"],
                        ["5", "Very often"],
                      ].map(([value, label]) => (
                        <label
                          className="choice-card"
                          key={value}
                        >
                          <input
                            type="radio"
                            name="anxiety_worry"
                            value={value}
                            checked={
                              formData.anxiety_worry === value
                            }
                            onChange={handleChange}
                          />

                          <span>{label}</span>
                        </label>
                      ))}

                    </div>

                    {getError("anxiety_worry")}

                  </div>


                  {/* CONCENTRATION */}

                  <div className="scale-question">

                    <label>
                      How often has stress or worry made it difficult
                      to concentrate on your tasks?
                      <span>*</span>
                    </label>

                    <div className="option-row">

                      {[
                        ["1", "Never"],
                        ["2", "Rarely"],
                        ["3", "Sometimes"],
                        ["4", "Often"],
                        ["5", "Very often"],
                      ].map(([value, label]) => (
                        <label
                          className="choice-card"
                          key={value}
                        >
                          <input
                            type="radio"
                            name="anxiety_concentration"
                            value={value}
                            checked={
                              formData.anxiety_concentration === value
                            }
                            onChange={handleChange}
                          />

                          <span>{label}</span>
                        </label>
                      ))}

                    </div>

                    {getError("anxiety_concentration")}

                  </div>

                </div>


                {/* =================================================
                    DEPRESSION / LOW WELL-BEING
                ================================================= */}

                <div className="wellbeing-question-group form-group-full">

                  <div className="question-group-heading">

                    <span className="question-group-number">
                      B
                    </span>

                    <div>
                      <h3>
                        Energy, interest and daily well-being
                      </h3>

                      <p>
                        These questions help estimate changes in
                        everyday mood and functioning.
                      </p>

                    </div>

                  </div>


                  {/* INTEREST */}

                  <div className="scale-question">

                    <label>
                      How often have you had less interest or enjoyment
                      in activities you normally like?
                      <span>*</span>
                    </label>

                    <div className="option-row">

                      {[
                        ["1", "Never"],
                        ["2", "Rarely"],
                        ["3", "Sometimes"],
                        ["4", "Often"],
                        ["5", "Very often"],
                      ].map(([value, label]) => (
                        <label
                          className="choice-card"
                          key={value}
                        >
                          <input
                            type="radio"
                            name="depression_interest"
                            value={value}
                            checked={
                              formData.depression_interest === value
                            }
                            onChange={handleChange}
                          />

                          <span>{label}</span>
                        </label>
                      ))}

                    </div>

                    {getError("depression_interest")}

                  </div>


                  {/* ENERGY */}

                  <div className="scale-question">

                    <label>
                      How often have you felt unusually tired or
                      low on energy during the day?
                      <span>*</span>
                    </label>

                    <div className="option-row">

                      {[
                        ["1", "Never"],
                        ["2", "Rarely"],
                        ["3", "Sometimes"],
                        ["4", "Often"],
                        ["5", "Very often"],
                      ].map(([value, label]) => (
                        <label
                          className="choice-card"
                          key={value}
                        >
                          <input
                            type="radio"
                            name="depression_energy"
                            value={value}
                            checked={
                              formData.depression_energy === value
                            }
                            onChange={handleChange}
                          />

                          <span>{label}</span>
                        </label>
                      ))}

                    </div>

                    {getError("depression_energy")}

                  </div>


                  {/* SLEEP / RECOVERY */}

                  <div className="scale-question">

                    <label>
                      How often has poor or disturbed sleep affected
                      your daytime functioning?
                      <span>*</span>
                    </label>

                    <div className="option-row">

                      {[
                        ["1", "Never"],
                        ["2", "Rarely"],
                        ["3", "Sometimes"],
                        ["4", "Often"],
                        ["5", "Very often"],
                      ].map(([value, label]) => (
                        <label
                          className="choice-card"
                          key={value}
                        >
                          <input
                            type="radio"
                            name="depression_sleep"
                            value={value}
                            checked={
                              formData.depression_sleep === value
                            }
                            onChange={handleChange}
                          />

                          <span>{label}</span>
                        </label>
                      ))}

                    </div>

                    {getError("depression_sleep")}

                  </div>

                </div>


                {/* =================================================
                    PROFESSIONAL SUPPORT
                ================================================= */}

                <div className="form-group form-group-full">

                  <label htmlFor="seeks_professional_help">
                    If stress or burnout begins affecting your daily
                    life, would you consider speaking with a qualified
                    professional for support?<span>*</span>
                  </label>

                  <select
                    id="seeks_professional_help"
                    name="seeks_professional_help"
                    value={formData.seeks_professional_help}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select option
                    </option>

                    <option value="Yes">
                      Yes
                    </option>

                    <option value="Maybe">
                      Maybe, depending on the situation
                    </option>

                    <option value="No">
                      No
                    </option>

                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>

                  </select>

                  <small>
                    By professional support, we mean a qualified
                    mental-health or well-being professional such
                    as a counselor, psychologist, or psychiatrist.
                  </small>

                  {getError("seeks_professional_help")}

                </div>


                {/* =================================================
                    PRIVACY NOTICE
                ================================================= */}

                <div className="privacy-notice form-group-full">

                  <div className="privacy-icon">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Your information is protected
                    </strong>

                    <p>
                      Your responses are used for the burnout
                      risk assessment. The generated prediction
                      is an AI-based estimate and should not be
                      considered a medical diagnosis.
                    </p>

                  </div>

                </div>

              </div>

            </section>
          )}


          {/* =====================================================
              NAVIGATION
          ===================================================== */}

          <div className="assessment-navigation">

            {step > 1 ? (
              <button
                type="button"
                className="secondary-btn assessment-back-btn"
                onClick={handlePrevious}
              >
                <span>←</span>
                Previous
              </button>
            ) : (
              <div></div>
            )}


            {step < 4 ? (
              <button
                type="button"
                className="primary-btn assessment-next-btn"
                onClick={handleNext}
              >
                Continue
                <span>→</span>
              </button>
            ) : (
              <button
                type="submit"
                className="primary-btn assessment-submit-btn"
              >
                Analyze My Burnout Risk
                <span>→</span>
              </button>
            )}

          </div>

        </form>

      </main>

    </div>
  );
}

export default CheckBurnout;