import joblib
import pandas as pd
import numpy as np
from pathlib import Path

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "xgb_burnout_model.pkl"
PREPROCESSOR_PATH = BASE_DIR / "preprocessor.pkl"

# CHANGE THIS to your actual test dataset filename
TEST_DATA_PATH = BASE_DIR.parent / "burnout_30k.csv"


# ============================================================
# LOAD MODEL AND PREPROCESSOR
# ============================================================

print("\nLoading model and preprocessor...")

model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)

print("Model loaded successfully.")
print("Preprocessor loaded successfully.")


# ============================================================
# LOAD TEST DATA
# ============================================================

print("\nLoading test dataset...")

df = pd.read_csv(TEST_DATA_PATH)

print(f"Test dataset shape: {df.shape}")


# ============================================================
# TARGET
# ============================================================

TARGET = "burnout_score"

if TARGET not in df.columns:
    raise ValueError(
        f"Target column '{TARGET}' was not found in the dataset."
    )

X_test = df.drop(columns=[TARGET])
y_test = df[TARGET]


# ============================================================
# PREPROCESS TEST DATA
# ============================================================

print("\nPreprocessing test data...")

X_processed = preprocessor.transform(X_test)

if hasattr(X_processed, "toarray"):
    X_processed = X_processed.toarray()

X_processed = np.asarray(X_processed)


# ============================================================
# PREDICTION
# ============================================================

print("Generating predictions...")

y_pred = model.predict(X_processed)

y_pred = np.asarray(y_pred)


# ============================================================
# REGRESSION METRICS
# ============================================================

mae = mean_absolute_error(y_test, y_pred)

mse = mean_squared_error(y_test, y_pred)

rmse = np.sqrt(mse)

r2 = r2_score(y_test, y_pred)


# ============================================================
# DISPLAY REGRESSION RESULTS
# ============================================================

print("\n")
print("=" * 60)
print("XGBOOST REGRESSION MODEL EVALUATION")
print("=" * 60)

print(f"Test Samples : {len(y_test)}")

print(f"\nMAE  : {mae:.4f}")

print(f"MSE  : {mse:.4f}")

print(f"RMSE : {rmse:.4f}")

print(f"R²   : {r2:.4f}")

print(f"\nR² Percentage : {r2 * 100:.2f}%")


# ============================================================
# CONVERT SCORE INTO BURNOUT LEVEL
# ============================================================

def burnout_level(score):

    if score < 4:
        return "Low"

    elif score < 7:
        return "Moderate"

    else:
        return "High"


actual_levels = y_test.apply(burnout_level)

predicted_levels = pd.Series(y_pred).apply(burnout_level)


# ============================================================
# CLASSIFICATION METRICS
# ============================================================

accuracy = accuracy_score(
    actual_levels,
    predicted_levels
)

precision = precision_score(
    actual_levels,
    predicted_levels,
    labels=["Low", "Moderate", "High"],
    average="weighted",
    zero_division=0
)

recall = recall_score(
    actual_levels,
    predicted_levels,
    labels=["Low", "Moderate", "High"],
    average="weighted",
    zero_division=0
)

f1 = f1_score(
    actual_levels,
    predicted_levels,
    labels=["Low", "Moderate", "High"],
    average="weighted",
    zero_division=0
)


# ============================================================
# DISPLAY CLASSIFICATION RESULTS
# ============================================================

print("\n")
print("=" * 60)
print("BURNOUT LEVEL CLASSIFICATION EVALUATION")
print("=" * 60)

print(f"Accuracy  : {accuracy:.4f} ({accuracy * 100:.2f}%)")

print(f"Precision : {precision:.4f}")

print(f"Recall    : {recall:.4f}")

print(f"F1-Score  : {f1:.4f}")


# ============================================================
# CLASSIFICATION REPORT
# ============================================================

print("\n")
print("=" * 60)
print("CLASSIFICATION REPORT")
print("=" * 60)

print(
    classification_report(
        actual_levels,
        predicted_levels,
        labels=["Low", "Moderate", "High"],
        zero_division=0
    )
)


# ============================================================
# CONFUSION MATRIX
# ============================================================

cm = confusion_matrix(
    actual_levels,
    predicted_levels,
    labels=["Low", "Moderate", "High"]
)

cm_df = pd.DataFrame(
    cm,
    index=["Actual Low", "Actual Moderate", "Actual High"],
    columns=[
        "Predicted Low",
        "Predicted Moderate",
        "Predicted High"
    ]
)

print("\n")
print("=" * 60)
print("CONFUSION MATRIX")
print("=" * 60)

print(cm_df)


# ============================================================
# ACTUAL VS PREDICTED SAMPLE
# ============================================================

results = pd.DataFrame({
    "Actual Score": y_test.values,
    "Predicted Score": y_pred,
    "Actual Level": actual_levels.values,
    "Predicted Level": predicted_levels.values
})

print("\n")
print("=" * 60)
print("SAMPLE PREDICTIONS")
print("=" * 60)

print(results.head(10).to_string(index=False))


# ============================================================
# SAVE RESULTS
# ============================================================

results.to_csv(
    BASE_DIR / "model_test_predictions.csv",
    index=False
)

print("\nPrediction results saved to:")
print(BASE_DIR / "model_test_predictions.csv")


# ============================================================
# FINAL SUMMARY
# ============================================================

print("\n")
print("=" * 60)
print("FINAL MODEL SUMMARY")
print("=" * 60)

print(f"XGBoost R²       : {r2:.4f}")

print(f"XGBoost RMSE     : {rmse:.4f}")

print(f"Burnout Accuracy : {accuracy * 100:.2f}%")

print(f"Weighted F1      : {f1:.4f}")

print("=" * 60)