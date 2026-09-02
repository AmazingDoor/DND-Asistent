import * as inv_manager from './../inventory/inventory_item_manager.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';
import {items} from './../../../../shared/inventory/items.js';
import {getClassData, isUsingSpellbook} from './../mappers/class_mapper.js';
import * as character_data_handler from './../character_data_handler.js';
import {options as class_loadout_options} from './../../../../shared/inventory/class_loadout_options.js';
import { getPlayerLevel } from '../../../player_level_handler.js';
import { getAbilities } from '../mappers/ability_mapper.js';
import * as inventory_items from '../inventory_items.js';

let socket = null;
let name;
let char_id;
export function setSocket(io) {
    socket = io;
}

export async function Initialize() {
    name = sessionStorage.getItem("charName");
    char_id = sessionStorage.getItem("charId");
}

export function buildInventory() {
    const inventory_container = document.querySelector('.inventory-container');
   
    const inventory_handler = character_data_handler.getInventoryHandler();
    character_data_handler.setMaxPreparedSpells();

    return;

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