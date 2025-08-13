from utils.safe_json import safe_write_json, safe_read_json
from utils.socket_factory import socketio
from utils.file_manager import get_players_folder


@socketio.on('save_spells')
def save_spells(data):
    players_folder = get_players_folder()
    spells = data.get('spells')
    cantrips = data.get('cantrips')
    char_id = data.get('char_id')
    j = safe_read_json(f'{players_folder}\\{char_id}.json')
    j['spells'] = spells
    j['cantrips'] = cantrips
    safe_write_json(j, f'{players_folder}\\{char_id}.json')
