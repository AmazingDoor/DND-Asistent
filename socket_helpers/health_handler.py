from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.host_connection_handler import get_dm_sid
from utils.client_tracker import ID_TO_CLIENT
from flask import request

@socketio.on('client_update_health')
def client_update_health(data):
    # Save new health and sync with the host
    char_id = data.get('char_id')
    d = safe_read_json(f"{get_players_folder()}\\{char_id}\\basic_data.json")
    d["health"] = data.get("result")
    safe_write_json(d, f"{get_players_folder()}\\{char_id}\\basic_data.json")
    for key in ID_TO_CLIENT.keys():
        if ID_TO_CLIENT.get(key) == request.sid:
            print(get_dm_sid())
            emit('client_update_health', {'result': data.get('result'), 'char_id': key}, room=get_dm_sid())
            break


@socketio.on('host_update_health')
def host_update_health(data):
    # Save new health and sync with the client
    char_id = data.get('char_id')
    target_id = ID_TO_CLIENT.get(char_id)
    d = safe_read_json(f"{get_players_folder()}\\{char_id}\\basic_data.json")
    d["health"] = data.get("result")
    safe_write_json(d, f"{get_players_folder()}\\{char_id}\\basic_data.json")
    emit('host_update_health', {'result': data.get('result')}, room=target_id)

@socketio.on('host_update_max_health')
def host_update_max_health(data):
    PLAYERS_FOLDER = get_players_folder()
    char_id = data.get('player_id')
    health = data.get('health')
    sid = ID_TO_CLIENT.get(char_id)
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json")
    d["max_health"] = health
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json")
    emit('host_update_max_health', {'max_health': health}, room=sid)


@socketio.on('client_update_max_health')
def client_update_max_health(data):
    PLAYERS_FOLDER = get_players_folder()
    DM_SID = get_dm_sid()
    char_id = data.get('char_id')
    max_health = data.get('max_health')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json")
    d["max_health"] = max_health
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json")
    emit('client_update_max_health', {'max_health': max_health, 'char_id': char_id}, room=DM_SID)
