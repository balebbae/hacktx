from flask import Flask, request
from flask_socketio import SocketIO, emit
import eventlet
eventlet.monkey_patch()
import base64
import io
from PIL import Image

app = Flask(__name__)

ROBOFLOW_API_URL = "https://detect.roboflow.com/drowningtx/1"
API_KEY = "TwKusdS2oK2NVF17ohM8"
app.config['SECRET_KEY'] = 'saodhfpeyy48390fijd'  # Replace with a secure secret key
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000', async_mode='eventlet')

alert = {}

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')
    alert[request.sid] = False
    emit('connected', {'data': 'Connected to server'})

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client disconnected: {request.sid}')
    alert.pop(request.sid, None)

@socketio.on('frame')
def handle_frame(data):
    sid = request.sid
    frame = data.get('frame')
    if not frame:
        emit('drowning_status', {'error': 'No frame provided'})
        return
    # Process frame and detect drowning status
    is_drowning = process_frame(frame, sid)
    alert[sid] = is_drowning
    emit('drowning_status', {'is_drowning': is_drowning})

def process_frame(frame, sid):
    return False
    try:
        # Decode the base64 image
        image_bytes = base64.b64decode(frame)
        image = Image.open(io.BytesIO(image_bytes))

        # Prepare the image for the Roboflow API
        image_file = io.BytesIO()
        image.save(image_file, format='JPEG')
        image_file.seek(0)

        # Send the image to the Roboflow model API
        response = requests.post(
            f"{ROBOFLOW_API_URL}?api_key={API_KEY}",
            files={"file": image_file}
        )

        # Check if the request was successful
        if response.status_code != 200:
            print(f"Error from Roboflow API: {response.status_code}, {response.text}")
            return False

        # Parse the response JSON
        data = response.json()

        # Check if any predictions have the class "drowning"
        drowning_detected = any(
            prediction["class"] == "drowning" for prediction in data.get("predictions", [])
        )

        return drowning_detected

    except Exception as e:
        print(f"Error processing frame for {sid}: {e}")
        return False


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
