from utils.socket_factory import socketio, emit
from utils.safe_json import safe_read_json, safe_write_json
from utils.client_tracker import ID_TO_CLIENT
from utils.file_manager import get_players_folder


@socketio.on('host_send_image_url')
def handle_host_image_url(data):
    # Send an image from the host to the client
    PLAYERS_FOLDER = get_players_folder()
    url = data.get('url')
    char_id = data.get('char_id')
    target_id = ID_TO_CLIENT.get(char_id)
    if url:
        d = safe_read_json(f"{PLAYERS_FOLDER}\\{char_id}.json")
        d["imgs"].append(f"{url}")
        safe_write_json(d, f"{PLAYERS_FOLDER}\\{char_id}.json")
        emit('send_image', {'url': url}, room=target_id)
