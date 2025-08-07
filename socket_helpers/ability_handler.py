from utils.socket_factory import socketio, emit
from utils.file_manager import get_players_folder
from utils.safe_json import safe_write_json, safe_read_json

@socketio.on('save_abilities')
def save_abilities(data):
    PLAYERS_FOLDER = get_players_folder()
    char_id = data.get("char_id")
    abilities = data.get("abilities")
    j = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
    j['abilities'] = abilities

    safe_write_json(j, f"{PLAYERS_FOLDER}\\{char_id}.json")
