from utils.host_connection_handler import get_dm_sid
from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT

@socketio.on('client_change_armor_class')
def client_change_armor_class(data):
    PLAYERS_FOLDER = get_players_folder()
    DM_SID = get_dm_sid()
    # Save new armor class and sync to host
    value = data.get('value')
    char_id = data.get('char_id')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["ac"] = value
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('client_change_armor_class', {'char_id': char_id, 'value': value}, room=DM_SID)

@socketio.on('host_change_armor_class')
def host_change_armor_class(data):
    PLAYERS_FOLDER = get_players_folder()
    # Save new armor class and sync to client
    char_id = data.get('char_id')
    sid = ID_TO_CLIENT.get(char_id)
    value = data.get('value')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["ac"] = value
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
    emit('host_change_armor_class', {'value': value}, room=sid)