from utils.socket_factory import socketio, emit
from utils.client_tracker import ID_TO_CLIENT, clients
from utils.file_manager import get_players_folder
from flask import request
from utils.initializers.client_initializer import init_json_data
from utils.host_connection_handler import get_dm_sid
import os


@socketio.on('register_name')
def handle_register_name(data):
    # happens when a connected client selects a character
    # Keep track of connected clients
    # Load saved data
    sid = request.sid
    name = data.get('name')
    char_id = data.get('char_id')
    player_ids = [f.split('.')[0] for f in os.listdir(get_players_folder())]
    if char_id:
        clients[sid] = {'name': name, 'sid': sid, 'char_id': char_id}
        if char_id not in player_ids:
            emit('client_name_registered', {'name': name, 'char_id': char_id}, room=get_dm_sid())
        init_json_data(sid, name, char_id)
        ID_TO_CLIENT[char_id] = sid
        emit('allow_client', room=sid)

    else:
        print(f"Warning: No id for {name}")
