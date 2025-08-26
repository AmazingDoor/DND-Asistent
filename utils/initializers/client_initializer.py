from utils.socket_factory import socketio, emit
from utils.file_manager import get_players_folder
from utils.safe_json import safe_write_json, safe_read_json
from utils.class_stats_manager import load_player_class
import os


def init_json_data(sid, name, char_id):
    # Load or Create all the data for each client
    PLAYERS_FOLDER = get_players_folder()
    ensureExsistingFiles(PLAYERS_FOLDER, char_id, name)
    base_folder = f"{PLAYERS_FOLDER}\\{char_id}\\"

    basic_data = safe_read_json(base_folder + "basic_data.json")
    abilities = safe_read_json(base_folder + "abilities.json")
    class_data = safe_read_json(base_folder + "class_data.json")
    race_data = safe_read_json(base_folder + "race_data.json")
    message_data = safe_read_json(base_folder + "messages.json")

    messages = message_data.get("messages")
    imgs = basic_data.get("imgs")
    health = basic_data.get("health")
    armor_class = basic_data.get("ac")
    class_spells = class_data.get('class_spells') if class_data.get('class_spells') else []
    class_cantrips = class_data.get('class_cantrips') if class_data.get('class_cantrips') else []
    class_name = class_data.get('class_name') if class_data.get('class_name') else ''
    max_health = basic_data.get("max_health") if basic_data.get("max_health") is not None else 0
    emit('load_spells', {'class_name': class_name, 'spells': class_spells, 'cantrips': class_cantrips})
    emit('build_character_abilities', {'abilities': abilities.get('abilities')}, room=sid)
    for message in messages:
        emit("load_message", {'message': message}, room=sid)
    for img in imgs:
        emit('send_image', {'url': img, 'n': False}, room=sid)
    emit('host_update_health', {'result': health, 'client_id': sid}, room=sid)
    emit('host_change_armor_class', {'value': armor_class}, room=sid)
    emit('host_update_max_health', {'max_health': max_health}, room=sid)
    emit('load_player_level', {'player_level': basic_data.get('player_level')}, room=sid)
    load_player_class(char_id, sid)
    race_skills = race_data.get('race_skills') if race_data.get('race_skills') is not None else []
    race_abilities = race_data.get('race_abilities') if race_data.get('race_abilities') is not None else {}
    race_languages = race_data.get('race_languages') if race_data.get('race_languages') is not None else []
    race_name = race_data.get('race_name') if race_data.get('race_name') is not None else None
    emit('load_race_stats', {'race_skills': race_skills, 'race_abilities': race_abilities, 'race_languages': race_languages, 'race_name': race_name}, room=sid)
    #Call this last
    emit('update_display_data', room=sid)

def ensureExsistingFiles(PLAYERS_FOLDER, char_id, name):
    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json"):
        char_data = {
            "name": name,
            "imgs": [],
            "health": 0,
            "ac": 0,
            "max_health": 0,
            "states_text": '',
            "player_level": 1
        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json")

    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}\\abilities.json"):
        char_data = {"abilities": {"str_num": 0, "dex_num": 0, "con_num": 0, "int_num": 0, "wis_num": 0, "cha_num": 0}}
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\abilities.json")

    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}\\class_data.json"):
        char_data = {
            "class_name": "",
            "player_skills": [0, []],
            "class_skills": [0, []],
            "class_spells": [],
            "class_cantrips": []

        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\class_data.json")

    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}\\race_data.json"):
        char_data = {
            "race_name": "",
            "race_abilities": {},
            "race_languages": []
        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\race_data.json")

    if not os.path.exists(f"{PLAYERS_FOLDER}\\{char_id}\\messages.json"):
        char_data = {"messages": []}
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\messages.json")