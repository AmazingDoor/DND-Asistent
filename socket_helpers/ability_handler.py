from utils.socket_factory import socketio, emit
from utils.file_manager import get_players_folder
from utils.safe_json import safe_write_json, safe_read_json

@socketio.on('save_abilities')
def save_abilities(data):
    PLAYERS_FOLDER = get_players_folder()
    char_id = data.get("char_id")
    str = data.get('str')
    dex = data.get('dex')
    con = data.get('con')
    int = data.get('int')
    wis = data.get('wis')
    cha = data.get('cha')
    file_path = f"{PLAYERS_FOLDER}\\{char_id}\\abilities.json"
    j = safe_read_json(file_path)
    j['str'] = str
    j['dex'] = dex
    j['con'] = con
    j['int'] = int
    j['wis'] = wis
    j['cha'] = cha

    safe_write_json(j, file_path)
    return True