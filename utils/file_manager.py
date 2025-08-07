import os
from utils.safe_json import safe_write_json

CURRENT_CAMPAIGN = None
PLAYERS_FOLDER = None
TRAPS_FOLDER = None
IMGS_FOLDER = None
COMBAT_FOLDER = None

def get_folders():
    return CURRENT_CAMPAIGN, PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER

def get_current_campaign():
    return CURRENT_CAMPAIGN

def get_players_folder():
    return PLAYERS_FOLDER

def get_traps_folder():
    return TRAPS_FOLDER

def get_images_folder():
    return IMGS_FOLDER

def get_combat_folder():
    return COMBAT_FOLDER

def assign_folders(name):
    global PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER, CURRENT_CAMPAIGN
    # Set the paths to the saved data when a campaign is selected
    cwd = os.getcwd() + '\\local\\campaigns\\'

    CURRENT_CAMPAIGN = name
    PLAYERS_FOLDER = cwd + name + '\\players'
    TRAPS_FOLDER = cwd + name + '\\traps'
    IMGS_FOLDER = cwd + name + '\\imgs'
    COMBAT_FOLDER = cwd + name + '\\combat'
    if not os.path.exists(f"{TRAPS_FOLDER}\\traps.json"):
        traps_data = {
            "traps": []
        }
        safe_write_json(traps_data, f"{TRAPS_FOLDER}\\traps.json")
    return CURRENT_CAMPAIGN, PLAYERS_FOLDER, TRAPS_FOLDER, IMGS_FOLDER, COMBAT_FOLDER
