from utils.safe_json import safe_write_json, safe_read_json
import os
import copy

def ensureExsistingFiles(PLAYERS_FOLDER, char_id, name):
    base_path = f"{PLAYERS_FOLDER}\\{char_id}"
    basic_data_path = f"{base_path}\\basic_data.json"
    abilities_path = f"{base_path}\\abilities.json"
    class_data_path = f"{base_path}\\class_data.json"
    race_data_path = f"{base_path}\\race_data.json"
    messages_path = f"{base_path}\\messages.json"
    inventory_path = f"{base_path}\\inventory.json"

    if not os.path.exists(base_path):
        os.mkdir(base_path)

    if not os.path.exists(basic_data_path):
        open(basic_data_path, "w").close()
        '''char_data = {
            "name": name,
            "imgs": [],
            "health": 0,
            "ac": 0,
            "max_health": 0,
            "states_text": '',
            "player_level": 1,
            "speed": 0,
            "init_mod": 0
        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\basic_data.json")'''

    if not os.path.exists(abilities_path):
        open(abilities_path, "w").close()
        '''char_data = {"abilities": {"str_num": 0, "dex_num": 0, "con_num": 0, "int_num": 0, "wis_num": 0, "cha_num": 0}}
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\abilities.json")'''

    if not os.path.exists(class_data_path):
        open(class_data_path, "w").close()
        '''char_data = {
            "class_name": "Select Class",
            "player_skills": [0, []],
            "class_skills": [0, []],
            "class_spells": [],
            "class_cantrips": []

        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\class_data.json")'''

    if not os.path.exists(race_data_path):
        open(race_data_path, "w").close()
        '''char_data = {
            "race_name": "Select Race",
            "race_abilities": {},
            "race_languages": []
        }
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\race_data.json")'''

    if not os.path.exists(messages_path):
        open(messages_path, "w").close()
        '''char_data = {"messages": []}
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\messages.json")'''

    if not os.path.exists(inventory_path):
        open(inventory_path, "w").close()
        '''char_data = {"inventory": None}
        safe_write_json(char_data, f"{PLAYERS_FOLDER}\\{char_id}\\inventory.json")'''
    ensureBasicData(basic_data_path, name)
    ensureAbilitiesData(abilities_path)
    ensureClassData(class_data_path)
    ensureRaceData(race_data_path)
    ensureMessages(messages_path)
    ensureInventory(inventory_path)

def ensureAbilitiesData(file_path):
    ability_check = ["str_num", "dex_num", "con_num",
                     "int_num", "wis_num", "cha_num"]
    base_data = safe_read_json(file_path)
    data = copy.deepcopy(base_data)

    if "abilities" not in data:
        data["abilities"] = {}
    abilities = data.get('abilities')
    for ability in ability_check:
        if (ability not in abilities):
            abilities[ability] = "0"

    if (data != base_data):
        safe_write_json(data, file_path)

def ensureRaceData(file_path):
    base_data = safe_read_json(file_path)
    data = copy.deepcopy(base_data)

    if "race_name" not in data:
        data["race_name"] = ""
    if "race_abilities" not in data:
        data["race_abilities"] = []
    if "race_languages" not in data:
        data["race_languages"] = []
    if "race_skills" not in data:
        data["race_skills"] = []

    if(data != base_data):
        safe_write_json(data, file_path)

def ensureBasicData(file_path, name):
    base_data = safe_read_json(file_path)
    data = copy.deepcopy(base_data)
    if "name" not in data:
        data["name"] = name
    if "imgs" not in data:
        data["imgs"] = []
    if "health" not in data:
        data["health"] = 0
    if "ac" not in data:
        data["ac"] = 0
    if "max_health" not in data:
        data["max_health"] = 0
    if "states_text" not in data:
        data["states_text"] = ""
    if "player_level" not in data:
        data["player_level"] = 1
    if "speed" not in data:
        data["speed"] = 0
    if "init_mod" not in data:
        data["init_mod"] = 0

    if(base_data != data):
        safe_write_json(data, file_path)

def ensureClassData(file_path):
    base_data = safe_read_json(file_path)
    data = copy.deepcopy(base_data)

    if "class_name" not in data:
        data["class_name"] = ''
    if "player_skills" not in data:
        data["player_skills"] = [0, []]
    if "class_skills" not in data:
        data["class_skills"] = [0, []]
    if "class_spells" not in data:
        data["class_spells"] = []
    if "class_cantrips" not in data:
        data["class_cantrips"] = []
    if "use_spell_book" not in data:
        data["use_spell_book"] = False

    if(data != base_data):
        safe_write_json(data, file_path)


def ensureMessages(file_path):
    base_data = safe_read_json(file_path)
    data = copy.deepcopy(base_data)

    if "messages" not in data:
        data["messages"] = []

    if(data != base_data):
        safe_write_json(data, file_path)

def ensureInventory(file_path):
    base_data = safe_read_json(file_path)
    data = copy.deepcopy(base_data)

    if "inventory" not in data:
        data["inventory"] = {}

    inventory = data["inventory"]

    if "inv" not in inventory:
        inventory["inv"] = []
    if "weapon" not in inventory:
        inventory["weapon"] = []
    if "armor" not in inventory:
        inventory["armor"] = []
    if "mounts" not in inventory:
        inventory["mounts"] = []

    if(data != base_data):
        safe_write_json(data, file_path)