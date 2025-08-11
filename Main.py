from flask import Flask, render_template, request, jsonify  # request is from flask
from utils.socket_factory import socketio, emit
import os
from werkzeug.utils import secure_filename
from utils.safe_json import safe_read_json, safe_write_json

from utils.client_tracker import ID_TO_CLIENT, EARLY_CLIENTS, clients
from utils.host_connection_handler import set_dm_sid
from utils.initializers.host_initializer import host_init_client_data, set_ip_and_port

import socket
import random
import webbrowser
import atexit
import signal
import sys
import logging
import string

'''IMPORTANT IMPORTS'''
import utils.name_registry_handler
import utils.campaign_manager
import utils.traps_manager
import utils.global_encounter_manager
import utils.combat_manager
import utils.class_stats_manager
import socket_helpers.ability_handler
import socket_helpers.ac_handler
import socket_helpers.health_handler
import socket_helpers.image_handler
import socket_helpers.message_handler

DM_SID = None

log = logging.getLogger('werkzeug')
log.setLevel(logging.CRITICAL)

app = Flask(__name__)
socketio.init_app(app)

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def handle_exit(signum, frame):
    # cleanup()
    sys.exit(0)


@atexit.register
def cleanup():
    pass
    # shutil.rmtree('static/uploads', ignore_errors=True)


@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        file.save(filepath)
        url = f"/static/uploads/{filename}"
        return jsonify({'url': url})
    return jsonify({'error': 'Invalid file'}), 400





@app.route('/')
def index():
    if not request.args.get('role') == 'host':
        return render_template('character_select.html')
    else:
        return render_template('select_campaign.html')


@app.route('/host')
def host():
    return render_template('host.html')


@app.route('/client')
def client():
    return render_template('client.html')


@app.route('/manage_traps')
def manage_traps():
    return render_template('manage_traps.html')





@socketio.on('connect')
def handle_connect():
    global DM_SID
    if not request.args.get('role') == 'host':
        pass
    else:
        DM_SID = request.sid
        set_dm_sid(DM_SID)


def get_ipv4_address():
    try:
        # Create a dummy socket connection to get local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # Doesn't actually connect to 8.8.8.8 (Google DNS), just used to find interface
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception as e:
        return f"Could not get IP: {e}"


def find_available_port(start=5000, end=65535, max_attempts=50):
    for _ in range(max_attempts):
        port = random.randint(start, end)
        if is_port_available(port):
            return port
    raise RuntimeError("Could not find an available port.")


def is_port_available(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('0.0.0.0', port)) != 0


global IPV4
global PORT


def setupServer():
    global IPV4
    global PORT
    IPV4 = get_ipv4_address()
    host = "0.0.0.0"
    PORT = find_available_port()
    set_ip_and_port(IPV4, PORT)
    print(f"Clients connect to: {IPV4}:{PORT}")
    url = f"http://{IPV4}:{PORT}?role=host"
    webbrowser.open(url)
    socketio.run(app, host=host, port=PORT, allow_unsafe_werkzeug=True)



if __name__ == "__main__":
    setupServer()
    signal.signal(signal.SIGINT, handle_exit)  # Ctrl+C
    signal.signal(signal.SIGTERM, handle_exit)  # Termination signal
