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
    });
});

export function clearInventory() {
    inv_manager.clearItems();
}

export function createClassOptions() {
    const class_data = getClassData();

    const weapon_options = class_data.weapons.options;
    weapon_options.forEach(option_array => {
        inv_manager.addWeaponOptionToInventory(option_array);
    });
}