from flask import request
from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.host_connection_handler import get_dm_sid
from utils.client_tracker import ID_TO_CLIENT, clients


@socketio.on('message_to_dm')
def message_to_dm(data):
    PLAYERS_FOLDER = get_players_folder()
    DM_SID = get_dm_sid()
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

@socketio.on('message_to_client')
def message_to_client(data):
    PLAYERS_FOLDER = get_players_folder()
    char_id = data.get('char_id')
    target_id = ID_TO_CLIENT.get(char_id)
    msg = data.get('message')
    d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    d["messages"].append(f"DM: {msg}")
    safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")

    emit('private_message', {'from': 'DM', 'message': msg}, room=target_id)


