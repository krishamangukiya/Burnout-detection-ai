
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import importlib.util
import sys
import traceback

# ============================================================
# 1. PROJECT PATHS
# ============================================================

# Project root: Burnout-detection-ai
BASE_DIR = Path(__file__).resolve().parent.parent

# ML folder
ML_DIR = BASE_DIR / "ml"

# Prediction Python file
PREDICT_FILE = ML_DIR / "predict.py"

# ============================================================
# 2. IMPORT PREDICTION FUNCTION
# ============================================================

if not PREDICT_FILE.exists():
    raise FileNotFoundError(
        f"predict.py was not found at: {PREDICT_FILE}\n"
        "Please check the location of your predict.py file."
    )

# Add ML folder to Python's module search path
if str(ML_DIR) not in sys.path:
    sys.path.insert(0, str(ML_DIR))

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
    description="AI-powered burnout prediction API",
    version="1.0.0"
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
# 5. REQUEST MODEL
# ============================================================

class BurnoutRequest(BaseModel):
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
# 6. HOME ROUTE
# ============================================================

@app.get("/")
def home():
    return {
        "message": "Burnout Detection AI API is running",
        "status": "success"
    }


# ============================================================
# 7. HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "prediction_module": "loaded"
    }


# ============================================================
# 8. PREDICTION API
# ============================================================

@app.post("/predict")
def predict(data: BurnoutRequest):

    try:
        # Convert frontend JSON data into a Python dictionary
        input_data = data.model_dump()

        # Call your existing ML prediction function
        result = predict_burnout(input_data)

        # Return prediction to React
        return result

    except Exception as e:
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )