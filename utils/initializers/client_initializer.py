from utils.socket_factory import socketio, emit
from utils.file_manager import get_players_folder, get_current_campaign
from utils.safe_json import safe_write_json, safe_read_json
from utils.class_stats_manager import load_player_class
from utils.client_tracker import ID_TO_CLIENT, EARLY_CLIENTS, add_eary_clients
from utils.data_verifier import ensureExsistingFiles
from flask import request
import os


#some sockets emits in here are no longer used
#probably should fix that at some point

@socketio.on('client_ready')
def client_ready(data):
    CURRENT_CAMPAIGN = get_current_campaign()
    # Makes the client wait until a campaign is selected
    # Registers the client when ready
    sid = request.sid
    name = data.get('name')
    char_id = data.get('char_id')
    if CURRENT_CAMPAIGN is None:
        add_eary_clients({'sid': sid, 'name': name, 'char_id': char_id})
        emit('client_wait', room=sid)
    else:
        ensureExsistingFiles(get_players_folder(), char_id, name)
        emit('client_continue', {'name': name, 'char_id': char_id}, room=sid)

def allow_early_clients():
    for c in EARLY_CLIENTS:
        ensureExsistingFiles(get_players_folder(), c.get('char_id'), c.get('name'))
        emit('client_continue', {'name': c.get('name'), 'char_id': c.get('char_id')}, room=c.get('sid'))

    EARLY_CLIENTS.clear()

@socketio.on('require_character_abilities')
def send_character_abilities(data):
    char_id = data.get("char_id")
    sid = ID_TO_CLIENT.get(char_id)
    base_folder = f"{get_players_folder()}\\{char_id}\\"
    abilities = safe_read_json(base_folder + "abilities.json")
    emit('build_character_abilities', {'abilities': abilities.get('abilities')}, room=sid)

def init_json_data(sid, name, char_id):
    # Load or Create all the data for each client
    PLAYERS_FOLDER = get_players_folder()
    ensureExsistingFiles(PLAYERS_FOLDER, char_id, name)
    base_folder = f"{PLAYERS_FOLDER}\\{char_id}\\"

    basic_data = safe_read_json(base_folder + "basic_data.json")
    class_data = safe_read_json(base_folder + "class_data.json")
    race_data = safe_read_json(base_folder + "race_data.json")
    message_data = safe_read_json(base_folder + "messages.json")
    inventory = safe_read_json(base_folder + "inventory.json")

    inv = inventory.get("inventory")
    messages = message_data.get("messages")
    imgs = basic_data.get("imgs")
    health = basic_data.get("health")
    armor_class = basic_data.get("ac")
    class_spells = class_data.get('class_spells') if class_data.get('class_spells') else []
    class_cantrips = class_data.get('class_cantrips') if class_data.get('class_cantrips') else []
    class_name = class_data.get('class_name') if class_data.get('class_name') else ''
    max_health = basic_data.get("max_health") if basic_data.get("max_health") is not None else 0
    emit('load_spells', {'class_name': class_name, 'spells': class_spells, 'cantrips': class_cantrips})
    for message in messages:
        emit("load_message", {'message': message}, room=sid)
    for img in imgs:
        emit('send_image', {'url': img, 'n': False}, room=sid)
    emit('host_update_health', {'result': health, 'client_id': sid}, room=sid)
    emit('host_change_armor_class', {'value': armor_class}, room=sid)
    emit('host_update_max_health', {'max_health': max_health}, room=sid)
    emit('load_player_level', {'player_level': basic_data.get('player_level')}, room=sid)
    load_player_class(char_id, sid)
    #race_skills = race_data.get('race_skills') if race_data.get('race_skills') is not None else []
    #race_abilities = race_data.get('race_abilities') if race_data.get('race_abilities') is not None else {}
    #race_languages = race_data.get('race_languages') if race_data.get('race_languages') is not None else []
    #race_name = race_data.get('race_name') if race_data.get('race_name') is not None else None
    #emit('load_race_stats', {'race_skills': race_skills, 'race_abilities': race_abilities, 'race_languages': race_languages, 'race_name': race_name}, room=sid)
    #emit('build_inventory', {"inventory": inv}, room=sid)

    #Call this last
    emit('update_display_data', room=sid)

@socketio.on('require_basic_data')
def requiredBasicData(data):
    char_id = data.get('char_id')
    sid = ID_TO_CLIENT.get(char_id)
    PLAYERS_FOLDER = get_players_folder()
    base_folder = f"{PLAYERS_FOLDER}\\{char_id}\\"
    basic_data = safe_read_json(base_folder + "basic_data.json")
    emit('sent_basic_data', basic_data, room=sid)

@socketio.on('require_race_data')
def requireRaceData(data):
    char_id = data.get('char_id')
    sid = ID_TO_CLIENT.get(char_id)
    PLAYERS_FOLDER = get_players_folder()
    base_folder = f"{PLAYERS_FOLDER}\\{char_id}"
    race_file_data = safe_read_json(f"{base_folder}\\race_data.json")
    race_data = {'race_skills': race_file_data.get('race_skills'),
                 'race_abilities': race_file_data.get('race_abilities'),
                 'race_languages': race_file_data.get('race_languages'),
                 'race_name': race_file_data.get('race_name')}
    emit('sent_race_data', race_data, room=sid)

@socketio.on("require_inventory")
def send_inventory_data(data):
    players_folder = get_players_folder()
    char_id = data.get("char_id")
    sid = ID_TO_CLIENT.get(char_id)
    file_path = f"{players_folder}\\{char_id}\\inventory.json"
    inventory = safe_read_json(file_path)
    emit('initialize_inventory_data', {"inventory": inventory}, room=sid)