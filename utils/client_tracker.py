from flask import request
from utils.socket_factory import socketio

EARLY_CLIENTS = []
ID_TO_CLIENT = {}
clients = {}


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


