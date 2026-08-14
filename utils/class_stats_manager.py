from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT


@socketio.on('save_player_class')
def save_player_class(data):
    char_id = data.get('char_id')
    class_name = data.get('class_name')
    current_spell_slots = data.get('current_spell_slots')
    spell_slots_used = data.get('spell_slots_used')
    players_folder = get_players_folder()
    player_data = safe_read_json(f'{players_folder}\\{char_id}\\class_data.json')
    player_data['class_name'] = class_name
    player_data['class_spells'] = []
    player_data['clas_cantrips'] = []
    player_data['current_spell_slots'] = current_spell_slots
    player_data['spell_slots_used'] = spell_slots_used
    player_data = reset_player_skills(player_data)
    safe_write_json(player_data, f'{players_folder}\\{char_id}\\class_data.json')


@socketio.on('save_player_skills')
def save_player_skills(data):
    players_folder = get_players_folder()
    skills = data.get('skills')
    char_id = data.get('char_id')
    player_data = safe_read_json(f'{players_folder}\\{char_id}\\class_data.json')
    player_data['class_skills'] = skills
    safe_write_json(player_data, f'{players_folder}\\{char_id}\\class_data.json')


@socketio.on('use_spell_book')
def save_using_spell_book(data):
    char_id = data.get('char_id')
    use_spell_book = data.get('use_spell_book')
    players_folder = get_players_folder()
    file_path = f'{players_folder}\\{char_id}\\class_data.json'
    player_data = safe_read_json(file_path)
    player_data['use_spell_book'] = use_spell_book
    safe_write_json(player_data, file_path)
    return True


@socketio.on('required_client_class_data')
def send_player_class_data(data):
    char_id = data.get('char_id')
    sid = ID_TO_CLIENT.get(char_id)
    players_folder = get_players_folder()
    player_data = safe_read_json(f'{players_folder}\\{char_id}\\class_data.json')
    class_name = player_data.get('class_name')
    player_current_spell_slots = player_data.get('current_spell_slots') if player_data.get('current_spell_slots') is not None else []
    player_spell_slots_used = player_data.get('spell_slots_used') if player_data.get('spell_slots_used') is not None else []
    if player_data.get('class_skills') is None:
        player_data['class_skills'] = [0, []]
        safe_write_json(player_data, f'{players_folder}\\{char_id}\\class_data.json')
    player_skills = player_data.get('class_skills')
    use_spell_book = player_data.get('use_spell_book')

    class_spells = player_data.get('class_spells') if player_data.get('class_spells') else []
    class_cantrips = player_data.get('class_cantrips') if player_data.get('class_cantrips') else []

    emit('build_character_class',
         {'class_name': class_name, 'class_skills': player_skills, 'use_spell_book': use_spell_book,
          'spells': class_spells, 'current_spell_slots': player_current_spell_slots, 'spell_slots_used': player_spell_slots_used, 'cantrips': class_cantrips}, room=sid)


def load_player_class(char_id, sid):
    players_folder = get_players_folder()
    file_path = f'{players_folder}\\{char_id}\\class_data.json'
    player_data = safe_read_json(file_path)
    class_name = player_data.get('class_name')
    if player_data.get('class_skills') is None:
        player_data['class_skills'] = [0, []]
        safe_write_json(player_data, file_path)

    if player_data.get('use_spell_book') is None:
        player_data['use_spell_book'] = False
        safe_write_json(player_data, file_path)

    # player_skills = player_data.get('class_skills')
    # emit('build_character_class', {'class_name': class_name, 'class_skills': player_skills}, room=sid)


def reset_player_skills(data):
    data['class_skills'] = [0, []]
    return data
