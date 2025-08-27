
from utils.socket_factory import socketio
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder

@socketio.on('save_inventory')
def save_inventory(data):
    players_folder = get_players_folder()

    char_id = data.get('char_id')
    inventory = data.get('inventory')
    j = safe_read_json(f'{players_folder}\\{char_id}\\inventory.json')
    j['inventory'] = inventory
    safe_write_json(j, f'{players_folder}\\{char_id}\\inventory.json')