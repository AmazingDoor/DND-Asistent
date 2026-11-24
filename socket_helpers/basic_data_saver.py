from utils.socket_factory import socketio
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT
from utils.safe_json import safe_read_json, safe_write_json

@socketio.on('save_basic_data')
def save_basic_data(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    speed = data.get('speed')
    initiative_modifier = data.get('initiative_modifier')
    health = data.get('health')
    max_health = data.get('max_health')
    armor_class = data.get('armor_class')

    file_path = f'{players_folder}\\{char_id}\\basic_data.json'
    player_data = safe_read_json(file_path)
    player_data['speed'] = speed
    player_data['initiative_modifier'] = initiative_modifier
    player_data['health'] = health
    player_data['max_health'] = max_health
    player_data['armor_class'] = armor_class
    safe_write_json(player_data, file_path)
    return True

#old
@socketio.on('save_speed')
def save_speed(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    speed = data.get('speed')
    file_path = f'{players_folder}\\{char_id}\\basic_data.json'
    player_data = safe_read_json(file_path)
    player_data['speed'] = speed
    #safe_write_json(player_data, file_path)
    return True

@socketio.on('save_init_mod')
def save_init_mod(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    init_mod = data.get('init_mod')
    file_path = f'{players_folder}\\{char_id}\\basic_data.json'
    player_data = safe_read_json(file_path)
    player_data['init_mod'] = init_mod
    #safe_write_json(player_data, file_path)
    return True