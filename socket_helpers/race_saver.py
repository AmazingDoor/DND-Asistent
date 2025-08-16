from utils.socket_factory import socketio
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder

@socketio.on('save_race')
def save_race(data):
    char_id = data.get('char_id')
    race_name = data.get('race_name')
    players_folder = get_players_folder()
    j = safe_read_json(f'{players_folder}\\{char_id}.json')
    j['race_name'] = race_name
    j['race_skills'] = []
    safe_write_json(j, f'{players_folder}\\{char_id}.json')

@socketio.on('save_race_skills')
def save_race_skills(data):
    char_id = data.get('char_id')
    skills = data.get('race_skills')
    players_folder = get_players_folder()
    j = safe_read_json(f'{players_folder}\\{char_id}.json')
    j['race_skills'] = skills
    safe_write_json(j, f'{players_folder}\\{char_id}.json')

@socketio.on('save_race_abilities')
def save_race_abilities(data):
    players_folder = get_players_folder()
    char_id = data.get('char_id')
    race_abilities = data.get('race_abilities')
    j = safe_read_json(f'{players_folder}\\{char_id}.json')
    j['race_abilities'] = race_abilities
    safe_write_json(j, f'{players_folder}\\{char_id}.json')

@socketio.on('save_race_languages')
def save_race_languages(data):
    pass