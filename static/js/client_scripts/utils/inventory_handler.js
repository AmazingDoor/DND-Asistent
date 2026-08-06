import { getSocket } from "../factories/socket_factory.js";
import * as character_data_handler from "./character_sheet/character_data_handler.js";
import { isUsingSpellbook, getClassData } from "./character_sheet/mappers/class_mapper.js";
import { weapons } from "../../shared/inventory/weapons.js";
import { items } from "../../shared/inventory/items.js";
import { getAllArmors } from "../../shared/inventory/armor.js";



let socket = null;
let name;
let char_id;
export function setSocket(io) {
    socket = io;
    name = sessionStorage.getItem("charName");
    char_id = sessionStorage.getItem("charId");

}

export async function Initialize() {
    await setSavedInventory();
}

export function setSavedInventory() {
    socket.emit("require_inventory", {char_id: char_id});
    return new Promise((resolve) => {
        socket.once('initialize_inventory_data', data => {
            const inv = data.inventory.inventory;
            character_data_handler.setInventory(inv);
            resolve(data);
        });
    });
}

export function clearInventory() {
    character_data_handler.setInventory({inv: [], weapon: [], armor: []});
}

export function setDefaultInventory() {
    const class_data = getClassData();

    const weapon_options = class_data.weapons.options;
    const armor_options = class_data.armor.options;
    const item_options = class_data.inventory.options;

    const starting_weapons = class_data.weapons.starting;
    const starting_armor = class_data.armor.starting;
    const starting_items = class_data.inventory.starting;

    let i = 0;
    weapon_options.forEach(option_array => {
        character_data_handler.addInvOption("weapon_option", option_array, "class");
        i++;
    });

    i = 0;
    armor_options.forEach(option_array => {
        character_data_handler.addInvOption("armor_option", option_array, "class");
        i++;
    });

    i = 0;
    item_options.forEach((option_array) => {
        character_data_handler.addInvOption("item_option", option_array, "class");
        i++
    });

    starting_weapons.forEach((weapon) => {
        const count = weapon.count;
        const w = weapon.weapon;

        character_data_handler.addInvWeapon(getKey(weapons, w), "class", count);
        if(weapon.ammo !== undefined && weapon.ammo !== null && weapon.ammo != 0) {
            const ammo_type = weapon.weapon.ammo_type;
            const ammo_count = weapon.ammo;
            character_data_handler.addInvItem(ammo_type, "class", ammo_count);
        }
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
        if(i.index === "spellbook") {
            if(isUsingSpellbook()) {
                const spells = item.spells;
                character_data_handler.addSpellbookItem(getKey(items, i),
                "class", count, spells);
            }
        } else {
            if(i.contents.length > 0) {
                character_data_handler.addInvContainerItem(getKey(items, i),
            "class", count);
            } else {
                character_data_handler.addInvItem(getKey(items, i), "class",
            count);
            }
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