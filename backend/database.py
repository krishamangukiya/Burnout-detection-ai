"""
Database layer for Burnout Detection AI - Assessment History
File: backend/database.py
Uses SQLite with standard library sqlite3 for zero-dependency, robust persistence.
"""

import sqlite3
import json
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_PATH = Path(__file__).resolve().parent / "burnout_history.db"


def get_connection() -> sqlite3.Connection:
    """Create a database connection with row factory enabled."""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Initialize database tables and indexes."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS assessment_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                user_name TEXT DEFAULT 'Anonymous',
                burnout_score REAL NOT NULL,
                burnout_level TEXT NOT NULL,
                job_role TEXT,
                work_mode TEXT,
                work_hours_per_week REAL,
                stress_level REAL,
                sleep_hours REAL,
                top_factors TEXT,
                shap_explanation TEXT,
                input_data TEXT
            );
        """)
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_history_created_at
            ON assessment_history (created_at DESC);
        """)
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_history_burnout_level
            ON assessment_history (burnout_level);
        """)
        conn.commit()


def save_assessment(
    input_data: Dict[str, Any],
    prediction_result: Dict[str, Any],
    user_name: str = "Anonymous"
) -> int:
    """Save an assessment and its ML prediction result into history."""
    created_at = datetime.now().isoformat()
    burnout_score = float(prediction_result.get("burnout_score", 0.0))
    burnout_level = str(prediction_result.get("burnout_level", "Unknown"))
    
    job_role = str(input_data.get("job_role", "Unknown"))
    work_mode = str(input_data.get("work_mode", "Unknown"))
    work_hours = float(input_data.get("work_hours_per_week", 0.0))
    stress_level = float(input_data.get("stress_level", 0.0))
    sleep_hours = float(input_data.get("sleep_hours", 0.0))
    
    top_factors_json = json.dumps(prediction_result.get("top_factors", []))
    shap_json = json.dumps(prediction_result.get("shap_explanation", []))
    input_data_json = json.dumps(input_data)

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO assessment_history (
                created_at, user_name, burnout_score, burnout_level,
                job_role, work_mode, work_hours_per_week,
                stress_level, sleep_hours,
                top_factors, shap_explanation, input_data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            created_at, user_name, burnout_score, burnout_level,
            job_role, work_mode, work_hours,
            stress_level, sleep_hours,
            top_factors_json, shap_json, input_data_json
        ))
        conn.commit()
        return cursor.lastrowid


def _row_to_dict(row: sqlite3.Row, include_details: bool = True) -> Dict[str, Any]:
    """Convert an SQLite row into a clean serializable dictionary."""
    data = {
        "id": row["id"],
        "created_at": row["created_at"],
        "user_name": row["user_name"],
        "burnout_score": row["burnout_score"],
        "burnout_level": row["burnout_level"],
        "job_role": row["job_role"],
        "work_mode": row["work_mode"],
        "work_hours_per_week": row["work_hours_per_week"],
        "stress_level": row["stress_level"],
        "sleep_hours": row["sleep_hours"],
    }

    try:
        data["top_factors"] = json.loads(row["top_factors"]) if row["top_factors"] else []
    except Exception:
        data["top_factors"] = []

    if include_details:
        try:
            data["shap_explanation"] = json.loads(row["shap_explanation"]) if row["shap_explanation"] else []
        except Exception:
            data["shap_explanation"] = []

        try:
            data["input_data"] = json.loads(row["input_data"]) if row["input_data"] else {}
        except Exception:
            data["input_data"] = {}

    return data


def get_all_assessments(
    limit: int = 100,
    offset: int = 0,
    level: Optional[str] = None
) -> List[Dict[str, Any]]:
    """Retrieve historical assessments sorted from newest to oldest."""
    with get_connection() as conn:
        cursor = conn.cursor()
        if level and level.lower() != "all":
            cursor.execute("""
                SELECT * FROM assessment_history
                WHERE LOWER(burnout_level) = LOWER(?)
                ORDER BY created_at DESC, id DESC
                LIMIT ? OFFSET ?
            """, (level, limit, offset))
        else:
            cursor.execute("""
                SELECT * FROM assessment_history
                ORDER BY created_at DESC, id DESC
                LIMIT ? OFFSET ?
            """, (limit, offset))
        
        rows = cursor.fetchall()
        return [_row_to_dict(row, include_details=False) for row in rows]


def get_assessment_by_id(assessment_id: int) -> Optional[Dict[str, Any]]:
    """Retrieve full assessment details by ID."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM assessment_history WHERE id = ?", (assessment_id,))
        row = cursor.fetchone()
        if row:
            return _row_to_dict(row, include_details=True)
        return None


