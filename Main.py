from flask import Flask, render_template, request, jsonify  # request is from flask
from flask_socketio import SocketIO, emit
import os
from werkzeug.utils import secure_filename
from utils.safe_json import safe_read_json, safe_write_json
import socket
import random
import webbrowser
import atexit
import signal
import sys
import json
import shutil
import logging
import string

log = logging.getLogger('werkzeug')
log.setLevel(logging.CRITICAL)

app = Flask(__name__)
socketio = SocketIO(app)

clients = {}

global CURRENT_CAMPAIGN
global PLAYERS_FOLDER
global TRAPS_FOLDER
global IMGS_FOLDER
global COMBAT_FOLDER
global ID_TO_CLIENT

CURRENT_CAMPAIGN = None
PLAYERS_FOLDER = None
TRAPS_FOLDER = None
IMGS_FOLDER = None
COMBAT_FOLDER = None
ID_TO_CLIENT = {}

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

global EARLY_CLIENTS
EARLY_CLIENTS = []


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


global DM_SID


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


@socketio.on('disconnect')
def handle_disconnect():
    global EARLY_CLIENTS
    global ID_TO_CLIENT
    sid = request.sid
    if sid in clients:
        # emit('client_disconnected', {'client_id': sid}, broadcast=True)
        del clients[sid]
    for key in ID_TO_CLIENT.keys():
        if ID_TO_CLIENT.get(key) == sid:
            ID_TO_CLIENT[key] = None

    for client in EARLY_CLIENTS:
        if client.get('sid') == sid:
            del client


def host_init_client_data(data, char_id):
    data = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    messages = data.get("messages")
    imgs = data.get("imgs")
    health = data.get("health")
    armor_class = data.get("ac")
    max_health = data.get("max_health") if data.get("max_health") is not None else 0
    for message in messages:
        emit("load_message", {'message': message, 'char_id': char_id}, room=DM_SID)
    for img in imgs:
        emit('load_image', {'url': img, 'char_id': char_id}, room=DM_SID)
    emit('client_update_health', {'result': health, 'char_id': char_id}, room=DM_SID)
    emit('client_change_armor_class', {'char_id': char_id, 'value': armor_class}, room=DM_SID)
    emit('client_update_max_health', {'max_health': max_health, 'char_id': char_id})

    d = safe_read_json(f"{TRAPS_FOLDER}\\traps.json")
    emit('update_traps_list', {'traps_data': d}, room=DM_SID)


def init_json_data(sid, name, char_id):
    # Load or Create all of the data for each client

    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}.json"):
        char_data = {
            "name": name,
            "messages": [],
            "imgs": [],
            "health": 0,
            "ac": 0,
            "states_text": ''
        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}.json")

    data = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    messages = data.get("messages")
    imgs = data.get("imgs")
    health = data.get("health")
    armor_class = data.get("ac")
    max_health = data.get("max_health") if data.get("max_health") is not None else 0

    for message in messages:
        emit("load_message", {'message': message}, room=sid)
    for img in imgs:
        emit('send_image', {'url': img, 'n': False}, room=sid)
    emit('host_update_health', {'result': health, 'client_id': sid}, room=sid)
    emit('host_change_armor_class', {'value': armor_class}, room=sid)
    emit('host_update_max_health', {'max_health': max_health}, room=sid)


@socketio.on('get_traps_json')
def get_traps_json():
    # Server calls this to load the traps file
    j = safe_read_json(f"{TRAPS_FOLDER}\\traps.json")
    emit('load_traps_json', j)


@socketio.on('client_ready')
def client_ready(data):
    # Makes the client wait until a campaign is selected
    # Registers the client when ready
    global EARLY_CLIENTS
    global CURRENT_CAMPAIGN
    sid = request.sid
    name = data.get('name')
    char_id = data.get('char_id')
    if CURRENT_CAMPAIGN == None:
        EARLY_CLIENTS.append({'sid': sid, 'name': name, 'char_id': char_id})
        emit('client_wait', room=sid)
    else:
        emit('client_continue', {'name': name, 'char_id': char_id}, room=sid)


