import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from "recharts";
import "./History.css";

const API_BASE = "http://127.0.0.1:8000";

function History() {
  const navigate = useNavigate();

  const [historyList, setHistoryList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Detail Modal state
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch history records & summary stats
  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      setError("");

      const [histRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/history?limit=100`),
        fetch(`${API_BASE}/history/stats`)
      ]);

      if (!histRes.ok || !statsRes.ok) {
        throw new Error("Failed to load assessment history from the backend server.");
      }

      const histData = await histRes.json();
      const statsData = await statsRes.json();

      setHistoryList(histData.data || []);
      setStats(statsData.stats || null);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError(
        err.message || "Could not connect to backend server. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  // Delete an individual assessment
  const handleDeleteEntry = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete assessment #${id}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/history/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to delete assessment.");
      }

      // Refresh data
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
      if (selectedDetail && selectedDetail.id === id) {
        setSelectedDetail(null);
      }
      // Re-fetch stats
      const statsRes = await fetch(`${API_BASE}/history/stats`);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }
    } catch (err) {
      alert(err.message || "Failed to delete record.");
    }
  };

  // Clear all history records
  const handleClearAll = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear your entire assessment history? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/history`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to clear history.");
      }

      setHistoryList([]);
      setSelectedDetail(null);
      setStats({
        total_assessments: 0,
        average_score: 0.0,
        average_percentage: 0.0,
        latest_score: null,
        latest_level: null,
        level_distribution: { Low: 0, Moderate: 0, High: 0 },
        trend: "insufficient_data",
        trend_description: "Complete at least two assessments to track your burnout trend over time.",
        timeline: []
      });
    } catch (err) {
      alert(err.message || "Failed to clear history.");
    }
  };

  // View full detail in modal
  const handleViewDetail = async (id) => {
    try {
      setDetailLoading(true);
      const res = await fetch(`${API_BASE}/history/${id}`);
      if (!res.ok) {
        throw new Error("Failed to load assessment details.");
      }
      const data = await res.json();
      setSelectedDetail(data.data);
    } catch (err) {
      alert(err.message || "Could not fetch details.");
    } finally {
      setDetailLoading(false);
    }
  };

  // Format timestamp
  const formatDate = (isoString) => {
    if (!isoString) return "Recent";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  };

  // Format feature name
  const formatFeatureName = (name) => {
    if (!name) return "Contributing Factor";
    return String(name)
      .replace(/^(numerical|categorical|num|cat)__/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Filter history records
  const filteredList = historyList.filter((item) => {
    if (activeFilter === "All") return true;
    return item.burnout_level?.toLowerCase() === activeFilter.toLowerCase();
  });

  // Prepare chart timeline data
  const chartData = (stats?.timeline || []).map((point, index) => {
    const dateObj = new Date(point.created_at);
    const label = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : `#${index + 1}`;

    return {
      name: label,
      score: point.burnout_percentage,
      rawScore: point.burnout_score,
      level: point.burnout_level,
      stress: point.stress_level,
      hours: point.work_hours
    };
  });

  return (
    <div className="history-page">
      {/* Header */}
      <section className="history-header">
        <div className="history-header-content">
          <span className="history-eyebrow">
            <span className="eyebrow-dot"></span>
            LONGITUDINAL WELL-BEING TRACKING
          </span>
          <h1>
            Your Assessment <span>History</span>
          </h1>
          <p>
            Track your burnout score progression, evaluate the impact of work habit
            changes, and inspect AI-explainable insights over time.
          </p>
        </div>

        <div className="history-header-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/check-burnout")}
          >
            + New Assessment
          </button>
          {historyList.length > 0 && (
            <button className="clear-btn" onClick={handleClearAll}>
              Clear History
            </button>
          )}
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="history-loading">
          <div className="spinner"></div>
          <p>Loading your assessment history and analytics...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="history-error-card">
          <div className="error-icon">!</div>
          <div className="error-body">
            <h3>Unable to retrieve history</h3>
            <p>{error}</p>
            <button className="primary-btn" onClick={fetchHistoryData}>
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Content when loaded */}
      {!loading && !error && (
        <>
          {/* Summary Metric Cards */}
          <section className="history-stats-grid">
            <div className="stat-card">
              <span className="stat-label">TOTAL ASSESSMENTS</span>
              <div className="stat-value">{stats?.total_assessments || 0}</div>
              <span className="stat-subtext">Completed evaluations recorded</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">LATEST BURNOUT SCORE</span>
              <div className="stat-value-row">
                <span className="stat-value">
                  {stats?.latest_score !== null
                    ? `${(stats.latest_score * 10).toFixed(1)}%`
                    : "—"}
                </span>
                {stats?.latest_level && (
                  <span
                    className={`risk-badge-sm ${stats.latest_level.toLowerCase()}`}
                  >
                    {stats.latest_level}
                  </span>
                )}
              </div>
              <span className="stat-subtext">Most recent assessment</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">HISTORICAL AVERAGE</span>
              <div className="stat-value">
                {stats?.average_percentage ? `${stats.average_percentage}%` : "—"}
              </div>
              <span className="stat-subtext">Across all recorded evaluations</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">HEALTH TREND</span>
              <div className="stat-trend-row">
                <span
                  className={`trend-indicator ${
                    stats?.trend === "improving"
                      ? "improving"
                      : stats?.trend === "worsening"
                      ? "worsening"
                      : "stable"
                  }`}
                >
                  {stats?.trend === "improving" && "↓ Improving"}
                  {stats?.trend === "worsening" && "↑ Worsening"}
                  {stats?.trend === "stable" && "→ Stable"}
                  {stats?.trend === "insufficient_data" && "• Baseline"}
                </span>
              </div>
              <span className="stat-subtext">
                {stats?.trend_description || "Tracking longitudinal trend"}
              </span>
            </div>
          </section>

          {/* Interactive Trend Chart */}
          {chartData.length > 1 && (
            <section className="history-chart-section">
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <span className="chart-tag">LONGITUDINAL ANALYSIS</span>
                    <h2>Burnout Risk Trajectory</h2>
                    <p>Timeline of your calculated burnout risk score percentage.</p>
                  </div>
                  <div className="chart-legend-pills">
                    <span className="legend-pill low">Low (&lt;35%)</span>
                    <span className="legend-pill moderate">Moderate (35-65%)</span>
                    <span className="legend-pill high">High (&gt;65%)</span>
                  </div>
                </div>

                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="burnoutGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        unit="%"
                      />
                      <ReferenceLine
                        y={35}
                        stroke="#10b981"
                        strokeDasharray="4 4"
                        label={{ value: "Low", fill: "#10b981", fontSize: 11 }}
                      />
                      <ReferenceLine
                        y={65}
                        stroke="#f59e0b"
                        strokeDasharray="4 4"
                        label={{ value: "High", fill: "#f59e0b", fontSize: 11 }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="custom-chart-tooltip">
                                <p className="tooltip-title">{data.name}</p>
                                <p className="tooltip-score">
                                  Burnout Score: <strong>{data.score}%</strong>
                                </p>
                                <p className="tooltip-level">
                                  Level: <strong>{data.level}</strong>
                                </p>
                                <p className="tooltip-stress">
                                  Reported Stress: {data.stress}/10
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fill="url(#burnoutGrad)"
                        activeDot={{ r: 6, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          )}

          {/* Records & Filters */}
          <section className="history-records-section">
            <div className="records-top-bar">
              <div className="filter-group">
                {["All", "High", "Moderate", "Low"].map((filter) => {
                  const count =
                    filter === "All"
                      ? historyList.length
                      : historyList.filter(
                          (item) =>
                            item.burnout_level?.toLowerCase() ===
                            filter.toLowerCase()
                        ).length;

                  return (
                    <button
                      key={filter}
                      className={`filter-btn ${
                        activeFilter === filter ? "active" : ""
                      }`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter} {count > 0 && `(${count})`}
                    </button>
                  );
                })}
              </div>

              <div className="records-count">
                Showing <strong>{filteredList.length}</strong> of{" "}
                {historyList.length} assessments
              </div>
            </div>

            {/* Empty state when no records */}
            {historyList.length === 0 ? (
              <div className="history-empty-card">
                <div className="empty-icon">📊</div>
                <h2>No Assessment History Found</h2>
                <p>
                  You haven't completed any burnout evaluations yet. Complete your first
                  assessment to start tracking your well-being over time.
                </p>
                <button
                  className="primary-btn"
                  onClick={() => navigate("/check-burnout")}
                >
                  Start Assessment Now →
                </button>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="history-empty-card">
                <div className="empty-icon">🔍</div>
                <h3>No assessments match "{activeFilter}"</h3>
                <p>Try selecting a different filter above to view your records.</p>
                <button
                  className="secondary-btn"
                  onClick={() => setActiveFilter("All")}
                >
                  View All Records
                </button>
              </div>
            ) : (
              <div className="history-cards-grid">
                {filteredList.map((item) => {
                  const scorePercent = Math.min(
                    Math.max(item.burnout_score * 10, 0),
                    100
                  );
                  const topDriver =
                    item.top_factors && item.top_factors.length > 0
                      ? item.top_factors[0]
                      : null;

                  return (
                    <div
                      key={item.id}
                      className="history-entry-card"
                      onClick={() => handleViewDetail(item.id)}
                    >
                      <div className="entry-header">
                        <div className="entry-date-block">
                          <span className="entry-date">
                            {formatDate(item.created_at)}
                          </span>
                          <span className="entry-id">ID #{item.id}</span>
                        </div>
                        <span
                          className={`risk-badge ${item.burnout_level?.toLowerCase()}`}
                        >
                          {item.burnout_level} Risk
                        </span>
                      </div>

                      <div className="entry-score-row">
                        <div className="entry-score">
                          <span className="score-num">
                            {scorePercent.toFixed(1)}%
                          </span>
                          <span className="score-label">
                            Burnout Score ({item.burnout_score.toFixed(2)}/10)
                          </span>
                        </div>
                        <div className="score-progress-mini">
                          <div
                            className={`mini-fill ${item.burnout_level?.toLowerCase()}`}
                            style={{ width: `${scorePercent}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="entry-meta-grid">
                        <div className="meta-item">
                          <span className="meta-label">Job Role</span>
                          <span className="meta-val">{item.job_role || "—"}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Work Mode</span>
                          <span className="meta-val">{item.work_mode || "—"}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Hours / Week</span>
                          <span className="meta-val">
                            {item.work_hours_per_week || "—"} hrs
                          </span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Sleep Hours</span>
                          <span className="meta-val">
                            {item.sleep_hours || "—"} hrs
                          </span>
                        </div>
                      </div>

                      {topDriver && (
                        <div className="entry-driver-banner">
                          <span className="driver-label">Primary Driver:</span>
                          <span className="driver-name">
                            {formatFeatureName(topDriver.feature)}
                          </span>
                          <span
                            className={`driver-dir ${
                              topDriver.direction === "increases"
                                ? "inc"
                                : "dec"
                            }`}
                          >
                            {topDriver.direction === "increases" ? "↑ Risk" : "↓ Protection"}
                          </span>
                        </div>
                      )}

                      <div className="entry-actions">
                        <button
                          className="view-detail-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(item.id);
                          }}
                        >
                          View Breakdown →
                        </button>
                        <button
                          className="delete-entry-btn"
                          title="Delete assessment"
                          onClick={(e) => handleDeleteEntry(item.id, e)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}

      {/* DETAIL MODAL */}
      {selectedDetail && (
        <div className="modal-backdrop" onClick={() => setSelectedDetail(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-tag">ASSESSMENT BREAKDOWN</span>
                <h2>Assessment #{selectedDetail.id}</h2>
                <span className="modal-date">
                  Recorded on {formatDate(selectedDetail.created_at)}
                </span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedDetail(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Score summary banner */}
              <div className="modal-score-summary">
                <div>
                  <span className="card-label">BURNOUT RISK SCORE</span>
                  <div className="modal-score-val">
                    {(selectedDetail.burnout_score * 10).toFixed(1)}%
                    <span className="modal-score-sub">
                      ({selectedDetail.burnout_score.toFixed(2)}/10)
                    </span>
                  </div>
                </div>
                <span
                  className={`risk-badge-large ${selectedDetail.burnout_level?.toLowerCase()}`}
                >
                  {selectedDetail.burnout_level} Risk Level
                </span>
              </div>

              {/* SHAP top factors */}
              <div className="modal-factors-section">
                <h3>Key Contributing Factors (Explainable AI)</h3>
                <div className="modal-factors-list">
                  {(selectedDetail.top_factors || []).map((factor, idx) => {
                    const impact = Number(factor.impact || 0);
                    const isInc = factor.direction === "increases";
                    return (
                      <div className="modal-factor-row" key={idx}>
                        <div className="factor-rank">{idx + 1}</div>
                        <div className="factor-detail-body">
                          <div className="factor-name-row">
                            <strong>{formatFeatureName(factor.feature)}</strong>
                            <span className={`factor-pill ${isInc ? "inc" : "dec"}`}>
                              {impact > 0 ? `+${impact.toFixed(3)}` : impact.toFixed(3)}
                            </span>
                          </div>
                          <div className="factor-bar-bg">
                            <div
                              className={`factor-bar-fill ${isInc ? "inc" : "dec"}`}
                              style={{ width: `${Math.min(Math.abs(impact) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assessment inputs snapshot */}
              {selectedDetail.input_data && (
                <div className="modal-inputs-section">
                  <h3>Assessment Snapshot Metrics</h3>
                  <div className="snapshot-grid">
                    <div className="snapshot-box">
                      <span className="box-title">Work Patterns</span>
                      <p><strong>Job Role:</strong> {selectedDetail.input_data.job_role}</p>
                      <p><strong>Work Mode:</strong> {selectedDetail.input_data.work_mode}</p>
                      <p><strong>Hours/Week:</strong> {selectedDetail.input_data.work_hours_per_week} hrs</p>
                      <p><strong>Overtime:</strong> {selectedDetail.input_data.overtime_hours} hrs</p>
                      <p><strong>Meetings/Day:</strong> {selectedDetail.input_data.meetings_per_day}</p>
                    </div>

                    <div className="snapshot-box">
                      <span className="box-title">Lifestyle & Rest</span>
                      <p><strong>Sleep:</strong> {selectedDetail.input_data.sleep_hours} hrs/night</p>
                      <p><strong>Physical Activity:</strong> {selectedDetail.input_data.physical_activity_days} days/wk</p>
                      <p><strong>Screen Time:</strong> {selectedDetail.input_data.screen_time_hours} hrs/day</p>
                      <p><strong>Caffeine:</strong> {selectedDetail.input_data.caffeine_intake} cups/day</p>
                    </div>

                    <div className="snapshot-box">
                      <span className="box-title">Psychological & Support</span>
                      <p><strong>Stress Level:</strong> {selectedDetail.input_data.stress_level}/10</p>
                      <p><strong>Anxiety Score:</strong> {selectedDetail.input_data.anxiety_score}/10</p>
                      <p><strong>Job Satisfaction:</strong> {selectedDetail.input_data.job_satisfaction}/5</p>
                      <p><strong>Manager Support:</strong> {selectedDetail.input_data.manager_support}/5</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="secondary-btn"
                onClick={() => setSelectedDetail(null)}
              >
                Close
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setSelectedDetail(null);
                  navigate("/recommendations", {
                    state: {
                      assessmentData: selectedDetail.input_data,
                      result: {
                        burnout_score: selectedDetail.burnout_score,
                        burnout_level: selectedDetail.burnout_level,
                        top_factors: selectedDetail.top_factors,
                        shap_explanation: selectedDetail.shap_explanation
                      }
                    }
                  });
                }}
              >
                View Recommendations for this Record →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
