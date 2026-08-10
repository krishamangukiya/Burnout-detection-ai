from fastapi import FastAPI

app = FastAPI(
    title="AI-Based Burnout Detection System",
    description="Burnout prediction API using Machine Learning and Explainable AI",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Burnout Detection API is running"
    }