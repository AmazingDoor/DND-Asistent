from flask_socketio import emit

from utils.socket_factory import socketio
from utils.safe_json import safe_read_json, safe_write_json
from utils.file_manager import get_players_folder
from utils.client_tracker import ID_TO_CLIENT

@socketio.on('save_inventory')
def save_inventory(data):
    players_folder = get_players_folder()

    char_id = data.get('char_id')
    inventory = data.get('inventory')
    j = safe_read_json(f'{players_folder}\\{char_id}\\inventory.json')
    j['inventory'] = inventory
    safe_write_json(j, f'{players_folder}\\{char_id}\\inventory.json')
    return True

@socketio.on('save_currency')
def save_currency(data):
    players_folder = get_players_folder()

    currency = data.get('currency')
    remove_amount = data.get('remove_amount')
    char_id = data.get('char_id')
    j = safe_read_json(f'{players_folder}\\{char_id}\\inventory.json')
    j['currency'] = currency
    j['remove_amount'] = remove_amount
    safe_write_json(j, f'{players_folder}\\{char_id}\\inventory.json')
    return True

@socketio.on('require_currency')
def send_currency_data(data):
    char_id = data.get("char_id")
    sid = ID_TO_CLIENT.get(char_id)
    base_folder = f"{get_players_folder()}\\{char_id}\\"
    currency = safe_read_json(base_folder + "inventory.json").get("currency")
    remove_amount = safe_read_json(base_folder + "inventory.json").get("remove_amount")
    emit('sent_currency', {"currency": currency, "remove_amount": remove_amount}, room=sid)

