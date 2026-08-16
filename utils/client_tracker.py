from flask import request
from utils.socket_factory import socketio, emit
from utils.file_manager import get_current_campaign

EARLY_CLIENTS = []
ID_TO_CLIENT = {}
clients = {}



def add_eary_clients(client):
    EARLY_CLIENTS.append(client)

@socketio.on('disconnect')
def handle_disconnect():
    global EARLY_CLIENTS
    global ID_TO_CLIENT
    sid = request.sid
    if sid in clients:
        del clients[sid]
    for key in ID_TO_CLIENT.keys():
        if ID_TO_CLIENT.get(key) == sid:
            ID_TO_CLIENT[key] = None

    for client in EARLY_CLIENTS:
        if client.get('sid') == sid:
            del client