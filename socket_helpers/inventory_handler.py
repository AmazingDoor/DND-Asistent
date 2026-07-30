from flask_socketio import emit

from utils.socket_factory import socketio
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT

@socketio.on('save_inventory')
def save_inventory(data):
    print(data)
    players_folder = get_players_folder()

    char_id = data.get('char_id')
    inventory = data.get('inventory')
    j = safe_read_json(f'{players_folder}\\{char_id}\\inventory.json')
    j['inventory'] = inventory
    safe_write_json(j, f'{players_folder}\\{char_id}\\inventory.json')

@socketio.on("require_inventory")
def send_inventory_data(data):
    players_folder = get_players_folder()
    char_id = data.get("char_id")
    sid = ID_TO_CLIENT[char_id]
    file_path = f"{players_folder}\\{char_id}\\inventory.json"
    inventory = safe_read_json(file_path)
    emit('initialize_inventory_data', {"inventory": inventory}, room=sid)
