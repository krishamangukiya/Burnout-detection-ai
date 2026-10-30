from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
from typing import Optional, List, Dict, Any
import importlib.util
import sys
import traceback

# ============================================================
# 1. PROJECT PATHS & IMPORTS
# ============================================================

# Project root: Burnout-detection-ai
BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = Path(__file__).resolve().parent
ML_DIR = BASE_DIR / "ml"
PREDICT_FILE = ML_DIR / "predict.py"

# Ensure backend and ml folders are in sys.path
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))
if str(ML_DIR) not in sys.path:
    sys.path.insert(0, str(ML_DIR))

# Import Database module
try:
    from database import (
        save_assessment,
        get_all_assessments,
        get_assessment_by_id,
        delete_assessment_by_id,
        clear_all_assessments,
        get_assessment_stats
    )
except ImportError:
    from backend.database import (
        save_assessment,
        get_all_assessments,
        get_assessment_by_id,
        delete_assessment_by_id,
        clear_all_assessments,
        get_assessment_stats
    )

# ============================================================
# 2. IMPORT PREDICTION FUNCTION
# ============================================================

if not PREDICT_FILE.exists():
    raise FileNotFoundError(
        f"predict.py was not found at: {PREDICT_FILE}\n"
        "Please check the location of your predict.py file."
    )

# Load predict.py directly using its absolute path
spec = importlib.util.spec_from_file_location(
    "burnout_predict",
    PREDICT_FILE
)

if spec is None or spec.loader is None:
    raise ImportError(
        f"Could not load prediction module: {PREDICT_FILE}"
    )

predict_module = importlib.util.module_from_spec(spec)
sys.modules["burnout_predict"] = predict_module

try:
    spec.loader.exec_module(predict_module)
    predict_burnout = predict_module.predict_burnout
except Exception as e:
    raise RuntimeError(
        f"Failed to load predict_burnout from {PREDICT_FILE}.\n"
        f"Original error: {e}"
    ) from e

# ============================================================
# 3. CREATE FASTAPI APP
# ============================================================

app = FastAPI(
    title="Burnout Detection AI",
    description="AI-powered burnout prediction & assessment history API",
    version="1.1.0"
)

# ============================================================
# 4. CORS CONFIGURATION FOR REACT
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ============================================================
# 5. REQUEST & RESPONSE MODELS
# ============================================================

class BurnoutRequest(BaseModel):
    user_name: Optional[str] = "Anonymous"
    age: int
    gender: str
    job_role: str
    experience_years: float
    company_size: str
    work_mode: str

    work_hours_per_week: float
    overtime_hours: float
    meetings_per_day: float
    deadlines_missed: float

    job_satisfaction: float
    manager_support: float
    work_life_balance: float

    sleep_hours: float
    physical_activity_days: float
    screen_time_hours: float
    caffeine_intake: float
    social_support_score: float

    has_therapy: str

    stress_level: float
    anxiety_score: float
    depression_score: float

    seeks_professional_help: str


# ============================================================
# 6. BASIC ROUTES
# ============================================================

@app.get("/")
def home():
    return {
        "message": "Burnout Detection AI API is running",
        "status": "success",
        "version": "1.1.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "prediction_module": "loaded",
        "database": "connected"
    }


# ============================================================
# 7. PREDICTION & HISTORY RECORDING API
# ============================================================

@app.post("/predict")
def predict(data: BurnoutRequest, auto_save: bool = True):
    try:
        # Convert frontend JSON data into a Python dictionary
        input_data = data.model_dump()
        user_name = input_data.get("user_name") or "Anonymous"

        # Call ML prediction function
        result = predict_burnout(input_data)

        # Automatically persist assessment in user history
        if auto_save:
            try:
                history_id = save_assessment(input_data, result, user_name=user_name)
                result["history_id"] = history_id
            except Exception as save_err:
                print(f"Warning: Failed to save to history DB: {save_err}")
                result["history_id"] = None

        return result

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# ============================================================
# 8. USER HISTORY API ENDPOINTS
# ============================================================

@app.get("/history")
def get_history(
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    level: Optional[str] = Query(None, description="Filter by risk level: Low, Moderate, High, or All")
):
    """Retrieve paginated assessment history with optional risk-level filter."""
    try:
        records = get_all_assessments(limit=limit, offset=offset, level=level)
        return {
            "status": "success",
            "count": len(records),
            "data": records
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")


@app.get("/history/stats")
def get_history_summary():
    """Retrieve aggregated burnout metrics, trends, and chronological timeline data."""
    try:
        stats = get_assessment_stats()
        return {
            "status": "success",
            "stats": stats
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to compute history stats: {str(e)}")


@app.get("/history/{assessment_id}")
def get_history_detail(assessment_id: int):
    """Retrieve full details of a specific assessment including all input features and SHAP values."""
    try:
        record = get_assessment_by_id(assessment_id)
        if not record:
            raise HTTPException(status_code=404, detail=f"Assessment #{assessment_id} not found")
        return {
            "status": "success",
            "data": record
        }
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to fetch assessment detail: {str(e)}")


@app.delete("/history/{assessment_id}")
def delete_history_entry(assessment_id: int):
    """Delete a single assessment from history."""
    try:
        success = delete_assessment_by_id(assessment_id)
        if not success:
            raise HTTPException(status_code=404, detail=f"Assessment #{assessment_id} not found")
        return {
            "status": "success",
            "message": f"Assessment #{assessment_id} deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to delete assessment: {str(e)}")


@app.delete("/history")
def clear_history():
    """Clear all assessment history records."""
    try:
        deleted_count = clear_all_assessments()
        return {
            "status": "success",
            "message": f"Cleared {deleted_count} assessment records from history"
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to clear history: {str(e)}")
