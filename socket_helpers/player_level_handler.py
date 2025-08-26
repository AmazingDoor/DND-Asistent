from utils.host_connection_handler import get_dm_sid
from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT

@socketio.on('client_change_player_level')
def client_change_armor_class(data):
    DM_SID = get_dm_sid()
    # Save new player level and sync to host
    value = data.get('player_level')
    char_id = data.get('char_id')
    save_player_level(char_id, value)
    emit('client_change_player_level', {'char_id': char_id, 'value': value}, room=DM_SID)

@socketio.on('host_change_player_level')
def host_change_armor_class(data):
    # Save new player level and sync to client
    char_id = data.get('char_id')
    sid = ID_TO_CLIENT.get(char_id)
    value = data.get('player_level')
    save_player_level(char_id, value)
    emit('host_change_player_level', {'value': value}, room=sid)


def save_player_level(char_id, value):
    PLAYERS_FOLDER = get_players_folder()
    j = safe_read_json(f'{PLAYERS_FOLDER}\\{char_id}\\basic_data.json')
    j['player_level'] = value
    safe_write_json(j, f'{PLAYERS_FOLDER}\\{char_id}\\basic_data.json')