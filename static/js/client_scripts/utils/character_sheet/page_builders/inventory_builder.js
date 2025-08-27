import * as inv_manager from './../inventory/inventory_item_manager.js';
//import * as class_proficiencies from './../../../shared/class_proficiencies.js';
import {getClassData} from './../mappers/class_mapper.js';
import * as character_data_handler from './../character_data_handler.js';

let socket = null;
export function setSocket(io) {
    socket = io;
}


document.addEventListener("DOMContentLoaded", function() {
    socket.on('build_inventory', data => {
        const inv = data.inventory;
        character_data_handler.setInventory(inv);
        buildInventory();
    });
});

export function clearInventory() {
    inv_manager.clearItems();
}

export function createClassOptions() {
    const class_data = getClassData();

    const weapon_options = class_data.weapons.options;
    let i = 0;
    weapon_options.forEach(option_array => {
        character_data_handler.addInvOption("class_weapon_option", i);
        i++;
        //inv_manager.addWeaponOptionToInventory(option_array);
    });
    inv_manager.saveInventory();
}

export function buildInventory() {
    const class_data = getClassData();
    const class_weapon_options = class_data.weapons.options;

    const inventory = character_data_handler.getInventory();
    inventory.forEach(item => {
        if(item.type === "class_weapon_option") {
            inv_manager.addWeaponOptionToInventory(class_weapon_options[item.index]);
        }
    });
}