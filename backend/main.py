from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
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
    # Process frame and detect drowning status
    is_drowning = process_frame(frame, sid)
    alert[sid] = is_drowning
    emit('drowning_status', {'is_drowning': is_drowning})

def process_frame(frame, sid):
    # Simulated frame processing - replace with actual drowning detection logic
    # print(f"Processing frame for {sid}: {frame}")
    # For now, just return False for no drowning detected
    return True

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
