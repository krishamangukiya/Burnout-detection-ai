import joblib
import numpy as np
import shap


# Load saved files
model = joblib.load("xgb_burnout_model.pkl")
preprocessor = joblib.load("preprocessor.pkl")
feature_names = joblib.load("feature_names.pkl")


# Create SHAP explainer
explainer = shap.TreeExplainer(model)


def predict_burnout(input_data):
    """
    Takes user input, preprocesses it,
    predicts burnout score, and generates SHAP values.
    """

    # Convert input into the format expected by the preprocessor
    processed_data = preprocessor.transform(input_data)

    # Convert sparse matrix if necessary
    if hasattr(processed_data, "toarray"):
        processed_data = processed_data.toarray()

    # Prediction
    prediction = model.predict(processed_data)[0]

    # SHAP explanation
    shap_values = explainer.shap_values(processed_data)

    # Handle SHAP output
    if isinstance(shap_values, list):
        shap_values = shap_values[0]

    shap_values = shap_values[0]

    return {
        "burnout_score": float(prediction),
        "shap_values": shap_values.tolist()
    }