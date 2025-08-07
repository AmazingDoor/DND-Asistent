from utils.safe_json import safe_read_json
from utils.socket_factory import socketio, emit
from utils.file_manager import assign_folders
from utils.host_connection_handler import get_dm_sid
from utils.client_tracker import allow_early_clients
import os
import shutil


@socketio.on('create_campaign')
def create_campaign(data):
    global PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER, CURRENT_CAMPAIGN
    DM_SID = get_dm_sid()
    # Creates a new save folder for a campaign
    name = str(data.get('campaign_name'))
    if name == '':
        emit('create_campaign_fail', {'error': 'no_name'}, room=DM_SID)
    files = get_campaign_files()
    if name in files:
        emit('create_campaign_fail', {'error': 'existing_name'}, room=DM_SID)
    else:
        cwd = os.getcwd() + '\\local\\campaigns\\'
        os.makedirs(cwd + name)
        os.makedirs(cwd + name + '\\players')
        os.makedirs(cwd + name + '\\traps')
        os.makedirs(cwd + name + '\\imgs')
        os.makedirs(cwd + name + '\\combat')
        CURRENT_CAMPAIGN, PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER = assign_folders(name)
        allow_early_clients()
        emit('create_campaign_success', room=DM_SID)


@socketio.on('get_campaigns')
def get_campaigns():
    # Load the saved campaigns
    DM_SID = get_dm_sid()
    emit('return_campaigns', {'campaigns': get_campaign_files()}, room=DM_SID)


@socketio.on('delete_campaign')
def delete_campaign(data):
    name = data.get('name')
    file_path = os.getcwd() + '\\local\\campaigns\\' + str(name)
    if os.path.exists(file_path):
        shutil.rmtree(file_path)


@socketio.on('selected_campaign')
def selected_campaign(data):
    global EARLY_CLIENTS, PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER, CURRENT_CAMPAIGN
    DM_SID = get_dm_sid()
    name = data.get('campaign_name')
    CURRENT_CAMPAIGN, PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER = assign_folders(name)
    allow_early_clients()
    emit('continue_to_dashboard', room=DM_SID)

def get_campaign_files():
    campaigns = os.getcwd() + "\\local\\campaigns"
    return [f for f in os.listdir(campaigns) if os.path.isdir(os.path.join(campaigns, f))]