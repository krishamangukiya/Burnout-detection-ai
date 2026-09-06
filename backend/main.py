from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path

import pandas as pd


# ============================================================
# PATH SETUP
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

ML_DIR = BASE_DIR / "ml"

sys.path.append(str(ML_DIR))


# Import prediction function
from predict import predict_burnout


# ============================================================
# CREATE FASTAPI APP
# ============================================================

app = FastAPI(
    title="Burnout Detection API",
    description="AI-based Burnout Detection and Explainable AI API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def root():

    return {
        "message": "Burnout Detection API is running"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "model": "XGBoost",
        "explainability": "SHAP"
    }

# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict(data: dict):

    # Convert incoming JSON into DataFrame
    input_data = pd.DataFrame([data])

    # Generate prediction + SHAP explanation
    result = predict_burnout(input_data)

    return result