@socketio.on('register_name')
def handle_register_name(data):
    # happens when a connected client selects a character
    # Keep track of connected clients
    # Load saved data
    global PLAYERS_FOLDER
    global ID_TO_CLIENT
    sid = request.sid
    name = data.get('name')
    char_id = data.get('char_id')
    player_ids = [f.split('.')[0] for f in os.listdir(PLAYERS_FOLDER)]
    if char_id:
        clients[sid] = {'name': name, 'sid': sid, 'char_id': char_id}
        if char_id not in player_ids:
            emit('client_name_registered', {'name': name, 'char_id': char_id}, room=DM_SID)
        init_json_data(sid, name, char_id)
        ID_TO_CLIENT[char_id] = sid
        emit('allow_client', room=sid)

    else:
        print(f"Warning: No id for {name}")


@socketio.on('host_page_load')
def host_page_load():
    global IPV4
    global PORT
    global PLAYERS_FOLDER
    # Tell the host to create a tab for the client
    txt = str(IPV4) + ':' + str(PORT)
    emit('add_ip_text', {'ip': txt}, room=DM_SID)
    players = [f for f in os.listdir(PLAYERS_FOLDER)]
    for player in players:
        data = safe_read_json(f"{PLAYERS_FOLDER}\\{player}")
        char_id = player.split('.')[0]
        name = data.get("name")
        emit('host_load_client_data', {'name': name, 'char_id': char_id})
        host_init_client_data(data, char_id)
    load_combats()

@socketio.on('message_to_dm')
def message_to_dm(data):
    global ID_TO_CLIENT
    if DM_SID is None:
        return
    sid = request.sid
    msg = data.get('message')
    name = data.get('char_name')
    char_id = data.get('char_id')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["messages"].append(f"{name}: {msg}")
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")

    for key in ID_TO_CLIENT.keys():
        if ID_TO_CLIENT.get(key) == sid:
            emit('message_to_dm', {'char_id': key, 'message': msg, 'name': clients.get(sid).get('name')}, room=DM_SID)
            break


@socketio.on('saveCombat')
def save_combat(data):
    global COMBAT_FOLDER
    combat_name = data.get('combat_name')
    enemy_list = data.get('enemy_list')
    combat_id = data.get('combat_id')
    initiative_array = data.get("initiative_array")
    current_turn = data.get("current_turn")
    all_combat_data = {'name': combat_name, 'enemy_list': enemy_list, 'initiative_array': initiative_array,
                        'current_turn': current_turn}
    safe_write_json(all_combat_data, f'{COMBAT_FOLDER}\\{combat_id}.json')

@socketio.on('save_combat_global')
def save_combat_global(data):
    global COMBAT_FOLDER
    combat_name = data.get('combat_name')
    enemy_list = data.get('enemy_list')
    combat_id = data.get('combat_id')
    cwd = os.getcwd()
    all_combat_data = {'name': combat_name, 'enemy_list': enemy_list}
    safe_write_json(all_combat_data, f'{cwd}\\global\\encounters\\{combat_id}.json')


@socketio.on('populate_import_encounters')
def populate_import_encounters():
    cwd = os.getcwd()
    encounters = [f.split(".json")[0] for f in os.listdir(cwd + "\\global\\encounters\\") if f.endswith('.json')]
    for encounter in encounters:
        j = safe_read_json(f'{cwd}\\global\\encounters\\{encounter}.json')
        name = j.get('name')
        emit('add_import_option', {'encounter_id': encounter, 'name': name})


@socketio.on('import_id')
def import_id(data):
    global COMBAT_FOLDER
    cwd = os.getcwd()
    id = data.get('id')
    j = safe_read_json(f'{cwd}\\global\\encounters\\{id}.json')
    j['initiative_array'] = []
    j['current_turn'] = 0

    new_id = get_unique_id(id)
    safe_write_json(j, f'{COMBAT_FOLDER}\\{new_id}.json')
    j['id'] = new_id
    emit('add_imported_encounter', {'combat': j})


def get_unique_id(id):
    combats = [f.split(".json")[0] for f in os.listdir(COMBAT_FOLDER) if f.endswith('.json')]
    for combat in combats:
        if combat == id:
            id = random_string()
            get_unique_id(id)
    return id


def random_string(length=8):
    chars = string.ascii_lowercase + string.digits  # base-36 characters
    return ''.join(random.choices(chars, k=length))


