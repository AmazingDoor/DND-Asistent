from utils.safe_json import safe_read_json
from utils.host_connection_handler import get_dm_sid
from utils.file_manager import get_players_folder, get_traps_folder
from utils.socket_factory import socketio, emit
from utils.combat_manager import load_combats
import os

IPV4 = None

def set_ip_and_port(ip):
    global IPV4
    IPV4 = ip

@socketio.on('host_page_load')
def host_page_load():
    DM_SID = get_dm_sid()
    PLAYERS_FOLDER = get_players_folder()
    # Tell the host to create a tab for the client
    txt = str(IPV4)
    emit('add_ip_text', {'ip': txt}, room=DM_SID)
    players = [f for f in os.listdir(PLAYERS_FOLDER)]
    for player in players:
        data = safe_read_json(f"{PLAYERS_FOLDER}\\{player}")
        char_id = player.split('.')[0]
        name = data.get("name")
        emit('host_load_client_data', {'name': name, 'char_id': char_id})
        host_init_client_data(char_id)
    load_combats()


def host_init_client_data(char_id):
    PLAYERS_FOLDER = get_players_folder()
    TRAPS_FOLDER = get_traps_folder()
    DM_SID = get_dm_sid()
    data = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    messages = data.get("messages")
    imgs = data.get("imgs")
    health = data.get("health")
    armor_class = data.get("ac")
    max_health = data.get("max_health") if data.get("max_health") is not None else 0
    for message in messages:
        emit("load_message", {'message': message, 'char_id': char_id}, room=DM_SID)
    for img in imgs:
        emit('load_image', {'url': img, 'char_id': char_id}, room=DM_SID)
    emit('client_update_health', {'result': health, 'char_id': char_id}, room=DM_SID)
    emit('client_change_armor_class', {'char_id': char_id, 'value': armor_class}, room=DM_SID)
    emit('client_update_max_health', {'max_health': max_health, 'char_id': char_id})

    d = safe_read_json(f"{TRAPS_FOLDER}\\traps.json")
    emit('update_traps_list', {'traps_data': d}, room=DM_SID)