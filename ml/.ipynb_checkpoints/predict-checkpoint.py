
# ============================================================
# BURNOUT DETECTION AI - PREDICTION MODULE
# File: ml/predict.py
# ============================================================

import joblib
import pandas as pd
import numpy as np
import shap

from pathlib import Path


# ============================================================
# 1. PATH SETUP
# ============================================================

# ml folder
BASE_DIR = Path(__file__).resolve().parent

# model folder
MODEL_DIR = BASE_DIR / "model"

MODEL_PATH = MODEL_DIR / "xgb_burnout_model.pkl"
PREPROCESSOR_PATH = MODEL_DIR / "preprocessor.pkl"
FEATURE_NAMES_PATH = MODEL_DIR / "feature_names.pkl"


# ============================================================
# 2. CHECK MODEL FILES
# ============================================================

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found: {MODEL_PATH}"
    )

if not PREPROCESSOR_PATH.exists():
    raise FileNotFoundError(
        f"Preprocessor not found: {PREPROCESSOR_PATH}"
    )

if not FEATURE_NAMES_PATH.exists():
    raise FileNotFoundError(
        f"Feature names file not found: {FEATURE_NAMES_PATH}"
    )


# ============================================================
# 3. LOAD MODEL, PREPROCESSOR AND FEATURE NAMES
# ============================================================

model = joblib.load(MODEL_PATH)

preprocessor = joblib.load(PREPROCESSOR_PATH)

feature_names = joblib.load(FEATURE_NAMES_PATH)


print("============================================")
print("Burnout ML files loaded successfully")
print("Model       :", MODEL_PATH)
print("Preprocessor:", PREPROCESSOR_PATH)
print("Features    :", FEATURE_NAMES_PATH)
print("============================================")


# ============================================================
# 4. SHAP EXPLAINER
# ============================================================

explainer = shap.TreeExplainer(model)


# ============================================================
# 5. BURNOUT LEVEL
# ============================================================

def get_burnout_level(score):

    if score < 3.5:
        return "Low"

    elif score < 6.5:
        return "Moderate"

    else:
        return "High"


# ============================================================
# 6. PREDICT BURNOUT
# ============================================================

def predict_burnout(input_data: dict):

    # --------------------------------------------------------
    # Convert dictionary to DataFrame
    # --------------------------------------------------------
# Convert Yes/No fields to numeric values
    if isinstance(input_data.get("has_therapy"), str):
        input_data["has_therapy"] = (
            1 if input_data["has_therapy"].strip().lower() == "yes" else 0
        )

    if isinstance(input_data.get("seeks_professional_help"), str):
        input_data["seeks_professional_help"] = (
            1 if input_data["seeks_professional_help"].strip().lower() == "yes" else 0
        )
    input_df = pd.DataFrame([input_data])

    print("\nReceived input:")
    print(input_df)


    # --------------------------------------------------------
    # Match training feature order
    # --------------------------------------------------------

    if hasattr(preprocessor, "feature_names_in_"):

        expected_columns = list(
            preprocessor.feature_names_in_
        )

        missing_columns = [
            column
            for column in expected_columns
            if column not in input_df.columns
        ]

        if missing_columns:

            raise ValueError(
                "Missing required features: "
                + str(missing_columns)
            )

        input_df = input_df[expected_columns]


    # --------------------------------------------------------
    # Apply preprocessing
    # --------------------------------------------------------

    processed_data = preprocessor.transform(input_df)


    # --------------------------------------------------------
    # XGBoost prediction
    # --------------------------------------------------------

    prediction = model.predict(processed_data)

    burnout_score = float(
        np.asarray(prediction).reshape(-1)[0]
    )

    # Keep score between 0 and 10
    burnout_score = float(
        np.clip(burnout_score, 0, 10)
    )


    # --------------------------------------------------------
    # Determine burnout level
    # --------------------------------------------------------

    burnout_level = get_burnout_level(
        burnout_score
    )


    # --------------------------------------------------------
    # SHAP VALUES
    # --------------------------------------------------------

    shap_values = explainer.shap_values(
        processed_data
    )

    shap_values = np.asarray(shap_values)


    # Handle SHAP output shape
    if shap_values.ndim == 3:

        shap_values = shap_values[0, :, 0]

    elif shap_values.ndim == 2:

        shap_values = shap_values[0]

    else:

        shap_values = shap_values.reshape(-1)


    # --------------------------------------------------------
    # Get transformed feature names
    # --------------------------------------------------------

    try:

        transformed_names = list(
            preprocessor.get_feature_names_out()
        )

    except Exception:

        transformed_names = None


    if (
        transformed_names
        and len(transformed_names) == len(shap_values)
    ):

        names = transformed_names

    elif (
        feature_names is not None
        and len(feature_names) == len(shap_values)
    ):

        names = list(feature_names)

    else:

        names = [
            f"Feature {i + 1}"
            for i in range(len(shap_values))
        ]


    # --------------------------------------------------------
    # Create SHAP explanation
    # --------------------------------------------------------

    explanation = []

    for name, value in zip(
        names,
        shap_values
    ):

        value = float(value)

        explanation.append({

            "feature": str(name),

            "impact": round(
                value,
                4
            ),

            "direction": (
                "increases"
                if value > 0
                else "decreases"
                if value < 0
                else "neutral"
            )
        })


    # --------------------------------------------------------
    # Sort by strongest impact
    # --------------------------------------------------------

    explanation.sort(
        key=lambda item: abs(
            item["impact"]
        ),
        reverse=True
    )


    # --------------------------------------------------------
    # Top 5 factors
    # --------------------------------------------------------

    top_factors = explanation[:5]


    # --------------------------------------------------------
    # Final API response
    # --------------------------------------------------------

    result = {

        "burnout_score": round(
            burnout_score,
            2
        ),

        "burnout_level": burnout_level,

        "top_factors": top_factors,

        "shap_explanation": explanation
    }


    print("\nPrediction result:")
    print(result)


    return result