def load_combats():
    global COMBAT_FOLDER
    combat_data = {}
    combats = [f.split(".json")[0] for f in os.listdir(COMBAT_FOLDER) if f.endswith('.json')]
    for combat_id in combats:
        j = safe_read_json(f'{COMBAT_FOLDER}\\{combat_id}.json')
        combat_data[combat_id] = j
    emit("combat_list", {"combats": combat_data}, room=DM_SID)


@socketio.on("remove_combat")
def remove_combat(data):
    global COMBAT_FOLDER
    combat_id = data.get("combat_id")
    try:
        os.remove(f'{COMBAT_FOLDER}\\{combat_id}.json')
    except:
        pass


@socketio.on('update_turn')
def update_turn(data):
    combat_id = data.get('combat_id')
    turn_num = data.get('turn_num')
    d = safe_read_json(f"{COMBAT_FOLDER}\\{combat_id}.json")
    d['current_turn'] = turn_num
    safe_write_json(d, f"{COMBAT_FOLDER}\\{combat_id}.json")



@socketio.on('end_combat')
def end_combat(data):
    combat_id = data.get('combat_id')
    d = safe_read_json(f"{COMBAT_FOLDER}\\{combat_id}.json")
    d['current_turn'] = 0
    d['initiative_array'] = []
    safe_write_json(d, f"{COMBAT_FOLDER}\\{combat_id}.json")


@socketio.on('message_to_client')
def message_to_client(data):
    global ID_TO_CLIENT
    char_id = data.get('char_id')
    target_id = ID_TO_CLIENT.get(char_id)
    msg = data.get('message')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["messages"].append(f"DM: {msg}")
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")

    emit('private_message', {'from': 'DM', 'message': msg}, room=target_id)


@socketio.on('client_update_health')
def client_update_health(data):
    # Save new health and sync with the host
    char_id = data.get('char_id')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["health"] = data.get("result")
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    for key in ID_TO_CLIENT.keys():
        if ID_TO_CLIENT.get(key) == request.sid:
            emit('client_update_health', {'result': data.get('result'), 'char_id': key}, room=DM_SID)
            break


@socketio.on('host_update_health')
def host_update_health(data):
    # Save new health and sync with the client
    char_id = data.get('char_id')
    target_id = ID_TO_CLIENT.get(char_id)
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["health"] = data.get("result")
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('host_update_health', {'result': data.get('result')}, room=target_id)


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
    print(f"Clients connect to: {IPV4}:{PORT}")
    url = f"http://{IPV4}:{PORT}?role=host"
    webbrowser.open(url)
    socketio.run(app, host=host, port=PORT, allow_unsafe_werkzeug=True)


@socketio.on('add_traps')
def addTraps(traps_data):
    # Load traps to server list
    d = {}
    d["traps"] = traps_data
    safe_write_json(d, f"{TRAPS_FOLDER}\\traps.json")
    emit('update_traps_list', {'traps_data': d}, room=DM_SID)


@socketio.on('host_send_image_url')
def handle_host_image_url(data):
    # Send an image from the host to the client
    url = data.get('url')
    char_id = data.get('char_id')
    target_id = ID_TO_CLIENT.get(char_id)
    if url:
        d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
        d["imgs"].append(f"{url}")
        safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
        emit('send_image', {'url': url}, room=target_id)


@socketio.on('host_change_armor_class')
def host_change_armor_class(data):
    # Save new armor class and sync to client
    char_id = data.get('char_id')
    sid = ID_TO_CLIENT.get(char_id)
    value = data.get('value')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["ac"] = value
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('host_change_armor_class', {'value': value}, room=sid)


@socketio.on('client_change_armor_class')
def client_change_armor_class(data):
    # Save new armor class and sync to host
    value = data.get('value')
    char_id = data.get('char_id')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["ac"] = value
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('client_change_armor_class', {'char_id': char_id, 'value': value}, room=DM_SID)


