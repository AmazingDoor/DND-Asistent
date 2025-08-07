from flask import request
from utils.socket_factory import socketio, emit
from utils.file_manager import get_current_campaign

EARLY_CLIENTS = []
ID_TO_CLIENT = {}
clients = {}


@socketio.on('client_ready')
def client_ready(data):
    CURRENT_CAMPAIGN = get_current_campaign()
    # Makes the client wait until a campaign is selected
    # Registers the client when ready
    sid = request.sid
    name = data.get('name')
    char_id = data.get('char_id')
    if CURRENT_CAMPAIGN == None:
        EARLY_CLIENTS.append({'sid': sid, 'name': name, 'char_id': char_id})
        emit('client_wait', room=sid)
    else:
        emit('client_continue', {'name': name, 'char_id': char_id}, room=sid)


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

def allow_early_clients():
    global EARLY_CLIENTS
    for c in EARLY_CLIENTS:
        emit('client_continue', {'name': c.get('name'), 'char_id': c.get('char_id')}, room=c.get('sid'))

    EARLY_CLIENTS = []