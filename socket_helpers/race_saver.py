from utils.socket_factory import socketio
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder


@socketio.on('save_race_data')
def save_race_data(data):
    char_id = data.get('char_id')
    race_id = data.get('race_id')
    skills = data.get('skills')
    abilities = data.get('abilities')
    languages = data.get('languages')

    players_folder = get_players_folder()
    file_path = f'{players_folder}\\{char_id}\\race_data.json'
    j = safe_read_json(file_path)
    j['race_id'] = race_id
    j['skills'] = skills
    j['abilities'] = abilities
    j['languages'] = languages
    safe_write_json(j, file_path)
    return True

@socketio.on('save_race')
def save_race(data):
    '''char_id = data.get('char_id')
    race_name = data.get('race_name')
    players_folder = get_players_folder()
    j = safe_read_json(f'{players_folder}\\{char_id}\\race_data.json')
    j['race_name'] = race_name
    j['race_skills'] = []
    safe_write_json(j, f'{players_folder}\\{char_id}\\race_data.json')'''
    return True

@socketio.on('save_race_skills')
def save_race_skills(data):
    char_id = data.get('char_id')
    skills = data.get('race_skills')
    players_folder = get_players_folder()
    j = safe_read_json(f'{players_folder}\\{char_id}\\race_data.json')
    j['race_skills'] = skills
    safe_write_json(j, f'{players_folder}\\{char_id}\\race_data.json')
    return True


@socketio.on('save_race_abilities')
def save_race_abilities(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    race_abilities = data.get('race_abilities')
    j = safe_read_json(f'{players_folder}\\{char_id}\\race_data.json')
    j['race_abilities'] = race_abilities
    safe_write_json(j, f'{players_folder}\\{char_id}\\race_data.json')
    return True

@socketio.on('save_race_languages')
def save_race_languages(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    languages = data.get('race_languages')
    j = safe_read_json(f'{players_folder}\\{char_id}\\race_data.json')
    j['race_languages'] = languages
    safe_write_json(j, f'{players_folder}\\{char_id}\\race_data.json')
    return True