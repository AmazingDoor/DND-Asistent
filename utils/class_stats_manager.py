from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder


@socketio.on('save_player_class')
def save_player_class(data):
    char_id = data.get('char_id')
    class_name = data.get('class_name')
    players_folder = get_players_folder()
    player_data = safe_read_json(f'{players_folder}\\{char_id}.json')
    if player_data.get('class_name') is None or player_data.get('class_name') != class_name:
        player_data['class_name'] = class_name
        player_data = reset_player_skills(player_data)
        safe_write_json(player_data, f'{players_folder}\\{char_id}.json')


@socketio.on('save_player_skills')
def save_player_skills(data):
    players_folder = get_players_folder()
    skills = data.get('skills')
    char_id = data.get('char_id')
    player_data = safe_read_json(f'{players_folder}\\{char_id}.json')
    player_data['player_skills'] = skills
    safe_write_json(player_data, f'{players_folder}\\{char_id}.json')


def load_player_class(char_id, sid):
    players_folder = get_players_folder()
    player_data = safe_read_json(f'{players_folder}\\{char_id}.json')
    class_name = player_data.get('class_name')
    if player_data.get('player_skills') is None:
        player_data['player_skills'] = [0, []]
        safe_write_json(player_data, f'{players_folder}\\{char_id}.json')
    player_skills = player_data.get('player_skills')
    emit('load_player_class', {'class_name': class_name, 'player_skills': player_skills}, room=sid)


def reset_player_skills(data):
    data['player_skills'] = [0, []]
    return data
