import * as inv_manager from './../inventory/inventory_item_manager.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';
import {items} from './../../../../shared/inventory/items.js';
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
    const armor_options = class_data.armor.options;
    const item_options = class_data.inventory.options;


    const starting_weapons = class_data.weapons.starting;
    const starting_armor = class_data.armor.starting;
    const starting_items = class_data.inventory.starting;

    let i = 0;
    weapon_options.forEach(option_array => {
        character_data_handler.addInvOption("weapon_option", i, "class");
        i++;
        //inv_manager.addWeaponOptionToInventory(option_array);
    });
    i = 0;

    armor_options.forEach(option_array => {
        character_data_handler.addInvOption("armor_option", i, "class");
        i++;
    });

    i = 0;
    item_options.forEach((option_array) => {
        character_data_handler.addInvOption("item_option", i, "class");
        i++;
    });

    starting_weapons.forEach((weapon) => {
        const count = weapon.count;
        const w = weapon.weapon;
        console.log(weapon);
        character_data_handler.addInvWeapon(getKey(weapons, w), "class", count);
    });

    starting_armor.forEach((armor) => {
        const armors = getAllArmors();
        const count = armor.count;
        const a = armor.armor;
        character_data_handler.addInvArmor(getKey(armors, a), "class", count);
    });

    starting_items.forEach((item) => {
        const count = item.count;
        const i = item.item;
        character_data_handler.addInvItem(getKey(items, i), "class", count);
    });

    inv_manager.saveInventory();
}

export function buildInventory() {
    const class_data = getClassData();
    if (class_data === null || class_data === undefined) {
        return;
    }
    const class_weapon_options = class_data.weapons.options;
    const class_armor_options = class_data.armor.options;
    const class_item_options = class_data.inventory.options;

    const inventory = character_data_handler.getInventory();
    inventory.forEach(item => {
        if(item.type === "weapon_option") {
            inv_manager.addWeaponOptionToInventory(class_weapon_options[item.index], item.from);
        } else if(item.type === "weapon") {
            inv_manager.addWeaponToInventory(item.reference, item.from, item.count);
        } else if(item.type === "armor_option") {
            inv_manager.addArmorOptionToInventory(class_armor_options[item.index], item.from);
        } else if(item.type === "armor") {
            inv_manager.addArmorToInventory(item.reference, item.from, item.count);
        } else if(item.type === "item") {
            inv_manager.addItemToInventory(item.reference, item.from, item.count);
        } else if(item.type === "item_option") {
            inv_manager.addItemOptionToInventory(class_item_options[item.index], item.from);
        }
    });
}


function getKey(d, d2) {
    for (let key in d) {
        if (d[key] === d2) {
            return key;
        }
    }
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}