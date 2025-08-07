from utils.safe_json import safe_write_json, safe_read_json
from utils.socket_factory import socketio, emit
from utils.file_manager import get_combat_folder
import os
import string
import random

@socketio.on('save_combat_global')
def save_combat_global(data):
    combat_name = data.get('combat_name')
    enemy_list = data.get('enemy_list')
    combat_id = data.get('combat_id')
    cwd = os.getcwd()
    all_combat_data = {'name': combat_name, 'enemy_list': enemy_list}
    safe_write_json(all_combat_data, f'{cwd}\\global\\encounters\\{combat_id}.json')


@socketio.on('import_id')
def import_id(data):
    COMBAT_FOLDER = get_combat_folder()
    cwd = os.getcwd()
    id = data.get('id')
    j = safe_read_json(f'{cwd}\\global\\encounters\\{id}.json')
    j['initiative_array'] = []
    j['current_turn'] = 0

    new_id = get_unique_id(id)
    safe_write_json(j, f'{COMBAT_FOLDER}\\{new_id}.json')
    j['id'] = new_id
    emit('add_imported_encounter', {'combat': j})


def get_unique_id(id):
    COMBAT_FOLDER = get_combat_folder()
    combats = [f.split(".json")[0] for f in os.listdir(COMBAT_FOLDER) if f.endswith('.json')]
    for combat in combats:
        if combat == id:
            id = random_string()
            get_unique_id(id)
    return id

def random_string(length=8):
    chars = string.ascii_lowercase + string.digits  # base-36 characters
    return ''.join(random.choices(chars, k=length))

@socketio.on('populate_import_encounters')
def populate_import_encounters():
    cwd = os.getcwd()
    encounters = [f.split(".json")[0] for f in os.listdir(cwd + "\\global\\encounters\\") if f.endswith('.json')]
    for encounter in encounters:
        j = safe_read_json(f'{cwd}\\global\\encounters\\{encounter}.json')
        name = j.get('name')
        emit('add_import_option', {'encounter_id': encounter, 'name': name})
