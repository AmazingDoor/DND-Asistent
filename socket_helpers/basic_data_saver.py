from utils.socket_factory import socketio
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT
from utils.safe_json import safe_read_json, safe_write_json

@socketio.on('save_speed')
def save_speed(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    speed = data.get('speed')
    file_path = f'{players_folder}\\{char_id}\\basic_data.json'
    player_data = safe_read_json(file_path)
    player_data['speed'] = speed
    safe_write_json(player_data, file_path)
    return True

@socketio.on('save_init_mod')
def save_init_mod(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    init_mod = data.get('init_mod')
    file_path = f'{players_folder}\\{char_id}\\basic_data.json'
    player_data = safe_read_json(file_path)
    player_data['init_mod'] = init_mod
    safe_write_json(player_data, file_path)
    return True