@socketio.on('create_campaign')
def create_campaign(data):
    # Creates a new save folder for a campaign
    name = str(data.get('campaign_name'))
    if name == '':
        emit('create_campaign_fail', {'error': 'no_name'}, room=DM_SID)
    files = get_campaigns()
    if name in files:
        emit('create_campaign_fail', {'error': 'existing_name'}, room=DM_SID)
    else:
        cwd = os.getcwd() + '\\local\\campaigns\\'
        os.makedirs(cwd + name)
        os.makedirs(cwd + name + '\\players')
        os.makedirs(cwd + name + '\\traps')
        os.makedirs(cwd + name + '\\imgs')
        os.makedirs(cwd + name + '\\combat')
        assign_folders(name)
        emit('create_campaign_success', room=DM_SID)


@socketio.on('get_campaigns')
def get_campaigns():
    # Load the saved campaigns
    emit('return_campaigns', {'campaigns': get_campaigns()}, room=DM_SID)


@socketio.on('delete_campaign')
def delete_campaign(data):
    name = data.get('name')
    file_path = os.getcwd() + '\\local\\campaigns\\' + str(name)
    if os.path.exists(file_path):
        shutil.rmtree(file_path)


@socketio.on('selected_campaign')
def selected_campaign(data):
    name = data.get('campaign_name')
    assign_folders(name)
    emit('continue_to_dashboard', room=DM_SID)


@socketio.on('initialize_combat')
def initialize_combat(data):
    combat_id = data.get('combat_id')
    emit('initialize_combat', {'combat_id': combat_id}, broadcast=True)


@socketio.on('player_input_init')
def player_input_init(data):
    char_id = data.get('char_id')
    combat_id = data.get('combat_id')
    init = data.get('init')
    char_name = data.get('char_name')
    emit('player_input_init', {'char_id': char_id, 'combat_id': combat_id, 'init': init, 'char_name': char_name},
         room=DM_SID)


@socketio.on('add_player_inits')
def add_player_inits(data):
    combat_id = data.get('combat_id')
    players = [f.split(".json")[0] for f in os.listdir(PLAYERS_FOLDER) if f.endswith('.json')]
    players_data = {}
    for player in players:
        j = safe_read_json(f'{PLAYERS_FOLDER}\\{player}.json')
        players_data[player] = {'player_name': j.get('name'), 'player_ac': j.get('ac'),
                                'player_health': j.get('health'), 'max_health': j.get('max_health')}
    emit('add_player_inits', {'combat_id': combat_id, 'players_data': players_data}, room=DM_SID)


@socketio.on('host_update_max_health')
def host_update_max_health(data):
    char_id = data.get('player_id')
    health = data.get('health')
    sid = ID_TO_CLIENT.get(char_id)
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["max_health"] = health
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('host_update_max_health', {'max_health': health}, room=sid)


@socketio.on('client_update_max_health')
def client_update_max_health(data):
    sid = request.sid
    char_id = data.get('char_id')
    max_health = data.get('max_health')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["max_health"] = max_health
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('client_update_max_health', {'max_health': max_health, 'char_id': char_id}, room=DM_SID)


def assign_folders(name):
    # Set the paths to the saved data when a campaign is selected
    global CURRENT_CAMPAIGN
    global PLAYERS_FOLDER
    global TRAPS_FOLDER
    global IMGS_FOLDER
    global COMBAT_FOLDER
    global EARLY_CLIENTS
    cwd = os.getcwd() + '\\local\\campaigns\\'

    CURRENT_CAMPAIGN = name
    PLAYERS_FOLDER = cwd + name + '\\players'
    TRAPS_FOLDER = cwd + name + '\\traps'
    IMGS_FOLDER = cwd + name + '\\imgs'
    COMBAT_FOLDER = cwd + name + '\\combat'
    if not os.path.exists(f"{TRAPS_FOLDER}\\traps.json"):
        traps_data = {
            "traps": []
        }
        safe_write_json(traps_data, f"{TRAPS_FOLDER}\\traps.json")
    for c in EARLY_CLIENTS:
        emit('client_continue', {'name': c.get('name'), 'char_id': c.get('char_id')}, room=c.get('sid'))

    EARLY_CLIENTS = []


def get_campaigns():
    campaigns = os.getcwd() + "\\local\\campaigns"
    return [f for f in os.listdir(campaigns) if os.path.isdir(os.path.join(campaigns, f))]


if __name__ == "__main__":
    setupServer()
    signal.signal(signal.SIGINT, handle_exit)  # Ctrl+C
    signal.signal(signal.SIGTERM, handle_exit)  # Termination signal
