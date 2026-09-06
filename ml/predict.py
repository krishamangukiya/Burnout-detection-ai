import joblib
import shap
import pandas as pd
import numpy as np
from pathlib import Path


# ============================================================
# 1. PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent


# ============================================================
# 2. LOAD SAVED MODEL, PREPROCESSOR AND FEATURE NAMES
# ============================================================

model = joblib.load(BASE_DIR / "xgb_burnout_model.pkl")
preprocessor = joblib.load(BASE_DIR / "preprocessor.pkl")
feature_names = joblib.load(BASE_DIR / "feature_names.pkl")


# ============================================================
# 3. CREATE SHAP EXPLAINER
# ============================================================

explainer = shap.TreeExplainer(model)


print("========================================")
print("ML components loaded successfully!")
print("Model:", type(model).__name__)
print("Preprocessor:", type(preprocessor).__name__)
print("Number of features:", len(feature_names))
print("SHAP explainer: Ready")
print("========================================")


# ============================================================
# 4. BURNOUT LEVEL FUNCTION
# ============================================================

def get_burnout_level(score):
    """
    Convert burnout score into a risk level.
    
    IMPORTANT:
    Update these thresholds if your project uses
    different burnout-level rules.
    """

    if score < 4:
        return "Low"

    elif score < 7:
        return "Moderate"

    else:
        return "High"


# ============================================================
# 5. PREDICTION FUNCTION
# ============================================================

def predict_burnout(input_data):
    """
    Predict burnout score and generate SHAP explanation.

    input_data:
        pandas DataFrame containing one user's assessment data.

    Returns:
        burnout score
        burnout level
        SHAP values
        feature names
    """

    # --------------------------------------------------------
    # Preprocess user input
    # --------------------------------------------------------

    processed_data = preprocessor.transform(input_data)

    # Convert sparse matrix to dense array if necessary
    if hasattr(processed_data, "toarray"):
        processed_data = processed_data.toarray()

    processed_data = np.asarray(processed_data)

    # --------------------------------------------------------
    # Predict burnout score
    # --------------------------------------------------------

    prediction = model.predict(processed_data)

    burnout_score = float(prediction[0])

    # --------------------------------------------------------
    # Determine burnout level
    # --------------------------------------------------------

    burnout_level = get_burnout_level(burnout_score)

    # --------------------------------------------------------
    # Calculate SHAP values
    # --------------------------------------------------------

    shap_values = explainer.shap_values(processed_data)

    # Handle different SHAP output formats
    if isinstance(shap_values, list):
        shap_values = shap_values[0]

    shap_values = np.asarray(shap_values)

    # Get SHAP values for the first user
    sample_shap = shap_values[0]

    # --------------------------------------------------------
    # Create feature explanation
    # --------------------------------------------------------

    explanation = []

    for feature, impact in zip(feature_names, sample_shap):

        impact = float(impact)

        if impact > 0:
            direction = "increases"
        elif impact < 0:
            direction = "decreases"
        else:
            direction = "neutral"

        explanation.append({
            "feature": feature,
            "impact": round(impact, 4),
            "direction": direction
        })

    # --------------------------------------------------------
    # Sort by absolute SHAP impact
    # --------------------------------------------------------

    explanation.sort(
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    # --------------------------------------------------------
    # Return result
    # --------------------------------------------------------

    return {
        "burnout_score": round(burnout_score, 2),
        "burnout_level": burnout_level,
        "explanation": explanation
    }


if __name__ == "__main__":

    print("\nTesting prediction module...\n")

    # --------------------------------------------------------
    # TEMPORARY TEST
    # --------------------------------------------------------

    # We need a real sample with the SAME columns
    # that were used to train the model.

    sample_data = pd.DataFrame([{
        # We will fill these values in the next step
    }])

    result = predict_burnout(sample_data)

    print("\nPrediction Result:")
    print(result)