from utils.socket_factory import socketio, emit
from utils.safe_json import safe_write_json, safe_read_json
from utils.file_manager import get_traps_folder
from utils.host_connection_handler import DM_SID

@socketio.on('add_traps')
def addTraps(traps_data):
    # Load traps to server list
    TRAPS_FOLDER = get_traps_folder()
    d = {}
    d["traps"] = traps_data
    safe_write_json(d, f"{TRAPS_FOLDER}\\traps.json")
    emit('update_traps_list', {'traps_data': d}, room=DM_SID)

@socketio.on('get_traps_json')
def get_traps_json():
    TRAPS_FOLDER = get_traps_folder()
    # Server calls this to load the traps file
    j = safe_read_json(f"{TRAPS_FOLDER}\\traps.json")
    emit('load_traps_json', j)

@socketio.on('reload_traps')
def reloadTraps():
    TRAPS_FOLDER = get_traps_folder()
    d = safe_read_json(f"{TRAPS_FOLDER}\\traps.json")
    emit('update_traps_list', {'traps_data': d}, room=DM_SID)