from utils.socket_factory import socketio, emit
from utils.file_manager import get_players_folder
from utils.safe_json import safe_write_json, safe_read_json
from utils.class_stats_manager import load_player_class
import os


def init_json_data(sid, name, char_id):
    # Load or Create all the data for each client
    PLAYERS_FOLDER = get_players_folder()
    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}.json"):
        char_data = {
            "name": name,
            "messages": [],
            "imgs": [],
            "health": 0,
            "ac": 0,
            "states_text": '',
            "abilities": {"str_num": 0, "dex_num": 0, "con_num": 0, "int_num": 0, "wis_num": 0, "cha_num": 0}
        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}.json")

    data = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    messages = data.get("messages")
    imgs = data.get("imgs")
    health = data.get("health")
    armor_class = data.get("ac")
    spells = data.get('spells') if data.get('spells') else []
    cantrips = data.get('cantrips') if data.get('cantrips') else []
    class_name = data.get('class_name') if data.get('class_name') else ''
    max_health = data.get("max_health") if data.get("max_health") is not None else 0
    emit('load_spells', {'class_name': class_name, 'spells': spells, 'cantrips': cantrips})
    emit('build_character_abilities', {'abilities': data.get('abilities')}, room=sid)
    for message in messages:
        emit("load_message", {'message': message}, room=sid)
    for img in imgs:
        emit('send_image', {'url': img, 'n': False}, room=sid)
    emit('host_update_health', {'result': health, 'client_id': sid}, room=sid)
    emit('host_change_armor_class', {'value': armor_class}, room=sid)
    emit('host_update_max_health', {'max_health': max_health}, room=sid)
    load_player_class(char_id, sid)
    emit('load_race_stats', {}, room=sid)

    #Call this last
    emit('update_display_data', room=sid)