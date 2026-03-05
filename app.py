from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import sqlite3
import os

app = Flask(__name__)
CORS(app)

MODEL = joblib.load("models/best_model.pkl")
SCALER = joblib.load("models/scaler.pkl")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def predict_row(row):
    features = [[
        row["slope_angle"],
        row["rainfall"],
        row["rock_density"],
        row["crack_length"],
        row["groundwater_level"],
        row["blasting_intensity"],
        row["seismic_activity"],
        row["bench_height"],
        row["excavation_depth"],
        row["temperature_variation"]
    ]]

    features = SCALER.transform(features)
    prediction = MODEL.predict(features)[0]

    return int(prediction)


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = [[
        data["slope_angle"],
        data["rainfall"],
        data["rock_density"],
        data["crack_length"],
        data["groundwater_level"],
        data["blasting_intensity"],
        data["seismic_activity"],
        data["bench_height"],
        data["excavation_depth"],
        data["temperature_variation"]
    ]]

    features = SCALER.transform(features)
    prediction = MODEL.predict(features)[0]

    return jsonify({
        "prediction": int(prediction)
    })


@app.route("/upload_csv", methods=["POST"])
def upload_csv():

    file = request.files["file"]

    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    df = pd.read_csv(path)

    results = []

    for _, row in df.iterrows():

        pred = predict_row(row)

        results.append({
            "site": row.get("site_id", "unknown"),
            "prediction": pred
        })

    return jsonify(results)


@app.route("/alerts")
def alerts():

    alerts = [
        {
            "site": "East Haul Road",
            "risk": "High",
            "time": "2026-03-06"
        }
    ]

    return jsonify(alerts)


@app.route("/map_data")
def map_data():

    sites = [
        {"name": "North Pit", "lat": 45.2, "lng": -73.8, "risk": "safe"},
        {"name": "Central Pit", "lat": 45.3, "lng": -73.6, "risk": "caution"},
        {"name": "East Pit", "lat": 45.4, "lng": -73.5, "risk": "critical"}
    ]

    return jsonify(sites)


if __name__ == "__main__":
    app.run(debug=True)