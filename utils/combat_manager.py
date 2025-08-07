from utils.host_connection_handler import get_dm_sid
from utils.file_manager import get_combat_folder, get_players_folder
from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
import os

def load_combats():
    DM_SID = get_dm_sid()
    COMBAT_FOLDER = get_combat_folder()
    combat_data = {}
    combats = [f.split(".json")[0] for f in os.listdir(COMBAT_FOLDER) if f.endswith('.json')]
    for combat_id in combats:
        j = safe_read_json(f'{COMBAT_FOLDER}\\{combat_id}.json')
        combat_data[combat_id] = j
    emit("combat_list", {"combats": combat_data}, room=DM_SID)

@socketio.on("remove_combat")
def remove_combat(data):
    COMBAT_FOLDER = get_combat_folder()
    combat_id = data.get("combat_id")
    try:
        os.remove(f'{COMBAT_FOLDER}\\{combat_id}.json')
    except:
        pass

@socketio.on('update_turn')
def update_turn(data):
    COMBAT_FOLDER = get_combat_folder()
    combat_id = data.get('combat_id')
    turn_num = data.get('turn_num')
    d = safe_read_json(f"{COMBAT_FOLDER}\\{combat_id}.json")
    d['current_turn'] = turn_num
    safe_write_json(d, f"{COMBAT_FOLDER}\\{combat_id}.json")

@socketio.on('end_combat')
def end_combat(data):
    COMBAT_FOLDER = get_combat_folder()
    combat_id = data.get('combat_id')
    d = safe_read_json(f"{COMBAT_FOLDER}\\{combat_id}.json")
    d['current_turn'] = 0
    d['initiative_array'] = []
    safe_write_json(d, f"{COMBAT_FOLDER}\\{combat_id}.json")

@socketio.on('initialize_combat')
def initialize_combat(data):
    combat_id = data.get('combat_id')
    emit('initialize_combat', {'combat_id': combat_id}, broadcast=True)

@socketio.on('add_player_inits')
def add_player_inits(data):
    DM_SID = get_dm_sid()
    PLAYERS_FOLDER = get_players_folder()
    combat_id = data.get('combat_id')
    players = [f.split(".json")[0] for f in os.listdir(PLAYERS_FOLDER) if f.endswith('.json')]
    players_data = {}
    for player in players:
        j = safe_read_json(f'{PLAYERS_FOLDER}\\{player}.json')
        players_data[player] = {'player_name': j.get('name'), 'player_ac': j.get('ac'),
                                'player_health': j.get('health'), 'max_health': j.get('max_health')}
    emit('add_player_inits', {'combat_id': combat_id, 'players_data': players_data}, room=DM_SID)


@socketio.on('saveCombat')
def save_combat(data):
    COMBAT_FOLDER = get_combat_folder()
    combat_name = data.get('combat_name')
    enemy_list = data.get('enemy_list')
    combat_id = data.get('combat_id')
    initiative_array = data.get("initiative_array")
    current_turn = data.get("current_turn")
    all_combat_data = {'name': combat_name, 'enemy_list': enemy_list, 'initiative_array': initiative_array,
                        'current_turn': current_turn}
    safe_write_json(all_combat_data, f'{COMBAT_FOLDER}\\{combat_id}.json')

@socketio.on('player_input_init')
def player_input_init(data):
    DM_SID = get_dm_sid()
    char_id = data.get('char_id')
    combat_id = data.get('combat_id')
    init = data.get('init')
    char_name = data.get('char_name')
    emit('player_input_init', {'char_id': char_id, 'combat_id': combat_id, 'init': init, 'char_name': char_name},
         room=DM_SID)