def delete_assessment_by_id(assessment_id: int) -> bool:
    """Delete an assessment by ID. Returns True if row was deleted."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM assessment_history WHERE id = ?", (assessment_id,))
        conn.commit()
        return cursor.rowcount > 0


def clear_all_assessments() -> int:
    """Clear all records from assessment history."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM assessment_history")
        conn.commit()
        return cursor.rowcount


def get_assessment_stats() -> Dict[str, Any]:
    """Compute summary metrics and trends across user assessment history."""
    with get_connection() as conn:
        cursor = conn.cursor()
        
        # Overall aggregates
        cursor.execute("""
            SELECT 
                COUNT(*) as total_count,
                AVG(burnout_score) as avg_score,
                MIN(burnout_score) as min_score,
                MAX(burnout_score) as max_score
            FROM assessment_history
        """)
        agg = cursor.fetchone()
        total_count = agg["total_count"] or 0
        avg_score = round(float(agg["avg_score"]), 2) if agg["avg_score"] is not None else 0.0
        min_score = round(float(agg["min_score"]), 2) if agg["min_score"] is not None else 0.0
        max_score = round(float(agg["max_score"]), 2) if agg["max_score"] is not None else 0.0

        # Count by level
        cursor.execute("""
            SELECT burnout_level, COUNT(*) as cnt
            FROM assessment_history
            GROUP BY burnout_level
        """)
        level_counts = {"Low": 0, "Moderate": 0, "High": 0}
        for r in cursor.fetchall():
            lvl = r["burnout_level"]
            if lvl in level_counts:
                level_counts[lvl] = r["cnt"]

        # Trend analysis (compare latest score to average of prior scores)
        cursor.execute("""
            SELECT burnout_score, burnout_level, created_at
            FROM assessment_history
            ORDER BY created_at DESC, id DESC
            LIMIT 5
        """)
        recent_rows = cursor.fetchall()
        
        latest_score = None
        latest_level = None
        trend = "insufficient_data"
        trend_description = "Complete at least two assessments to track your burnout trend over time."

        if recent_rows:
            latest_score = round(float(recent_rows[0]["burnout_score"]), 2)
            latest_level = recent_rows[0]["burnout_level"]

            if len(recent_rows) >= 2:
                prev_scores = [float(r["burnout_score"]) for r in recent_rows[1:]]
                prev_avg = sum(prev_scores) / len(prev_scores)
                diff = latest_score - prev_avg

                if diff <= -0.5:
                    trend = "improving"
                    trend_description = f"Burnout risk decreased by {abs(round(diff, 2))} pts compared to recent assessments."
                elif diff >= 0.5:
                    trend = "worsening"
                    trend_description = f"Burnout risk increased by {round(diff, 2)} pts compared to recent assessments."
                else:
                    trend = "stable"
                    trend_description = "Burnout risk has remained relatively stable across recent assessments."

        # Timeline data for charts (chronological order)
        cursor.execute("""
            SELECT id, created_at, burnout_score, burnout_level, stress_level, work_hours_per_week
            FROM assessment_history
            ORDER BY created_at ASC, id ASC
            LIMIT 30
        """)
        timeline_rows = cursor.fetchall()
        timeline = [
            {
                "id": r["id"],
                "created_at": r["created_at"],
                "burnout_score": round(float(r["burnout_score"]), 2),
                "burnout_percentage": round(min(max(float(r["burnout_score"]) * 10, 0), 100), 1),
                "burnout_level": r["burnout_level"],
                "stress_level": r["stress_level"],
                "work_hours": r["work_hours_per_week"]
            }
            for r in timeline_rows
        ]

        return {
            "total_assessments": total_count,
            "average_score": avg_score,
            "average_percentage": round(min(max(avg_score * 10, 0), 100), 1),
            "min_score": min_score,
            "max_score": max_score,
            "latest_score": latest_score,
            "latest_level": latest_level,
            "level_distribution": level_counts,
            "trend": trend,
            "trend_description": trend_description,
            "timeline": timeline
        }


# Auto-initialize database schema on module load
init_db()
