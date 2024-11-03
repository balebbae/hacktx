from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace this URL with the actual model endpoint from Roboflow, including your API key
ROBOFLOW_API_URL = "https://detect.roboflow.com/drowning-detection-fxnax/4"
API_KEY = "TwKusdS2oK2NVF17ohM8"

@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    # Get the image from the request
    image = request.files['image']

    # Send the image to the Roboflow model API
    response = requests.post(
        f"{ROBOFLOW_API_URL}?api_key={API_KEY}",
        files={"file": image}
    )

    # Check if the request was successful
    if response.status_code != 200:
        return jsonify({"error": "Error from Roboflow API"}), 500

    # Parse the response JSON
    data = response.json()
    
    # Check if any predictions have the class "drowning"
    drowning_detected = any(prediction["class"] == "drowning" for prediction in data.get("predictions", []))
    
    # Return true if drowning detected, otherwise false
    return jsonify({"drowning_detected": drowning_detected})

if __name__ == "__main__":
    app.run(debug=True)
